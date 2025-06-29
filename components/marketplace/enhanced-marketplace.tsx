"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Star,
  TrendingDown,
  ShoppingCart,
  User,
  Crown,
  Award,
  Shield,
  Verified,
  Calendar,
  Clock,
  MapPin,
  Plane,
  Loader2,
} from "lucide-react"
import { getMarketplaceListings, buyTicket } from "@/lib/api"
import { MarketplaceListing } from "@/lib/types"

export function EnhancedMarketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price-low")
  const [filterBy, setFilterBy] = useState("all")
  const [buyingId, setBuyingId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setLoading(true)
    getMarketplaceListings()
      .then((data) => {
        setListings(data)
        setError(null)
      })
      .catch(() => setError("Failed to load listings"))
      .finally(() => setLoading(false))
  }, [])

  const getReputationIcon = (level: string) => {
    switch (level) {
      case "Diamond":
        return <Crown className="w-4 h-4 text-purple-600" />
      case "Platinum":
        return <Award className="w-4 h-4 text-blue-600" />
      case "Gold":
        return <Star className="w-4 h-4 text-yellow-600" />
      case "Silver":
        return <Shield className="w-4 h-4 text-gray-600" />
      default:
        return <User className="w-4 h-4 text-gray-400" />
    }
  }

  const getReputationColor = (level: string) => {
    switch (level) {
      case "Diamond":
        return "from-purple-500 to-pink-500"
      case "Platinum":
        return "from-blue-500 to-cyan-500"
      case "Gold":
        return "from-yellow-500 to-orange-500"
      case "Silver":
        return "from-gray-400 to-gray-600"
      default:
        return "from-gray-300 to-gray-400"
    }
  }

  const handleBuyTicket = async (listing: MarketplaceListing) => {
    setBuyingId(listing.id)
    setSuccessMsg(null)
    try {
      await buyTicket(listing.ticket.nftId)
      setSuccessMsg("Purchase successful!")
      // Optionally, refresh listings here
    } catch (e) {
      setError("Purchase failed. Please try again.")
    } finally {
      setBuyingId(null)
    }
  }

  const handleMakeOffer = (listing: MarketplaceListing) => {
    // Implement offer logic if needed
    alert("Offer functionality coming soon!")
  }

  const fetchListings = async () => {
    setFetching(true)
    setError(null)
    setSuccessMsg(null)
    try {
      const data = await getMarketplaceListings()
      setListings(data)
    } catch {
      setError("Failed to load listings")
    } finally {
      setFetching(false)
    }
  }

  // Optionally filter/sort listings here
  let filteredListings = listings.filter((listing) => {
    const search = searchTerm.toLowerCase()
    return (
      listing.ticket.route.fromFull.toLowerCase().includes(search) ||
      listing.ticket.route.toFull.toLowerCase().includes(search) ||
      listing.ticket.airline.toLowerCase().includes(search) ||
      listing.seller.address.toLowerCase().includes(search)
    )
  })
  if (filterBy === "verified") filteredListings = filteredListings.filter((l) => l.seller.reputation.verified)
  if (filterBy === "negotiable") filteredListings = filteredListings.filter((l) => l.listing.negotiable)
  if (filterBy === "instant") filteredListings = filteredListings.filter((l) => l.listing.instantBuy)
  if (sortBy === "price-low") filteredListings = filteredListings.sort((a, b) => a.pricing.listingPrice - b.pricing.listingPrice)
  if (sortBy === "price-high") filteredListings = filteredListings.sort((a, b) => b.pricing.listingPrice - a.pricing.listingPrice)
  if (sortBy === "discount") filteredListings = filteredListings.sort((a, b) => b.pricing.discount - a.pricing.discount)
  if (sortBy === "rating") filteredListings = filteredListings.sort((a, b) => b.seller.reputation.rating - a.seller.reputation.rating)
  if (sortBy === "time") filteredListings = filteredListings.sort((a, b) => a.listing.timeLeft.localeCompare(b.listing.timeLeft))

  if (loading) return <div>Loading marketplace...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      {successMsg && <div className="text-green-600 font-semibold">{successMsg}</div>}
      {/* Search and Filters */}
      <div className="flex justify-end mb-2">
        <Button onClick={fetchListings} disabled={fetching} className="flex items-center gap-2">
          {fetching && <Loader2 className="animate-spin w-4 h-4" />}
          {fetching ? "Fetching..." : "Fetch Listings"}
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by route, airline, or seller..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="rating">Seller Rating</SelectItem>
                  <SelectItem value="time">Time Left</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="verified">Verified Sellers</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                  <SelectItem value="instant">Instant Buy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
            <p className="text-sm text-gray-600">Active Listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">16%</p>
            <p className="text-sm text-gray-600">Avg. Discount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">4.8</p>
            <p className="text-sm text-gray-600">Avg. Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">98%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Flight Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {listing.ticket.route.fromFull} → {listing.ticket.route.toFull}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {listing.ticket.airline} • {listing.ticket.flightNumber}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {listing.pricing.discount}% OFF
                        </Badge>
                        {listing.listing.negotiable && <Badge variant="outline">Negotiable</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{new Date(listing.ticket.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{listing.ticket.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {listing.ticket.class} • {listing.ticket.seat}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Plane className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">NFT #{listing.ticket.nftId.split("-")[1]}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{listing.listing.description}</p>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback
                          className={`bg-gradient-to-r ${getReputationColor(listing.seller.reputation.level)} text-white`}
                        >
                          {getReputationIcon(listing.seller.reputation.level)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm truncate">{listing.seller.address}</p>
                          {listing.seller.reputation.verified && <Verified className="w-4 h-4 text-blue-500" />}
                          <Badge
                            className={`bg-gradient-to-r ${getReputationColor(listing.seller.reputation.level)} text-white text-xs`}
                          >
                            {listing.seller.reputation.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            {listing.seller.reputation.rating}
                          </div>
                          <span>{listing.seller.reputation.totalSales} sales</span>
                          <span>Since {new Date(listing.seller.reputation.joinDate).getFullYear()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {listing.seller.reputation.badges.slice(0, 2).map((badge, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="lg:w-64 text-center lg:text-right">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 line-through">{listing.pricing.originalPrice} AVAX</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{listing.pricing.listingPrice} AVAX</p>
                      <p className="text-sm text-green-600 font-medium">
                        Save {(listing.pricing.originalPrice - listing.pricing.listingPrice).toFixed(2)} AVAX
                      </p>
                    </div>

                    <div className="space-y-2">
                      {listing.listing.instantBuy && (
                        <Button
                          className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700"
                          onClick={() => handleBuyTicket(listing)}
                          disabled={buyingId === listing.id}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {buyingId === listing.id ? "Processing..." : "Buy Now"}
                        </Button>
                      )}

                      {listing.listing.negotiable && (
                        <Button variant="outline" className="w-full" onClick={() => handleMakeOffer(listing)}>
                          Make Offer
                        </Button>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-3">{listing.listing.timeLeft} left • Instant transfer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
