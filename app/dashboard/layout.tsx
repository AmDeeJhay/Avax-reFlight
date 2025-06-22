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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <span className="text-xl font-bold truncate">Avax-reFlight</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
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

          {/* Back to Home Button - Mobile */}
          <div className="p-4 border-t">
            <Button onClick={() => router.push("/")} variant="outline" className="w-full justify-start">
              <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Back to Home</span>
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <Button onClick={() => router.push("/")} variant="ghost" size="sm" className="lg:hidden">
                <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Home</span>
              </Button>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <NotificationPanel>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                </Button>
              </NotificationPanel>

              {/* Wallet info */}
              <UnifiedConnectButton variant="ghost" size="sm" showRoleSwitch={true} />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
