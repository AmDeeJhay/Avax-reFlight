"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, MapPin, Users, DollarSign, BarChart3 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchFromApi } from "@/lib/api"

interface FlightDetailsModalProps {
  flight: any
  trigger?: React.ReactNode
}

export function FlightDetailsModal({ flight, trigger }: FlightDetailsModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<any>(null)

  useEffect(() => {
    if (open && flight?._id) {
      setLoading(true)
      fetchFromApi(`admin/flights/${flight._id}`)
        .then((res) => {
          setDetails(res.data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [open, flight?._id])

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

  const totalRevenue = flight
    ? (
        flight.booked.economy * flight.pricing.economy +
        flight.booked.business * flight.pricing.business +
        flight.booked.first * flight.pricing.first
      ).toFixed(2)
    : "0.00"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-gradient-to-r from-red-500 to-blue-600">
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Details - {flight?.flightNumber}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <Skeleton className="h-6 w-32 mb-2" />
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-40 mb-2" />
                  ))}
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="passengers">Passengers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      Flight Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Airline:</span>
                        <span className="font-medium">{details?.airline || flight?.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight Number:</span>
                        <span className="font-medium">{details?.flightNumber || flight?.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aircraft:</span>
                        <span className="font-medium">{details?.aircraft || flight?.aircraft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        {getStatusBadge(details?.status || flight?.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Route & Schedule
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route:</span>
                        <span className="font-medium">
                          {details?.route?.fromFull} → {details?.route?.toFull}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departure:</span>
                        <span className="font-medium">
                          {details?.departure?.date} at {details?.departure?.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Arrival:</span>
                        <span className="font-medium">
                          {details?.arrival?.date} at {details?.arrival?.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{details?.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Capacity Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">Economy</p>
                      <p className="text-2xl font-bold">
                        {details?.booked?.economy}/{details?.capacity?.economy}
                      </p>
                      <p className="text-xs text-gray-600">{details?.pricing?.economy} AVAX</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(details?.booked?.economy / details?.capacity?.economy) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">Business</p>
                      <p className="text-2xl font-bold">
                        {details?.booked?.business}/{details?.capacity?.business}
                      </p>
                      <p className="text-xs text-gray-600">{details?.pricing?.business} AVAX</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(details?.booked?.business / details?.capacity?.business) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">First Class</p>
                      <p className="text-2xl font-bold">
                        {details?.booked?.first}/{details?.capacity?.first}
                      </p>
                      <p className="text-xs text-gray-600">{details?.pricing?.first} AVAX</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(details?.booked?.first / details?.capacity?.first) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {details ? details.booked.economy + details.booked.business + details.booked.first : 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{details?.booked?.economy || 0}</p>
                    <p className="text-sm text-gray-600">Economy</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{details?.booked?.business || 0}</p>
                    <p className="text-sm text-gray-600">Business</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{details?.booked?.first || 0}</p>
                    <p className="text-sm text-gray-600">First Class</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Revenue Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Economy Revenue:</span>
                        <span className="font-medium">
                          {details ? (details.booked.economy * details.pricing.economy).toFixed(2) : "0.00"} AVAX
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Business Revenue:</span>
                        <span className="font-medium">
                          {details ? (details.booked.business * details.pricing.business).toFixed(2) : "0.00"} AVAX
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">First Class Revenue:</span>
                        <span className="font-medium">
                          {details ? (details.booked.first * details.pricing.first).toFixed(2) : "0.00"} AVAX
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Revenue:</span>
                        <span className="font-bold text-green-600">{totalRevenue} AVAX</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Occupancy Rate:</span>
                        <span className="font-medium">
                          {details ? getOccupancyRate(details.booked, details.capacity) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Revenue per Seat:</span>
                        <span className="font-medium">
                          {details
                            ? (
                                Number.parseFloat(totalRevenue) /
                                (details.capacity.economy + details.capacity.business + details.capacity.first)
                              ).toFixed(3)
                            : "0.000"}{" "}
                          AVAX
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Load Factor:</span>
                        <span className="font-medium">
                          {details ? getOccupancyRate(details.booked, details.capacity) : 0}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="passengers" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Passenger Information
                  </h3>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Passenger manifest and details would be displayed here</p>
                    <p className="text-sm text-gray-500 mt-2">This feature requires integration with booking system</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
