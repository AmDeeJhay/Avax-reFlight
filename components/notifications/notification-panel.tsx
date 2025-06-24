"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, X, Plane, DollarSign, AlertTriangle, User, Calendar } from "lucide-react"

const mockNotifications = [
  {
    id: "1",
    type: "booking",
    title: "Flight Booking Confirmed",
    message: "Your NYC → LAX flight has been confirmed for Dec 15, 2024",
    time: "2 minutes ago",
    read: false,
    icon: Plane,
    color: "text-blue-600",
  },
  {
    id: "2",
    type: "refund",
    title: "Refund Processed",
    message: "Your refund of 0.4 AVAX has been processed successfully",
    time: "1 hour ago",
    read: false,
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: "3",
    type: "alert",
    title: "Flight Delay Alert",
    message: "Your flight SL 1234 is delayed by 30 minutes",
    time: "3 hours ago",
    read: true,
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    id: "4",
    type: "system",
    title: "Account Verification",
    message: "Your account has been successfully verified",
    time: "1 day ago",
    read: true,
    icon: User,
    color: "text-purple-600",
  },
  {
    id: "5",
    type: "reminder",
    title: "Check-in Reminder",
    message: "Check-in opens in 24 hours for your upcoming flight",
    time: "2 days ago",
    read: true,
    icon: Calendar,
    color: "text-orange-600",
  },
]

interface NotificationPanelProps {
  children: React.ReactNode
}

export function NotificationPanel({ children }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          {children}
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 sm:w-80 p-0 mobile-modal">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-1 sm:space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80 sm:h-96">
              <AnimatePresence>
                {notifications.length > 0 ? (
                  <div className="space-y-1">
                    {notifications.map((notification) => {
                      const Icon = notification.icon
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={`p-2 sm:p-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                            notification.read ? "border-transparent bg-gray-50/50" : "border-blue-500 bg-blue-50/50"
                          } group`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center ${notification.color} flex-shrink-0`}
                            >
                              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-xs sm:text-sm font-medium mobile-truncate ${
                                    notification.read ? "text-gray-600" : "text-gray-900"
                                  }`}
                                >
                                  {notification.title}
                                </p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeNotification(notification.id)
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                              <p className={`text-xs mt-1 line-clamp-2 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <Bell className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm text-gray-600">No notifications</p>
                  </div>
                )}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}