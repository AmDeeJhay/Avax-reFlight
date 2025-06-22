"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWalletStore } from "@/lib/wallet-manager"
import { useRouter } from "next/navigation"
import { Loader2, User, Shield, Wallet, Chrome, Smartphone, Globe, Zap } from "lucide-react"

interface WalletOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  type: "real" | "demo"
  role?: "user" | "admin"
}

const walletOptions: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: <Chrome className="w-8 h-8" />,
    description: "Connect using MetaMask browser extension",
    type: "real",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Connect using WalletConnect protocol",
    type: "real",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: <Globe className="w-8 h-8" />,
    description: "Connect using Coinbase Wallet",
    type: "real",
  },
  {
    id: "demo-user",
    name: "Demo User",
    icon: <User className="w-8 h-8 text-blue-500" />,
    description: "Try the platform with sample user data",
    type: "demo",
    role: "user",
  },
  {
    id: "demo-admin",
    name: "Demo Admin",
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    description: "Explore admin features with demo data",
    type: "demo",
    role: "admin",
  },
]

interface WalletConnectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [connecting, setConnecting] = useState<string | null>(null)
  const { connect } = useWalletStore()

  const handleWalletConnect = async (wallet: WalletOption) => {
    try {
      setConnecting(wallet.id)

      if (wallet.type === "demo") {
        // Demo connection
        await connect("demo", wallet.role || "user")

        toast({
          title: "Demo Mode Activated",
          description: `Connected as ${wallet.role}. Explore with demo data!`,
          duration: 3000,
        })

        // Redirect based on role
        setTimeout(() => {
          if (wallet.role === "admin") {
            router.push("/admin")
          } else {
            router.push("/dashboard")
          }
          onOpenChange(false)
        }, 1000)
      } else {
        // Real wallet connection simulation
        // In a real app, this would integrate with the actual wallet
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate successful connection
        await connect("real", "user")

        toast({
          title: "Wallet Connected",
          description: `Successfully connected with ${wallet.name}!`,
          duration: 3000,
        })

        setTimeout(() => {
          router.push("/dashboard")
          onOpenChange(false)
        }, 1000)
      }
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection Failed",
        description: `Failed to connect with ${wallet.name}. Please try again.`,
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setConnecting(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>Choose how you'd like to connect to FlyChain</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <AnimatePresence>
            {walletOptions.map((wallet, index) => (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 justify-start hover:bg-gray-50 transition-all duration-200 group"
                  onClick={() => handleWalletConnect(wallet)}
                  disabled={connecting !== null}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="flex-shrink-0 relative">
                      {connecting === wallet.id ? (
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      ) : (
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                          {wallet.icon}
                        </motion.div>
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{wallet.name}</p>
                        {wallet.type === "demo" && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Zap className="w-3 h-3 mr-1" />
                            DEMO
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{wallet.description}</p>
                    </div>

                    {connecting === wallet.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-blue-600 font-medium"
                      >
                        Connecting...
                      </motion.div>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            By connecting a wallet, you agree to FlyChain's Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
