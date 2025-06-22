"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Wallet,
  Star,
  Award,
  Crown,
  Shield,
  Plane,
  Calendar,
  MapPin,
  TrendingUp,
  Settings,
  Edit,
  Copy,
  ExternalLink,
} from "lucide-react"
import { useWalletStore } from "@/lib/wallet-manager"

interface UserStats {
  totalFlights: number
  totalSpent: number
  loyaltyPoints: number
  carbonOffset: number
  favoriteDestination: string
  memberSince: string
  nftTickets: number
  marketplaceSales: number
}

interface UserPreferences {
  seatPreference: string
  mealPreference: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  privacy: {
    showStats: boolean
    showActivity: boolean
  }
}

const mockUserStats: UserStats = {
  totalFlights: 47,
  totalSpent: 23.45,
  loyaltyPoints: 12450,
  carbonOffset: 2.3,
  favoriteDestination: "Los Angeles",
  memberSince: "2023-03-15",
  nftTickets: 12,
  marketplaceSales: 8,
}

const mockPreferences: UserPreferences = {
  seatPreference: "Window",
  mealPreference: "Vegetarian",
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  privacy: {
    showStats: true,
    showActivity: false,
  },
}

export function UserProfile() {
  const { address, balance, role } = useWalletStore()
  const [stats] = useState(mockUserStats)
  const [preferences, setPreferences] = useState(mockPreferences)

  const getLoyaltyLevel = (points: number) => {
    if (points >= 50000) return { level: "Diamond", color: "from-purple-500 to-pink-500", icon: Crown }
    if (points >= 25000) return { level: "Platinum", color: "from-blue-500 to-cyan-500", icon: Award }
    if (points >= 10000) return { level: "Gold", color: "from-yellow-500 to-orange-500", icon: Star }
    if (points >= 5000) return { level: "Silver", color: "from-gray-400 to-gray-600", icon: Shield }
    return { level: "Bronze", color: "from-orange-400 to-red-500", icon: User }
  }

  const loyaltyInfo = getLoyaltyLevel(stats.loyaltyPoints)
  const LoyaltyIcon = loyaltyInfo.icon

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className={`bg-gradient-to-r ${loyaltyInfo.color} text-white text-2xl`}>
                <LoyaltyIcon className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Anonymous User"}
                </h1>
                <Badge className={`bg-gradient-to-r ${loyaltyInfo.color} text-white`}>{loyaltyInfo.level}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Wallet Balance</p>
                  <p className="font-semibold">{balance} AVAX</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Flights</p>
                  <p className="font-semibold">{stats.totalFlights}</p>
                </div>
                <div>
                  <p className="text-gray-600">Loyalty Points</p>
                  <p className="font-semibold">{stats.loyaltyPoints.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-semibold">{new Date(stats.memberSince).getFullYear()}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={copyAddress} className="flex items-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy Address</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View on Explorer</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.totalFlights}</p>
                <p className="text-sm text-gray-600">Total Flights</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Wallet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.totalSpent} AVAX</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.nftTickets}</p>
                <p className="text-sm text-gray-600">NFT Tickets</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stats.marketplaceSales}</p>
                <p className="text-sm text-gray-600">Marketplace Sales</p>
              </CardContent>
            </Card>
          </div>

          {/* Loyalty Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LoyaltyIcon className="w-5 h-5" />
                <span>Loyalty Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Level: {loyaltyInfo.level}</span>
                  <span className="text-sm text-gray-600">{stats.loyaltyPoints.toLocaleString()} points</span>
                </div>
                <Progress value={(stats.loyaltyPoints % 25000) / 250} className="h-3" />
                <p className="text-xs text-gray-600">{25000 - (stats.loyaltyPoints % 25000)} points to next level</p>
              </div>
            </CardContent>
          </Card>

          {/* Travel Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Travel Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Favorite Destination</span>
                  <span className="font-medium">{stats.favoriteDestination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Carbon Offset</span>
                  <span className="font-medium text-green-600">{stats.carbonOffset} tons CO₂</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Trip Cost</span>
                  <span className="font-medium">{(stats.totalSpent / stats.totalFlights).toFixed(2)} AVAX</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book New Flight
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Travel History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Flight Booked", details: "NYC → LAX", date: "2 days ago", type: "booking" },
                  { action: "NFT Transferred", details: "Sold ticket #12345", date: "1 week ago", type: "marketplace" },
                  {
                    action: "Refund Processed",
                    details: "Flight SL-456 cancelled",
                    date: "2 weeks ago",
                    type: "refund",
                  },
                  { action: "Loyalty Points Earned", details: "+500 points", date: "3 weeks ago", type: "reward" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "booking"
                          ? "bg-blue-500"
                          : activity.type === "marketplace"
                            ? "bg-green-500"
                            : activity.type === "refund"
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Seat Preference</label>
                  <p className="text-sm text-gray-600">{preferences.seatPreference}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Meal Preference</label>
                  <p className="text-sm text-gray-600">{preferences.mealPreference}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Preferences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email Notifications</span>
                  <Badge variant={preferences.notifications.email ? "default" : "secondary"}>
                    {preferences.notifications.email ? "On" : "Off"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SMS Notifications</span>
                  <Badge variant={preferences.notifications.sms ? "default" : "secondary"}>
                    {preferences.notifications.sms ? "On" : "Off"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Push Notifications</span>
                  <Badge variant={preferences.notifications.push ? "default" : "secondary"}>
                    {preferences.notifications.push ? "On" : "Off"}
                  </Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold">{stats.loyaltyPoints.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Available Points</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">5</p>
                    <p className="text-sm text-gray-600">Rewards Earned</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <Crown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold">{loyaltyInfo.level}</p>
                    <p className="text-sm text-gray-600">Current Tier</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Free Seat Upgrade", cost: 5000, description: "Upgrade to premium economy" },
                    { name: "Priority Boarding", cost: 2500, description: "Board first on your next flight" },
                    { name: "Lounge Access", cost: 7500, description: "Access to airport lounges" },
                    { name: "Extra Baggage", cost: 3000, description: "Additional 20kg baggage allowance" },
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{reward.cost.toLocaleString()} pts</p>
                        <Button size="sm" disabled={stats.loyaltyPoints < reward.cost} className="mt-1">
                          Redeem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
