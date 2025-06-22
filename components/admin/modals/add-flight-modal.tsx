"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Plane } from "lucide-react"

interface AddFlightModalProps {
  trigger?: React.ReactNode
}

export function AddFlightModal({ trigger }: AddFlightModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    airline: "",
    flightNumber: "",
    aircraft: "",
    fromAirport: "",
    toAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    economySeats: "",
    businessSeats: "",
    firstSeats: "",
    economyPrice: "",
    businessPrice: "",
    firstPrice: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate flight creation
    toast({
      title: "Flight Created Successfully",
      description: `Flight ${formData.flightNumber} has been added to the system`,
    })

    setOpen(false)
    setFormData({
      airline: "",
      flightNumber: "",
      aircraft: "",
      fromAirport: "",
      toAirport: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      economySeats: "",
      businessSeats: "",
      firstSeats: "",
      economyPrice: "",
      businessPrice: "",
      firstPrice: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-red-500 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add New Flight
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Add New Flight
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Flight Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="airline">Airline</Label>
              <Input
                id="airline"
                value={formData.airline}
                onChange={(e) => handleInputChange("airline", e.target.value)}
                placeholder="e.g., SkyLink Airways"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                value={formData.flightNumber}
                onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                placeholder="e.g., SL 1234"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aircraft">Aircraft Type</Label>
            <Select value={formData.aircraft} onValueChange={(value) => handleInputChange("aircraft", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select aircraft type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Boeing 737">Boeing 737</SelectItem>
                <SelectItem value="Boeing 787">Boeing 787</SelectItem>
                <SelectItem value="Airbus A320">Airbus A320</SelectItem>
                <SelectItem value="Airbus A350">Airbus A350</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromAirport">From Airport</Label>
              <Input
                id="fromAirport"
                value={formData.fromAirport}
                onChange={(e) => handleInputChange("fromAirport", e.target.value)}
                placeholder="e.g., JFK - New York"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toAirport">To Airport</Label>
              <Input
                id="toAirport"
                value={formData.toAirport}
                onChange={(e) => handleInputChange("toAirport", e.target.value)}
                placeholder="e.g., LAX - Los Angeles"
                required
              />
            </div>
          </div>

          {/* Schedule Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Departure</h3>
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
              <h3 className="font-semibold">Arrival</h3>
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

          {/* Capacity Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold">Seat Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="economySeats">Economy Seats</Label>
                <Input
                  id="economySeats"
                  type="number"
                  value={formData.economySeats}
                  onChange={(e) => handleInputChange("economySeats", e.target.value)}
                  placeholder="150"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessSeats">Business Seats</Label>
                <Input
                  id="businessSeats"
                  type="number"
                  value={formData.businessSeats}
                  onChange={(e) => handleInputChange("businessSeats", e.target.value)}
                  placeholder="20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstSeats">First Class Seats</Label>
                <Input
                  id="firstSeats"
                  type="number"
                  value={formData.firstSeats}
                  onChange={(e) => handleInputChange("firstSeats", e.target.value)}
                  placeholder="8"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold">Pricing (AVAX)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="economyPrice">Economy Price</Label>
                <Input
                  id="economyPrice"
                  type="number"
                  step="0.01"
                  value={formData.economyPrice}
                  onChange={(e) => handleInputChange("economyPrice", e.target.value)}
                  placeholder="0.45"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPrice">Business Price</Label>
                <Input
                  id="businessPrice"
                  type="number"
                  step="0.01"
                  value={formData.businessPrice}
                  onChange={(e) => handleInputChange("businessPrice", e.target.value)}
                  placeholder="0.89"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstPrice">First Class Price</Label>
                <Input
                  id="firstPrice"
                  type="number"
                  step="0.01"
                  value={formData.firstPrice}
                  onChange={(e) => handleInputChange("firstPrice", e.target.value)}
                  placeholder="1.25"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
              Create Flight
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
