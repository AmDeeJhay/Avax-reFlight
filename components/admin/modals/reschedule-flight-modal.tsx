"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchFromApi } from "@/lib/api"

interface RescheduleFlightModalProps {
  flight: any
  trigger?: React.ReactNode
}

export function RescheduleFlightModal({ flight, trigger }: RescheduleFlightModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    departureDate: flight?.departure?.date || "",
    departureTime: flight?.departure?.time || "",
    arrivalDate: flight?.arrival?.date || "",
    arrivalTime: flight?.arrival?.time || "",
    reason: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchFromApi(`admin/flights/${flight._id}/reschedule`, {
        method: "PATCH",
        body: JSON.stringify({
          departure: { date: formData.departureDate, time: formData.departureTime },
          arrival: { date: formData.arrivalDate, time: formData.arrivalTime },
          reason: formData.reason,
        }),
        headers: { "Content-Type": "application/json" },
      })
      toast({
        title: "Flight Rescheduled",
        description: `${flight.flightNumber} has been rescheduled successfully. Passengers will be notified automatically.`,
      })
      setOpen(false)
    } catch (err: any) {
      toast({
        title: "Reschedule Failed",
        description: err?.message || "Failed to reschedule flight. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Reschedule
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Reschedule Flight {flight?.flightNumber}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Current Schedule</h3>
              <p className="text-sm text-gray-600">
                {flight?.route?.fromFull} → {flight?.route?.toFull}
              </p>
              <p className="text-sm text-gray-600">
                Departure: {flight?.departure?.date} at {flight?.departure?.time}
              </p>
              <p className="text-sm text-gray-600">
                Arrival: {flight?.arrival?.date} at {flight?.arrival?.time}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  New Departure
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">Date</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Time</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => handleInputChange("departureTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  New Arrival
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="arrivalDate">Date</Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={formData.arrivalDate}
                      onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arrivalTime">Time</Label>
                    <Input
                      id="arrivalTime"
                      type="time"
                      value={formData.arrivalTime}
                      onChange={(e) => handleInputChange("arrivalTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Reschedule</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Enter reason for rescheduling (will be sent to passengers)"
                rows={3}
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All passengers will be automatically notified of the schedule change via email and push notifications. Refund options will be provided if requested.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
                Reschedule Flight
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
