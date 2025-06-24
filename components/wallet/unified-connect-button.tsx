"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWalletStore } from "@/lib/wallet-manager"
import { useRouter } from "next/navigation"
import { WalletConnectionModal } from "./wallet-connection-modal"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, User, Shield, Zap } from "lucide-react"

interface UnifiedConnectButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showRoleSwitch?: boolean
}

export function UnifiedConnectButton({
  className,
  variant = "default",
  size = "default",
  showRoleSwitch = false,
}: UnifiedConnectButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { isConnected, isDemoMode, address, balance, role, disconnect, switchRole } = useWalletStore()

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Disconnected",
      description: "Wallet has been disconnected.",
      duration: 3000,
    })
    router.push("/")
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard!",
        duration: 2000,
      })
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleRoleSwitch = (newRole: "user" | "admin") => {
    if (isDemoMode) {
      switchRole(newRole)
      toast({
        title: "Role Switched",
        description: `Switched to ${newRole} mode`,
        duration: 2000,
      })

      // Redirect to appropriate dashboard
      if (newRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Wallet className="w-4 h-4 mr-2" />
        <span className="mobile-text">Loading...</span>
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={`${className} relative overflow-hidden group`}>
            <motion.div
              className="flex items-center space-x-1 sm:space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                {isDemoMode ? (
                  <Zap className="w-3 h-3 text-yellow-500" />
                ) : (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
                <Badge
                  variant={isDemoMode ? "secondary" : "default"}
                  className={`${isDemoMode ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"} text-xs`}
                >
                  {isDemoMode ? "DEMO" : "LIVE"}
                </Badge>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs sm:text-sm font-medium mobile-truncate">{balance} AVAX</p>
                <p className="text-xs opacity-75 mobile-truncate">{formatAddress(address)}</p>
              </div>
              <div className="sm:hidden">
                <Wallet className="w-4 h-4" />
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 sm:w-64 mobile-modal">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium mobile-text">{isDemoMode ? "Demo Wallet" : "Connected Wallet"}</p>
              <Badge
                variant={isDemoMode ? "secondary" : "default"}
                className={`${isDemoMode ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"} text-xs`}
              >
                {isDemoMode ? "DEMO" : "LIVE"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mobile-truncate">{formatAddress(address)}</p>
            <p className="text-xs text-muted-foreground">Balance: {balance} AVAX</p>
            {role && <p className="text-xs text-muted-foreground capitalize">Role: {role}</p>}
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="w-4 h-4 mr-2" />
            <span className="mobile-text">Copy Address</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => window.open(`https://testnet.snowtrace.io/address/${address}`, "_blank")}>
            <ExternalLink className="w-4 h-4 mr-2" />
            <span className="mobile-text">View on Explorer</span>
          </DropdownMenuItem>

          {isDemoMode && showRoleSwitch && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleRoleSwitch("user")} disabled={role === "user"}>
                <User className="w-4 h-4 mr-2" />
                <span className="mobile-text">Switch to User</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleSwitch("admin")} disabled={role === "admin"}>
                <Shield className="w-4 h-4 mr-2" />
                <span className="mobile-text">Switch to Admin</span>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="mobile-text">Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={() => setShowModal(true)}
            variant={variant}
            size={size}
            className={`${className} relative overflow-hidden group`}
          >
            <motion.div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span className="mobile-text">Connect Wallet</span>
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </motion.div>
      </AnimatePresence>

      <WalletConnectionModal open={showModal} onOpenChange={setShowModal} />
    </>
  )
}