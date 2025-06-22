"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmartRefundSystem } from "@/components/refunds/smart-refund-system"
import { useToast } from "@/hooks/use-toast"
import { CollapsibleFAQ } from "@/components/ui/collapsible-faq"
import { DollarSign, Clock, Calendar, Plane, HelpCircle } from "lucide-react"

const mockRefunds = [
  {
    id: "REF-001",
    ticketId: "TKT-003",
    status: "approved",
    route: { from: "MIA", to: "NYC", fromFull: "Miami", toFull: "New York" },
    flightDate: "2024-11-25",
    airline: "AeroChain",
    flightNumber: "AC 9012",
    originalPrice: 1.12,
    refundAmount: 0.95,
    refundPercentage: 85,
    requestDate: "2024-11-20",
    processedDate: "2024-11-21",
    reason: "Flight cancelled by airline",
  },
  {
    id: "REF-002",
    ticketId: "TKT-004",
    status: "pending",
    route: { from: "LAX", to: "SEA", fromFull: "Los Angeles", toFull: "Seattle" },
    flightDate: "2024-12-10",
    airline: "SkyLink Airways",
    flightNumber: "SL 2468",
    originalPrice: 0.65,
    refundAmount: 0.52,
    refundPercentage: 80,
    requestDate: "2024-11-22",
    estimatedProcessing: "2024-11-24",
    reason: "Personal emergency",
  },
]

const mockActiveTicket = {
  id: "TKT-001",
  flightNumber: "SL 1234",
  airline: "SkyLink Airways",
  departureTime: "2024-12-15T14:30:00Z",
  price: 0.89,
  bookingTime: "2024-11-20T10:30:00Z",
  class: "Business",
}

export default function RefundCenter() {
  const [refunds] = useState(mockRefunds)
  const [selectedTicket, setSelectedTicket] = useState(mockActiveTicket)
  const [showSmartRefund, setShowSmartRefund] = useState(false)
  const { toast } = useToast()

  const handleClaimRefund = (refund: any) => {
    toast({
      title: "Claiming Refund",
      description: `Processing refund of ${refund.refundAmount} AVAX`,
    })

    // API call would go here
    fetch(`/api/refunds/${refund.id}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setTimeout(() => {
          toast({
            title: "Refund Claimed!",
            description: `${refund.refundAmount} AVAX has been transferred to your wallet`,
          })
        }, 2000)
      })
      .catch(() => {
        toast({
          title: "Claim Failed",
          description: "Failed to claim refund. Please try again.",
          variant: "destructive",
        })
      })
  }

  const handleTrackProgress = (refund: any) => {
    toast({
      title: "Tracking Progress",
      description: "Opening refund tracking details",
    })

    // API call would go here
    fetch(`/api/refunds/${refund.id}/track`)
      .then((response) => response.json())
      .then((data) => {
        // Show tracking information
        alert(`Refund Status: ${refund.status}\nEstimated Processing: ${refund.estimatedProcessing}`)
      })
      .catch(() => {
        toast({
          title: "Tracking Failed",
          description: "Failed to load tracking information.",
          variant: "destructive",
        })
      })
  }

  const handleRefundRequest = (refundData: any) => {
    toast({
      title: "Refund Request Submitted",
      description: `Your refund request for ${refundData.refundAmount.toFixed(4)} AVAX has been submitted.`,
    })
    setShowSmartRefund(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>
      case "pending":
        return <Badge variant="warning">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Refund Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {refunds.map((refund) => (
              <div key={refund.id} className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4" />
                    <span>
                      {refund.route.fromFull} to {refund.route.toFull}
                    </span>
                  </div>
                  <Badge>{refund.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{refund.flightDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{refund.requestDate}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{refund.originalPrice.toFixed(4)} AVAX</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>{refund.refundAmount.toFixed(4)} AVAX</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="h-4 w-4" />
                    <span>{refund.reason}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => handleClaimRefund(refund)}>Claim Refund</Button>
                    <Button onClick={() => handleTrackProgress(refund)}>Track Progress</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {showSmartRefund && <SmartRefundSystem onRefundRequest={handleRefundRequest} />}
      <CollapsibleFAQ />
    </div>
  )
}
