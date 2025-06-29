"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, TrendingUp, Users, Plane, DollarSign, Ticket, Download, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchFromApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function Analytics() {
  const { toast } = useToast()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchFromApi("admin/analytics")
      .then((res) => {
        setStats(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to fetch analytics")
        setLoading(false)
      })
  }, [])

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

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-40" />
                  ))}
                  <Skeleton className="h-2 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-24 mx-auto mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
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
                <p className="text-xl font-bold text-gray-900">{stats.totalRevenue} AVAX</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">{stats.revenueGrowth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Bookings</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">{stats.bookingGrowth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Active Users</p>
                <p className="text-xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">{stats.userGrowth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">NFT Tickets</p>
                <p className="text-xl font-bold text-gray-900">{stats.nftTickets}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-600">{stats.ticketGrowth}% from last week</span>
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
                <span className="text-sm font-medium">{stats.revenueThisMonth} AVAX</span>
              </div>
              <Progress value={stats.revenueProgress} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Month</span>
                <span className="text-sm font-medium">{stats.revenueLastMonth} AVAX</span>
              </div>
              <Progress value={stats.lastMonthRevenueProgress} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Two Months Ago</span>
                <span className="text-sm font-medium">{stats.revenueTwoMonthsAgo} AVAX</span>
              </div>
              <Progress value={stats.twoMonthsAgoRevenueProgress} className="h-2" />
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
              {stats.topRoutes.map((route: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{route.path}</p>
                    <p className="text-xs text-gray-600">{route.bookings} bookings</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">{route.growth}%</Badge>
                </div>
              ))}
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
              <p className="text-3xl font-bold text-green-600 mb-2">{stats.bookingSuccessRate}%</p>
              <Progress value={stats.bookingSuccessRate} className="h-3 mb-2" />
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
              <p className="text-3xl font-bold text-blue-600 mb-2">{stats.userSatisfaction}/5</p>
              <Progress value={stats.userSatisfaction * 20} className="h-3 mb-2" />
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
              <p className="text-3xl font-bold text-purple-600 mb-2">{stats.refundRate}%</p>
              <Progress value={stats.refundRate} className="h-3 mb-2" />
              <p className="text-xs text-gray-600">Of total bookings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
