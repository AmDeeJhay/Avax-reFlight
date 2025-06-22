"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Plane,
  Ticket,
  DollarSign,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Bell,
  ArrowRight,
  Search,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <div className="flex items-center mt-2 space-x-2">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Silver Traveler</Badge>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-600">Member since Jan 2024</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Next tier in</p>
            <p className="text-lg font-semibold text-gray-900">2,450 points</p>
            <Progress value={65} className="w-32 mt-1" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tickets</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2 this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                <p className="text-3xl font-bold text-gray-900">7</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Earned: </span>
              <span className="font-medium ml-1">1.2 AVAX</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refunds Claimed</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Total: </span>
              <span className="font-medium ml-1">0.8 AVAX</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rewards Earned</p>
                <p className="text-3xl font-bold text-gray-900">4,250</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Points</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Flight */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plane className="w-5 h-5 mr-2" />
                Next Upcoming Flight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">NYC</p>
                      <p className="text-sm text-gray-600">John F. Kennedy</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full max-w-32 h-px bg-gray-300 relative">
                        <Plane className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">LAX</p>
                      <p className="text-sm text-gray-600">Los Angeles Intl</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>2:30 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Business Class</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Seat 4A</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Departure in</p>
                    <p className="text-lg font-bold text-red-600">5 days, 14 hours</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Ticket Details",
                          description: "Opening your boarding pass and ticket details",
                        })
                        // Navigate to ticket details
                        window.location.href = "/dashboard/tickets"
                      }}
                    >
                      View Ticket
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-blue-600"
                      onClick={() => {
                        toast({
                          title: "Check-In Started",
                          description: "Redirecting to online check-in portal",
                        })
                        // Simulate check-in process
                        setTimeout(() => {
                          toast({
                            title: "Check-In Complete",
                            description: "You're all set! Boarding pass updated.",
                          })
                        }, 2000)
                      }}
                    >
                      Check In
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Refund Approved</p>
                  <p className="text-xs text-gray-600">Your LAX → NYC refund of 0.4 AVAX has been processed</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ticket Sold</p>
                  <p className="text-xs text-gray-600">Your Miami → Boston ticket sold for 0.3 AVAX</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Flight Reminder</p>
                  <p className="text-xs text-gray-600">NYC → LAX flight in 5 days. Check-in opens in 1 day</p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  toast({
                    title: "All Notifications",
                    description: "Opening notification center",
                  })
                  // Navigate to notifications page
                  window.location.href = "/dashboard/notifications"
                }}
              >
                View All Notifications
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-gradient-to-r from-red-500 to-blue-600"
                onClick={() => {
                  window.location.href = "/dashboard/book"
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                Book New Flight
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  window.location.href = "/dashboard/tickets"
                }}
              >
                <Ticket className="w-4 h-4 mr-2" />
                View My Tickets
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  window.location.href = "/dashboard/refunds"
                }}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Check Refunds
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
