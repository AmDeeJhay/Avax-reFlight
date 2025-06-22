"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from "lucide-react"
import { MakeOfferModal } from "@/components/user/modals/make-offer-modal"
import { SellerProfileTooltip } from "@/components/user/seller-profile-tooltip"

// Mock marketplace data
const mockListings = [
  {
    id: "1",
    nftId: "NFT-12345",
    route: { from: "NYC", to: "LAX", fromFull: "New York", toFull: "Los Angeles" },
    date: "2024-12-20",
    time: "14:30",
    class: "Business",
    seat: "4A",
    airline: "SkyLink Airways",
    flightNumber: "SL 1234",
    originalPrice: 0.89,
    listingPrice: 0.65,
    discount: 27,
    seller: "0x1234...5678",
    sellerRating: 4.8,
    listingDate: "2024-11-20",
  },
  {
    id: "2",
    nftId: "NFT-12346",
    route: { from: "LAX", to: "MIA", fromFull: "Los Angeles", toFull: "Miami" },
    date: "2024-12-22",
    time: "09:15",
    class: "Economy",
    seat: "12B",
    airline: "ChainFly",
    flightNumber: "CF 5678",
    originalPrice: 0.42,
    listingPrice: 0.32,
    discount: 24,
    seller: "0x5678...9012",
    sellerRating: 4.6,
    listingDate: "2024-11-21",
  },
]

export default function Marketplace() {
  const { toast } = useToast()

  const handleBuyNow = (listing: (typeof mockListings)[0]) => {
    toast({
      title: "Purchase Initiated",
      description: `Buying ticket ${listing.nftId} for ${listing.listingPrice} AVAX`,
    })

    // API call would go here
    fetch(`/api/marketplace/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId: listing.id }),
    })
      .then(() => {
        setTimeout(() => {
          toast({
            title: "Purchase Successful!",
            description: `You now own NFT ticket ${listing.nftId}. Check your wallet.`,
          })
        }, 2000)
      })
      .catch(() => {
        toast({
          title: "Purchase Failed",
          description: "Failed to complete purchase. Please try again.",
          variant: "destructive",
        })
      })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Resale Marketplace</h1>
        <p className="text-gray-600 mt-2">Buy unused tickets from other travelers at discounted prices</p>
      </div>

      {/* Marketplace Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockListings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2 truncate">
                  {listing.route.fromFull} → {listing.route.toFull}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {listing.airline} • {listing.flightNumber}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(listing.date).toLocaleDateString()} • {listing.time}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {listing.class} • Seat {listing.seat}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-green-600">{listing.listingPrice} AVAX</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{listing.discount}% off</span>
                </div>
                <p className="text-sm text-gray-500 line-through">Original: {listing.originalPrice} AVAX</p>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600">
                  Seller:{" "}
                  <SellerProfileTooltip seller={listing.seller}>
                    <span className="font-medium">{listing.seller}</span>
                  </SellerProfileTooltip>{" "}
                  • Rating: ⭐ {listing.sellerRating}
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700"
                  onClick={() => handleBuyNow(listing)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <MakeOfferModal listing={listing} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How Marketplace Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h4 className="font-medium mb-2">Browse Listings</h4>
              <p className="text-sm text-gray-600">
                Find discounted tickets from travelers who can't make their flights
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                  />
                </svg>
              </div>
              <h4 className="font-medium mb-2">Buy Instantly</h4>
              <p className="text-sm text-gray-600">Purchase with one click - NFT ownership transfers automatically</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h4 className="font-medium mb-2">Fly & Save</h4>
              <p className="text-sm text-gray-600">Use your new ticket and save money on your travel</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
