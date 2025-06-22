"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Plane, Star, Zap, Coffee, Wifi, Monitor, DollarSign } from "lucide-react"

interface SeatMap {
  rows: number
  seatsPerRow: string[]
  seatTypes: Record<
    string,
    {
      type: "economy" | "premium" | "business" | "first"
      price: number
      features: string[]
      available: boolean
    }
  >
}

const mockSeatMap: SeatMap = {
  rows: 30,
  seatsPerRow: ["A", "B", "C", "", "D", "E", "F"],
  seatTypes: {
    // First Class (Rows 1-2)
    "1A": { type: "first", price: 0.25, features: ["lie-flat", "premium-meal", "priority"], available: true },
    "1B": { type: "first", price: 0.25, features: ["lie-flat", "premium-meal", "priority"], available: false },
    "1D": { type: "first", price: 0.25, features: ["lie-flat", "premium-meal", "priority"], available: true },
    "1F": { type: "first", price: 0.25, features: ["lie-flat", "premium-meal", "priority"], available: true },

    // Business Class (Rows 3-6)
    "3A": { type: "business", price: 0.15, features: ["extra-legroom", "premium-meal", "priority"], available: true },
    "3C": { type: "business", price: 0.15, features: ["extra-legroom", "premium-meal", "priority"], available: true },
    "4A": { type: "business", price: 0.15, features: ["extra-legroom", "premium-meal", "priority"], available: false },

    // Premium Economy (Rows 7-10)
    "7A": { type: "premium", price: 0.08, features: ["extra-legroom", "priority-boarding"], available: true },
    "8C": { type: "premium", price: 0.08, features: ["extra-legroom", "priority-boarding"], available: true },
    "9F": { type: "premium", price: 0.08, features: ["extra-legroom", "priority-boarding"], available: true },

    // Economy (Rows 11-30)
    "12A": { type: "economy", price: 0, features: ["standard"], available: true },
    "12B": { type: "economy", price: 0, features: ["standard"], available: true },
    "15F": { type: "economy", price: 0, features: ["window"], available: true },
    "20C": { type: "economy", price: 0, features: ["aisle"], available: false },
  },
}

interface SeatSelectionProps {
  flightId: string
  onSeatSelect: (seat: string, price: number) => void
}

export function SeatSelection({ flightId, onSeatSelect }: SeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null)

  const getSeatInfo = (row: number, seat: string) => {
    const seatId = `${row}${seat}`
    return (
      mockSeatMap.seatTypes[seatId] || {
        type: "economy" as const,
        price: 0,
        features: ["standard"],
        available: Math.random() > 0.3, // Random availability for demo
      }
    )
  }

  const getSeatColor = (seatInfo: any, seatId: string) => {
    if (!seatInfo.available) return "bg-gray-300 cursor-not-allowed"
    if (selectedSeat === seatId) return "bg-blue-600 text-white"
    if (hoveredSeat === seatId) return "bg-blue-100 border-blue-300"

    switch (seatInfo.type) {
      case "first":
        return "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 hover:from-purple-200 hover:to-pink-200"
      case "business":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 hover:from-blue-200 hover:to-cyan-200"
      case "premium":
        return "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 hover:from-green-200 hover:to-emerald-200"
      default:
        return "bg-gray-50 border-gray-300 hover:bg-gray-100"
    }
  }

  const handleSeatClick = (row: number, seat: string) => {
    const seatId = `${row}${seat}`
    const seatInfo = getSeatInfo(row, seat)

    if (!seatInfo.available) return

    setSelectedSeat(seatId)
    onSeatSelect(seatId, seatInfo.price)
  }

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "lie-flat":
        return <Star className="w-3 h-3" />
      case "extra-legroom":
        return <Zap className="w-3 h-3" />
      case "premium-meal":
        return <Coffee className="w-3 h-3" />
      case "wifi":
        return <Wifi className="w-3 h-3" />
      case "entertainment":
        return <Monitor className="w-3 h-3" />
      default:
        return null
    }
  }

  const selectedSeatInfo = selectedSeat
    ? getSeatInfo(Number.parseInt(selectedSeat.slice(0, -1)), selectedSeat.slice(-1))
    : null

  return (
    <div className="space-y-6">
      {/* Aircraft Header */}
      <Card>
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Plane className="w-6 h-6" />
            <span>Select Your Seat</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Boeing 737-800 • 180 seats</p>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded" />
                  <span>First Class</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-300 rounded" />
                  <span>Business</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded" />
                  <span>Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded" />
                  <span>Economy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded" />
                  <span>Occupied</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {Array.from({ length: mockSeatMap.rows }, (_, rowIndex) => {
                  const row = rowIndex + 1
                  return (
                    <div key={row} className="flex items-center justify-center space-x-1">
                      <div className="w-6 text-xs text-gray-500 text-center">{row}</div>
                      {mockSeatMap.seatsPerRow.map((seat, seatIndex) => {
                        if (seat === "") {
                          return <div key={seatIndex} className="w-4" />
                        }

                        const seatId = `${row}${seat}`
                        const seatInfo = getSeatInfo(row, seat)

                        return (
                          <motion.button
                            key={seatId}
                            className={cn(
                              "w-8 h-8 text-xs font-medium border rounded transition-all duration-200",
                              getSeatColor(seatInfo, seatId),
                            )}
                            disabled={!seatInfo.available}
                            onClick={() => handleSeatClick(row, seat)}
                            onMouseEnter={() => setHoveredSeat(seatId)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            whileHover={seatInfo.available ? { scale: 1.1 } : {}}
                            whileTap={seatInfo.available ? { scale: 0.95 } : {}}
                          >
                            {seat}
                          </motion.button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seat Details */}
        <div className="space-y-4">
          {selectedSeat && selectedSeatInfo ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seat {selectedSeat}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge
                    className={cn(
                      "mb-2",
                      selectedSeatInfo.type === "first" && "bg-purple-100 text-purple-800",
                      selectedSeatInfo.type === "business" && "bg-blue-100 text-blue-800",
                      selectedSeatInfo.type === "premium" && "bg-green-100 text-green-800",
                      selectedSeatInfo.type === "economy" && "bg-gray-100 text-gray-800",
                    )}
                  >
                    {selectedSeatInfo.type.charAt(0).toUpperCase() + selectedSeatInfo.type.slice(1)} Class
                  </Badge>

                  {selectedSeatInfo.price > 0 && (
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">+{selectedSeatInfo.price} AVAX</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="space-y-2">
                    {selectedSeatInfo.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {getFeatureIcon(feature)}
                        <span className="capitalize">{feature.replace("-", " ")}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => console.log("Confirm seat:", selectedSeat)}
                >
                  Confirm Seat Selection
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Select a Seat</h3>
                <p className="text-sm text-gray-600">Click on any available seat to see details and pricing</p>
              </CardContent>
            </Card>
          )}

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seat Upgrade Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>First Class</span>
                <span className="font-medium">+0.25 AVAX</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Business Class</span>
                <span className="font-medium">+0.15 AVAX</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Premium Economy</span>
                <span className="font-medium">+0.08 AVAX</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Economy</span>
                <span className="font-medium text-green-600">Included</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
