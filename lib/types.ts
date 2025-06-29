// Shared types for marketplace listings
export interface SellerReputation {
  level: "New" | "Silver" | "Gold" | "Platinum" | "Diamond"
  rating: number
  totalSales: number
  joinDate: string
  badges: string[]
  verified: boolean
}

export interface MarketplaceListing {
  id: string
  seller: {
    address: string
    reputation: SellerReputation
  }
  ticket: {
    route: { from: string; to: string; fromFull: string; toFull: string }
    date: string
    time: string
    class: string
    seat: string
    airline: string
    flightNumber: string
    nftId: string
  }
  pricing: {
    originalPrice: number
    listingPrice: number
    discount: number
  }
  listing: {
    timeLeft: string
    description: string
    negotiable: boolean
    instantBuy: boolean
  }
}
