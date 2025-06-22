"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { SeatSelection } from "@/components/booking/seat-selection"
import { useToast } from "@/hooks/use-toast"
import { Search, Calendar, Users, Plane, Wifi, Coffee, Monitor, Star, ArrowRight } from "lucide-react"
import { AirportSelector } from "@/components/booking/airport-selector"

// Mock flight data with enhanced details
const mockFlights = [
  {
    id: "SL1234",
    airline: "SkyLink Airways",
    flightNumber: "SL 1234",
    departure: { city: "New York", code: "NYC", time: "08:30", airport: "JFK" },
    arrival: { city: "Los Angeles", code: "LAX", time: "11:45", airport: "LAX" },
    duration: "5h 15m",
    price: { economy: 0.45, business: 0.89, first: 1.25 },
    amenities: ["wifi", "meals", "entertainment"],
    stops: 0,
    aircraft: "Boeing 737",
    rating: 4.8,
    carbonFootprint: 0.85,
    onTimePerformance: 92,
  },
  {
    id: "CF5678",
    airline: "ChainFly",
    flightNumber: "CF 5678",
    departure: { city: "New York", code: "NYC", time: "14:15", airport: "JFK" },
    arrival: { city: "Los Angeles", code: "LAX", time: "17:30", airport: "LAX" },
    duration: "5h 15m",
    price: { economy: 0.42, business: 0.85, first: 1.18 },
    amenities: ["wifi", "meals", "entertainment", "extra-legroom"],
    stops: 0,
    aircraft: "Airbus A320",
    rating: 4.6,
    carbonFootprint: 0.78,
    onTimePerformance: 88,
  },
  {
    id: "AC9012",
    airline: "AeroChain",
    flightNumber: "AC 9012",
    departure: { city: "New York", code: "NYC", time: "18:45", airport: "JFK" },
    arrival: { city: "Los Angeles", code: "LAX", time: "22:00", airport: "LAX" },
    duration: "5h 15m",
    price: { economy: 0.38, business: 0.78, first: 1.12 },
    amenities: ["wifi", "entertainment"],
    stops: 0,
    aircraft: "Boeing 787",
    rating: 4.4,
    carbonFootprint: 0.72,
    onTimePerformance: 85,
  },
]

export default function BookFlightsPage() {
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departure: "",
    passengers: "1",
    class: "economy",
  })
  const [flights, setFlights] = useState<typeof mockFlights>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [showSeatSelection, setShowSeatSelection] = useState(false)

  const handleSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departure) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      setFlights(mockFlights)
      setIsSearching(false)
      toast({
        title: "Flights Found",
        description: `Found ${mockFlights.length} flights for your search.`,
      })
    }, 2000)
  }

  const handleBookFlight = (flightId: string) => {
    setSelectedFlight(flightId)
    setShowSeatSelection(true)
  }

  const handleSeatSelect = (seat: string, price: number) => {
    toast({
      title: "Seat Selected",
      description: `Selected seat ${seat} with additional cost of ${price} AVAX`,
    })
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "meals":
        return <Coffee className="w-4 h-4" />
      case "entertainment":
        return <Monitor className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  if (showSeatSelection && selectedFlight) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select Your Seat</h1>
            <p className="text-gray-600">Choose your preferred seat for flight {selectedFlight}</p>
          </div>
          <Button variant="outline" onClick={() => setShowSeatSelection(false)}>
            ← Back to Flights
          </Button>
        </div>
        <SeatSelection flightId={selectedFlight} onSeatSelect={handleSeatSelect} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <StaggerContainer>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Flights</h1>
          <p className="text-gray-600">Search and book flights on the blockchain</p>
        </motion.div>

        {/* Search Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Flights
              </CardTitle>
              <CardDescription>Find the perfect flight for your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <AirportSelector
                    value={searchParams.from}
                    onSelect={(code) => setSearchParams({ ...searchParams, from: code })}
                    placeholder="Select departure city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <AirportSelector
                    value={searchParams.to}
                    onSelect={(code) => setSearchParams({ ...searchParams, to: code })}
                    placeholder="Select destination city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departure">Departure</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="departure"
                      type="date"
                      className="pl-10"
                      value={searchParams.departure}
                      onChange={(e) => setSearchParams({ ...searchParams, departure: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select
                    value={searchParams.passengers}
                    onValueChange={(value) => setSearchParams({ ...searchParams, passengers: value })}
                  >
                    <SelectTrigger>
                      <Users className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={searchParams.class}
                    onValueChange={(value) => setSearchParams({ ...searchParams, class: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700"
              >
                {isSearching ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Searching Flights...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Flights
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flight Results */}
        {flights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Flights</h2>

            {flights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Plane className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{flight.airline}</h3>
                            <p className="text-gray-600">
                              {flight.flightNumber} • {flight.aircraft}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-auto">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{flight.rating}</span>
                            </div>
                            <Badge variant="secondary">{flight.onTimePerformance}% On-time</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                          {/* Departure */}
                          <div>
                            <p className="text-2xl font-bold">{flight.departure.time}</p>
                            <p className="text-gray-600">
                              {flight.departure.city} ({flight.departure.code})
                            </p>
                            <p className="text-sm text-gray-500">{flight.departure.airport}</p>
                          </div>

                          {/* Duration */}
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <div className="h-px bg-gray-300 flex-1" />
                              <Plane className="w-4 h-4 text-gray-400 mx-2" />
                              <div className="h-px bg-gray-300 flex-1" />
                            </div>
                            <p className="text-sm font-medium">{flight.duration}</p>
                            <p className="text-xs text-gray-500">
                              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                            </p>
                          </div>

                          {/* Arrival */}
                          <div className="text-right">
                            <p className="text-2xl font-bold">{flight.arrival.time}</p>
                            <p className="text-gray-600">
                              {flight.arrival.city} ({flight.arrival.code})
                            </p>
                            <p className="text-sm text-gray-500">{flight.arrival.airport}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {flight.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                              {getAmenityIcon(amenity)}
                              <span className="capitalize">{amenity.replace("-", " ")}</span>
                            </Badge>
                          ))}
                        </div>

                        {/* Environmental Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Carbon footprint: {flight.carbonFootprint} tons CO₂</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>Fuel efficient aircraft</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="lg:w-64 text-center lg:text-right">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between lg:justify-end items-center">
                            <span className="text-sm text-gray-600 lg:hidden">Economy:</span>
                            <div>
                              <span className="text-2xl font-bold">
                                {flight.price[searchParams.class as keyof typeof flight.price]} AVAX
                              </span>
                              <p className="text-sm text-gray-600 capitalize">{searchParams.class}</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleBookFlight(flight.id)}
                          className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700"
                        >
                          Select Flight
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <p className="text-xs text-gray-500 mt-2">Price per passenger • Taxes included</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {flights.length === 0 && !isSearching && searchParams.from && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or dates.</p>
            <Button variant="outline" onClick={() => setFlights([])}>
              Clear Search
            </Button>
          </motion.div>
        )}
      </StaggerContainer>
    </div>
  )
}
