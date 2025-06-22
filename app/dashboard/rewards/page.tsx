"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Star,
  Gift,
  Trophy,
  Zap,
  Plane,
  RefreshCw,
  Calendar,
  TrendingUp,
  Crown,
  Medal,
  Target,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const userStats = {
  currentTier: "Silver",
  points: 4250,
  nextTierPoints: 6700,
  totalFlights: 12,
  ticketsResold: 7,
  earlyRefunds: 3,
  memberSince: "2024-01-15",
}

const tiers = [
  { name: "Bronze", minPoints: 0, color: "bg-amber-600", benefits: ["5% booking discount", "Basic support"] },
  {
    name: "Silver",
    minPoints: 2500,
    color: "bg-gray-400",
    benefits: ["10% booking discount", "Priority support", "Free seat selection"],
  },
  {
    name: "Gold",
    minPoints: 6700,
    color: "bg-yellow-500",
    benefits: ["15% booking discount", "Premium support", "Free upgrades", "Lounge access"],
  },
  {
    name: "Platinum",
    minPoints: 15000,
    color: "bg-purple-600",
    benefits: ["20% booking discount", "VIP support", "Guaranteed upgrades", "Premium lounge access", "Exclusive NFTs"],
  },
]

const recentActivities = [
  { type: "booking", points: 450, description: "Booked NYC → LAX flight", date: "2024-11-20" },
  { type: "resale", points: 200, description: "Successfully resold MIA → CHI ticket", date: "2024-11-18" },
  { type: "early_refund", points: 100, description: "Early cancellation (helped liquidity)", date: "2024-11-15" },
  { type: "referral", points: 500, description: "Friend joined FlyChain", date: "2024-11-10" },
]

const availableRewards = [
  { id: 1, name: "10% Flight Discount", cost: 1000, type: "discount", icon: Plane, available: true },
  { id: 2, name: "Priority Support Badge", cost: 500, type: "badge", icon: Star, available: true },
  { id: 3, name: "Exclusive Traveler NFT", cost: 2500, type: "nft", icon: Award, available: true },
  { id: 4, name: "Free Seat Upgrade", cost: 1500, type: "upgrade", icon: TrendingUp, available: true },
  { id: 5, name: "Lounge Access Pass", cost: 3000, type: "access", icon: Crown, available: false },
  { id: 6, name: "Premium Traveler Status", cost: 5000, type: "status", icon: Medal, available: false },
]

export default function Rewards() {
  const { toast } = useToast()
  const currentTierIndex = tiers.findIndex((tier) => tier.name === userStats.currentTier)
  const nextTier = tiers[currentTierIndex + 1]
  const progressToNext = nextTier
    ? ((userStats.points - tiers[currentTierIndex].minPoints) /
        (nextTier.minPoints - tiers[currentTierIndex].minPoints)) *
      100
    : 100

  const handleRedeemReward = (reward: any) => {
    if (!reward.available || userStats.points < reward.cost) {
      toast({
        title: "Cannot Redeem",
        description: reward.available ? "Not enough points" : "Reward not available yet",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Redeeming Reward",
      description: `Redeeming ${reward.name} for ${reward.cost} points`,
    })

    setTimeout(() => {
      toast({
        title: "Reward Redeemed!",
        description: `${reward.name} has been added to your account`,
      })
    }, 2000)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rewards & Loyalty</h1>
        <p className="text-gray-600 mt-2">
          Earn points for bookings, resales, and referrals. Unlock exclusive benefits!
        </p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Your Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={`${tiers[currentTierIndex].color} text-white`}>
                    {userStats.currentTier} Traveler
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Member since {new Date(userStats.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{userStats.points.toLocaleString()} Points</p>
              </div>
              <div className="text-right">
                {nextTier && (
                  <>
                    <p className="text-sm text-gray-600">Next: {nextTier.name}</p>
                    <p className="text-lg font-semibold">
                      {(nextTier.minPoints - userStats.points).toLocaleString()} points to go
                    </p>
                  </>
                )}
              </div>
            </div>

            {nextTier && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{tiers[currentTierIndex].name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <Progress value={progressToNext} className="h-3" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{userStats.totalFlights}</p>
                <p className="text-sm text-gray-600">Total Flights</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{userStats.ticketsResold}</p>
                <p className="text-sm text-gray-600">Tickets Resold</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{userStats.earlyRefunds}</p>
                <p className="text-sm text-gray-600">Early Refunds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tier Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tiers[currentTierIndex].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            {nextTier && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">Unlock at {nextTier.name}:</p>
                <div className="space-y-2">
                  {nextTier.benefits.slice(tiers[currentTierIndex].benefits.length).map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Point Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "booking"
                        ? "bg-blue-100"
                        : activity.type === "resale"
                          ? "bg-green-100"
                          : activity.type === "early_refund"
                            ? "bg-purple-100"
                            : "bg-yellow-100"
                    }`}
                  >
                    {activity.type === "booking" && <Plane className="w-4 h-4 text-blue-600" />}
                    {activity.type === "resale" && <RefreshCw className="w-4 h-4 text-green-600" />}
                    {activity.type === "early_refund" && <Calendar className="w-4 h-4 text-purple-600" />}
                    {activity.type === "referral" && <Gift className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{activity.points} pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.map((reward) => {
              const Icon = reward.icon
              const canAfford = userStats.points >= reward.cost

              return (
                <Card
                  key={reward.id}
                  className={`${!reward.available || !canAfford ? "opacity-50" : "hover:shadow-md"} transition-shadow`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        reward.available && canAfford ? "bg-gradient-to-r from-red-500 to-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${reward.available && canAfford ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <h4 className="font-medium mb-2">{reward.name}</h4>
                    <p className="text-lg font-bold text-gray-900 mb-3">{reward.cost.toLocaleString()} pts</p>
                    <Button
                      size="sm"
                      disabled={!reward.available || !canAfford}
                      className={reward.available && canAfford ? "bg-gradient-to-r from-red-500 to-blue-600" : ""}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      {!reward.available ? "Coming Soon" : !canAfford ? "Not Enough Points" : "Redeem"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Book Flights</h4>
              <p className="text-sm text-gray-600">Earn 50 points per 0.1 AVAX spent</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Resell Tickets</h4>
              <p className="text-sm text-gray-600">Earn 200 points per successful resale</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Early Cancellations</h4>
              <p className="text-sm text-gray-600">Earn 100 points for helping liquidity</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-medium mb-2">Refer Friends</h4>
              <p className="text-sm text-gray-600">Earn 500 points per successful referral</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
