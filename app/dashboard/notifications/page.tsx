"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, AlertCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { getUserNotifications } from "@/lib/user-dashboard-api"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "info":
        return <Bell className="w-5 h-5 text-blue-500" />
      case "warning":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    setLoading(true)
    getUserNotifications()
      .then((data) => {
        setNotifications(data.notifications || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to load notifications")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-center">Loading notifications...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with your flight activities</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`${!notification.read ? "border-blue-200 bg-blue-50" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>}
                    </div>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
