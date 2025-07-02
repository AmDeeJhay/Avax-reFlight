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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UnifiedConnectButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showRoleSwitch?: boolean
  dashboardMode?: boolean // restricts dropdown to just Logout
}

export function UnifiedConnectButton({
  className,
  variant = "default",
  size = "default",
  showRoleSwitch = false,
  dashboardMode = false, // NEW
}: UnifiedConnectButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { isConnected, isDemoMode, address, balance, role, disconnect, switchRole } = useWalletStore()

  // Get user info for avatar
  let userInitials = "AR"
  let userAvatar = null
  if (typeof window !== "undefined") {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user?.name) {
        userInitials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
      }
      if (user?.avatar) {
        userAvatar = user.avatar
      }
    } catch {}
  }

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

  // Only show profile icon and logout in dashboardMode, regardless of wallet connection
  if (dashboardMode) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={`${className} relative overflow-hidden group px-2 py-1.5`}>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="w-8 h-8">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt="User Avatar" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-blue-600 text-white text-lg">
                    {userInitials}
                  </AvatarFallback>
                )}
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 sm:w-64 mobile-modal">
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="mobile-text">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className={`${className} relative overflow-hidden group px-2 py-1.5`}>
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="w-8 h-8">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt="User Avatar" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-red-500 to-blue-600 text-white text-lg">
                    {userInitials}
                  </AvatarFallback>
                )}
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 sm:w-64 mobile-modal">
          {/* Only show Logout if dashboardMode is true */}
          {dashboardMode ? (
            <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="mobile-text">Logout</span>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowModal(true)}>
                <Wallet className="w-4 h-4 mr-2" />
                <span className="mobile-text">Connect Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="mobile-text">Logout</span>
              </DropdownMenuItem>
            </>
          )}
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
