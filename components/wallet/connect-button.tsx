"use client"

import { useAccount, useDisconnect, useBalance } from "wagmi"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { avalancheFuji } from "wagmi/chains"

interface ConnectButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function ConnectButton({ className, variant = "default", size = "default" }: ConnectButtonProps) {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { open } = useWeb3Modal()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Get balance
  const { data: balance } = useBalance({
    address,
    chainId: avalancheFuji.id,
  })

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      await open()
    } catch (error) {
      console.error("Connection error:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to open wallet connection modal. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
      duration: 3000,
    })
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

  const formatBalance = (bal: any) => {
    if (!bal) return "0.00"
    return Number.parseFloat(bal.formatted).toFixed(4)
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={`${className} relative overflow-hidden group`}>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{formatBalance(balance)} AVAX</p>
                <p className="text-xs opacity-75">{formatAddress(address)}</p>
              </div>
              <div className="sm:hidden">
                <Wallet className="w-4 h-4" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm">
            <p className="font-medium">Connected Wallet</p>
            <p className="text-xs text-muted-foreground">{formatAddress(address)}</p>
            <p className="text-xs text-muted-foreground">Balance: {formatBalance(balance)} AVAX</p>
          </div>
          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(`https://testnet.snowtrace.io/address/${address}`, "_blank")}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLoading ? "loading" : "connect"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={handleConnect}
          disabled={isLoading || isConnecting}
          variant={variant}
          size={size}
          className={`${className} relative overflow-hidden group button-press`}
        >
          <motion.div
            className="flex items-center space-x-2"
            animate={isLoading ? { x: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.5, repeat: isLoading ? Number.POSITIVE_INFINITY : 0 }}
          >
            {isLoading || isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting</span>
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </>
            )}
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
  )
}
