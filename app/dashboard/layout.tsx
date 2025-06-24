"use client"

import type React from "react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Search, Ticket, RefreshCw, DollarSign, Award, Settings, Menu, X, Bell, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { UnifiedConnectButton } from "@/components/wallet/unified-connect-button"
import { PageTransition } from "@/components/animations/page-transition"
import { NotificationPanel } from "@/components/notifications/notification-panel"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Book Flights", href: "/dashboard/book", icon: Search },
  { name: "My Tickets", href: "/dashboard/tickets", icon: Ticket },
  { name: "Marketplace", href: "/dashboard/marketplace", icon: RefreshCw },
  { name: "Refund Center", href: "/dashboard/refunds", icon: DollarSign },
  { name: "Rewards", href: "/dashboard/rewards", icon: Award },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 mobile-viewport">
      {/* Mobile sidebar overlay */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full mobile-sidebar flex-col bg-white shadow-xl mobile-safe-area">
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 border-b">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">AR</span>
              </div>
              <span className="text-base sm:text-xl font-bold truncate">Avax-reFlight</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="flex-shrink-0">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          <nav className="flex-1 px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "flex items-center px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left min-h-[44px]",
                    pathname === item.href
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="truncate mobile-text">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Back to Home Button - Mobile */}
          <div className="p-3 sm:p-4 border-t">
            <Button onClick={() => router.push("/")} variant="outline" className="w-full justify-start min-h-[44px]">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate mobile-text">Back to Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <span className="text-xl font-bold truncate">Avax-reFlight</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left",
                    pathname === item.href
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Back to Home Button - Desktop */}
          <div className="p-4 border-t">
            <Button onClick={() => router.push("/")} variant="outline" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Back to Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-x-2 sm:gap-x-4 border-b border-gray-200 bg-white px-10 sm:px-4 lg:px-6 xl:px-8 shadow-sm mobile-header">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 sm:w-5 sm:h-5" />
          </Button>

          <div className="flex flex-1 gap-x-2 sm:gap-x-4 self-stretch lg:gap-x-6 min-w-0">
            
            <div className="flex items-center gap-x-2 sm:gap-x-4 lg:gap-x-6 flex-shrink-0">
              {/* Notifications */}
              <NotificationPanel>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </NotificationPanel>

              {/* Wallet info */}
              <UnifiedConnectButton variant="ghost" size="sm" showRoleSwitch={true} />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-3 sm:py-4 lg:py-6 mobile-safe-area">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
