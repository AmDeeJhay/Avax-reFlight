"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, TrendingUp, Users, Plane, DollarSign, Ticket, Download, RefreshCw } from "lucide-react"

export default function Analytics() {
  const { toast } = useToast()

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "Generating analytics report...",
    })

    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Analytics report has been downloaded to your device",
      })
    }, 2000)
  }

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating analytics dashboard...",
    })

    setTimeout(() => {
      toast({
        title: "Data Updated",
        description: "Analytics dashboard has been refreshed",
      })
    }, 1500)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Platform performance and insights</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900">456.7 AVAX</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">+15% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Bookings</p>
                <p className="text-xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Active Users</p>
                <p className="text-xl font-bold text-gray-900">2,341</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">+23% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">NFT Tickets</p>
                <p className="text-xl font-bold text-gray-900">892</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">+8% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium">156.7 AVAX</span>
              </div>
              <Progress value={85} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Month</span>
                <span className="text-sm font-medium">134.2 AVAX</span>
              </div>
              <Progress value={72} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Two Months Ago</span>
                <span className="text-sm font-medium">98.5 AVAX</span>
              </div>
              <Progress value={53} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">NYC → LAX</p>
                  <p className="text-xs text-gray-600">234 bookings</p>
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs">+18%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">LAX → MIA</p>
                  <p className="text-xs text-gray-600">189 bookings</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 text-xs">+12%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">MIA → CHI</p>
                  <p className="text-xs text-gray-600">156 bookings</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 text-xs">+8%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">CHI → SEA</p>
                  <p className="text-xs text-gray-600">134 bookings</p>
                </div>
                <Badge className="bg-red-100 text-red-800 text-xs">-3%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">98.5%</p>
              <Progress value={98.5} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">Successful transactions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">4.8/5</p>
              <Progress value={96} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">Average rating</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Refund Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600 mb-2">2.3%</p>
              <Progress value={23} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">Of total bookings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
