"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { DollarSign } from "lucide-react"
import { makeMarketplaceOffer } from "@/lib/api"

interface MakeOfferModalProps {
  listing: any
  trigger?: React.ReactNode
}

export function MakeOfferModal({ listing, trigger }: MakeOfferModalProps) {
  const [open, setOpen] = useState(false)
  const [offerAmount, setOfferAmount] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!offerAmount || isNaN(Number(offerAmount))) {
      toast({
        title: "Invalid Offer",
        description: "Please enter a valid offer amount",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await makeMarketplaceOffer({
        listingId: listing.id,
        offerAmount: Number(offerAmount),
        message,
      })
      toast({
        title: "Offer Submitted",
        description: `Your offer of ${offerAmount} AVAX has been sent to the seller`,
      })
      setOpen(false)
      setOfferAmount("")
      setMessage("")
    } catch (err: any) {
      toast({
        title: "Offer Failed",
        description: err?.message || "Failed to submit offer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const suggestedOffer = (listing.listingPrice * 0.9).toFixed(4)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <DollarSign className="w-4 h-4 mr-2" />
            Make Offer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Make an Offer
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Ticket Details</h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Route:</strong> {listing.route.fromFull} → {listing.route.toFull}
              </p>
              <p>
                <strong>Flight:</strong> {listing.airline} {listing.flightNumber}
              </p>
              <p>
                <strong>Date:</strong> {new Date(listing.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Class:</strong> {listing.class} • Seat {listing.seat}
              </p>
              <p>
                <strong>Current Price:</strong> {listing.listingPrice} AVAX
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="offerAmount">Your Offer (AVAX)</Label>
            <Input
              id="offerAmount"
              type="number"
              step="0.0001"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder="Enter your offer amount"
              required
            />
            <p className="text-sm text-gray-600">Suggested offer: {suggestedOffer} AVAX (10% below asking price)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Seller (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message to accompany your offer..."
              rows={3}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>How it works:</strong> Your offer will be sent to the seller. If accepted, the transaction will be
              processed automatically through smart contracts.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600" disabled={loading}>
              {loading ? "Submitting..." : "Submit Offer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
