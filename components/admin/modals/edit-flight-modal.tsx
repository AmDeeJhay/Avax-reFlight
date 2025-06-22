"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Edit } from "lucide-react"

interface EditFlightModalProps {
  flight: any
  trigger?: React.ReactNode
}

export function EditFlightModal({ flight, trigger }: EditFlightModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    airline: flight?.airline || "",
    flightNumber: flight?.flightNumber || "",
    aircraft: flight?.aircraft || "",
    economyPrice: flight?.pricing?.economy || "",
    businessPrice: flight?.pricing?.business || "",
    firstPrice: flight?.pricing?.first || "",
    status: flight?.status || "active",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Flight Updated",
      description: `Flight ${formData.flightNumber} has been updated successfully`,
    })

    setOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Flight
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Flight {flight?.flightNumber}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Flight Information</h3>
            <p className="text-sm text-gray-600">
              Route: {flight?.route?.fromFull} → {flight?.route?.toFull}
            </p>
            <p className="text-sm text-gray-600">
              Schedule: {flight?.departure?.date} at {flight?.departure?.time}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="airline">Airline</Label>
              <Input
                id="airline"
                value={formData.airline}
                onChange={(e) => handleInputChange("airline", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                value={formData.flightNumber}
                onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aircraft">Aircraft Type</Label>
            <Select value={formData.aircraft} onValueChange={(value) => handleInputChange("aircraft", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Boeing 737">Boeing 737</SelectItem>
                <SelectItem value="Boeing 787">Boeing 787</SelectItem>
                <SelectItem value="Airbus A320">Airbus A320</SelectItem>
                <SelectItem value="Airbus A350">Airbus A350</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Flight Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Update Pricing (AVAX)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="economyPrice">Economy Price</Label>
                <Input
                  id="economyPrice"
                  type="number"
                  step="0.01"
                  value={formData.economyPrice}
                  onChange={(e) => handleInputChange("economyPrice", e.target.value)}
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
              Update Flight
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
