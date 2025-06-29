"use client"

import { useEffect, useState } from "react"
import { fetchFromApi } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Search, MoreVertical, Edit, Trash2, Plane, Calendar, Clock, MapPin, Filter } from "lucide-react"
import { AddFlightModal } from "@/components/admin/modals/add-flight-modal"
import { EditFlightModal } from "@/components/admin/modals/edit-flight-modal"
import { RescheduleFlightModal } from "@/components/admin/modals/reschedule-flight-modal"
import { FlightDetailsModal } from "@/components/admin/modals/flight-details-modal"
import { Skeleton } from "@/components/ui/skeleton"

export default function FlightManagement() {
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetchFromApi("flights")
      .then((res) => {
        setFlights(res.data.flights || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to fetch flights")
        setLoading(false)
      })
  }, [])

  const handleCancelFlight = (flight: any) => {
    if (confirm(`Are you sure you want to cancel flight ${flight.flightNumber}?`)) {
      toast({
        title: "Flight Cancelled",
        description: `${flight.flightNumber} has been cancelled. Refunds will be processed automatically.`,
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "delayed":
        return <Badge className="bg-yellow-100 text-yellow-800">Delayed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getOccupancyRate = (booked: any, capacity: any) => {
    const totalBooked = booked.economy + booked.business + booked.first
    const totalCapacity = capacity.economy + capacity.business + capacity.first
    return Math.round((totalBooked / totalCapacity) * 100)
  }

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      (flight.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (flight.airline?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (flight.route?.fromFull?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (flight.route?.toFull?.toLowerCase().includes(searchTerm.toLowerCase()) || "")

    const matchesStatus = statusFilter === "all" || flight.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="h-10 w-36 rounded" />
          </div>
        </div>
        {/* Search and Filters Skeleton */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 text-center">
                <Skeleton className="h-10 w-20 mx-auto mb-2" />
                <Skeleton className="h-5 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Flights Table Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Skeleton className="h-6 w-40" />
                          <div className="flex items-center space-x-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-64 mb-4" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          {[...Array(4)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-32" />
                          ))}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[...Array(3)].map((_, j) => (
                            <Skeleton key={j} className="h-16 w-full" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-6 w-24 mb-4" />
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flight Management</h1>
            <p className="text-gray-600 mt-2">Manage flights, schedules, and pricing</p>
          </div>
          <AddFlightModal />
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search flights by number, airline, or route..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{flights.length}</p>
            <p className="text-sm text-gray-600">Total Flights</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{flights.filter((f) => f.status === "active").length}</p>
            <p className="text-sm text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{flights.filter((f) => f.status === "delayed").length}</p>
            <p className="text-sm text-gray-600">Delayed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(flights.reduce((sum, f) => sum + getOccupancyRate(f.booked, f.capacity), 0) / flights.length)}
              %
            </p>
            <p className="text-sm text-gray-600">Avg. Occupancy</p>
          </CardContent>
        </Card>
      </div>

      {/* Flights Table */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          {flight.route.fromFull} → {flight.route.toFull}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(flight.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <EditFlightModal
                                flight={flight}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Flight
                                  </DropdownMenuItem>
                                }
                              />
                              <RescheduleFlightModal
                                flight={flight}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Reschedule
                                  </DropdownMenuItem>
                                }
                              />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleCancelFlight(flight)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Flight
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {flight.airline} • {flight.flightNumber} • {flight.aircraft}
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{new Date(flight.departure.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {flight.departure.time} - {flight.arrival.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {flight.departure.airport} → {flight.arrival.airport}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{flight.duration}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-700">Economy</p>
                          <p className="text-lg font-bold">
                            {flight.booked.economy}/{flight.capacity.economy}
                          </p>
                          <p className="text-xs text-gray-600">{flight.pricing.economy} AVAX</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-700">Business</p>
                          <p className="text-lg font-bold">
                            {flight.booked.business}/{flight.capacity.business}
                          </p>
                          <p className="text-xs text-gray-600">{flight.pricing.business} AVAX</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-700">First Class</p>
                          <p className="text-lg font-bold">
                            {flight.booked.first}/{flight.capacity.first}
                          </p>
                          <p className="text-xs text-gray-600">{flight.pricing.first} AVAX</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Occupancy Rate</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {getOccupancyRate(flight.booked, flight.capacity)}%
                        </p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-semibold text-green-600">
                          {(
                            flight.booked.economy * flight.pricing.economy +
                            flight.booked.business * flight.pricing.business +
                            flight.booked.first * flight.pricing.first
                          ).toFixed(2)}{" "}
                          AVAX
                        </p>
                      </div>
                      <FlightDetailsModal flight={flight} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFlights.length === 0 && (
            <div className="text-center py-12">
              <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search terms." : "No flights match the selected filters."}
              </p>
              <AddFlightModal />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
