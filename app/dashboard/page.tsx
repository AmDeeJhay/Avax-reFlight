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
import { useState } from "react"


export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState(null)
  
  const showToast = (title, description) => {
    // Simulate toast notification
    console.log(`Toast: ${title} - ${description}`)
    alert(`${title}: ${description}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section with Glass Effect */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
        <div className="relative backdrop-blur-sm bg-white/60 border border-white/20 rounded-3xl p-8 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                Welcome back, Alex!
              </h1>
              <div className="flex items-center mt-3 space-x-3">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Silver Traveler
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600 font-medium">Member since Jan 2024</span>
              </div>
            </div>
            <div className="text-right bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="text-sm text-gray-500 font-medium">Next tier in</p>
              <p className="text-2xl font-bold text-gray-900">2,450 points</p>
              <div className="relative mt-3">
                <Progress value={65} className="w-36 h-3 bg-gray-200/50" />
                <div className="absolute top-0 left-0 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500 ease-out" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Active Tickets",
            value: "3",
            icon: Ticket,
            color: "blue",
            trend: "+2 this month",
            bg: "from-blue-50 to-blue-100/50"
          },
          {
            title: "Tickets Sold",
            value: "7",
            icon: DollarSign,
            color: "green",
            subtitle: "Earned: 1.2 AVAX",
            bg: "from-green-50 to-green-100/50"
          },
          {
            title: "Refunds Claimed",
            value: "2",
            icon: DollarSign,
            color: "purple",
            subtitle: "Total: 0.8 AVAX",
            bg: "from-purple-50 to-purple-100/50"
          },
          {
            title: "Rewards Earned",
            value: "4,250",
            icon: Award,
            color: "yellow",
            subtitle: "Points",
            bg: "from-yellow-50 to-yellow-100/50"
          }
        ].map((stat, index) => (
          <Card 
            key={index}
            className={`relative overflow-hidden border-0 shadow ${stat.bg} border border-white/30 hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm bg-gradient-to-br`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${
                  stat.color === 'blue' ? 'from-blue-400 to-blue-600' :
                  stat.color === 'green' ? 'from-green-400 to-green-600' :
                  stat.color === 'purple' ? 'from-purple-400 to-purple-600' :
                  'from-yellow-400 to-yellow-600'
                } rounded-2xl flex items-center justify-center shadow-xl transform transition-transform duration-300 ${hoveredCard === index ? 'rotate-12 scale-110' : ''}`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                {stat.trend ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-green-600 font-medium">{stat.trend}</span>
                  </>
                ) : (
                  <span className="text-gray-600 font-medium">{stat.subtitle}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Flight - Enhanced */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md overflow-hidden backdrop-blur-sm bg-white/80">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100/50 pb-6">
              <CardTitle className="flex items-center text-xl font-bold">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                Next Upcoming Flight
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-red-50/50 via-white to-blue-50/50 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-8">
                      <div className="text-center group">
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">NYC</p>
                        <p className="text-sm text-gray-600 font-medium">John F. Kennedy</p>
                      </div>
                      <div className="flex-1 flex items-center justify-center relative">
                        <div className="w-full max-w-40 h-0.5 bg-gradient-to-r from-red-400 to-blue-500 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                            <Plane className="w-5 h-5 text-gray-600 transform rotate-90" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center group">
                        <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">LAX</p>
                        <p className="text-sm text-gray-600 font-medium">Los Angeles Intl</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8">
                    {[
                      { icon: Calendar, text: "Dec 15, 2024" },
                      { icon: Clock, text: "2:30 PM" },
                      { icon: Ticket, text: "Business Class" },
                      { icon: MapPin, text: "Seat 4A" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:bg-white/80 transition-all duration-300">
                        <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Departure in</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                        5 days, 14 hours
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          showToast("Ticket Details", "Opening your boarding pass and ticket details")
                        }}
                      >
                        View Ticket
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          showToast("Check-In Started", "Redirecting to online check-in portal")
                        }}
                      >
                        Check In
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Enhanced */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <Card className="border-0 shadow-sm overflow-hidden backdrop-blur-sm bg-white/90">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100/50">
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { color: "green", title: "Refund Approved", desc: "Your LAX → NYC refund of 0.4 AVAX has been processed", time: "2 hours ago" },
                { color: "blue", title: "Ticket Sold", desc: "Your Miami → Boston ticket sold for 0.3 AVAX", time: "1 day ago" },
                { color: "yellow", title: "Flight Reminder", desc: "NYC → LAX flight in 5 days. Check-in opens in 1 day", time: "3 days ago" }
              ].map((alert, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group">
                  <div className={`w-3 h-3 bg-${alert.color}-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alert.desc}</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">{alert.time}</p>
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                className="w-full mt-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 transition-all duration-300 hover:scale-105"
                onClick={() => showToast("All Notifications", "Opening notification center")}
              >
                View All Notifications
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm overflow-hidden backdrop-blur-sm bg-white/90">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100/50">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button
                className="w-full justify-start bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left py-4"
                onClick={() => window.location.href = "/dashboard/book"}
              >
                <Search className="w-5 h-5 mr-3" />
                Book New Flight
              </Button>
              
              {[
                { icon: Ticket, text: "View My Tickets", href: "/dashboard/tickets" },
                { icon: DollarSign, text: "Check Refunds", href: "/dashboard/refunds" }
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 py-4"
                  onClick={() => window.location.href = action.href}
                >
                  <action.icon className="w-5 h-5 mr-3" />
                  {action.text}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
