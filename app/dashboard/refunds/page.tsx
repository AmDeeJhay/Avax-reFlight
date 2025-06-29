"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SmartRefundSystem } from "@/components/refunds/smart-refund-system"
import { useToast } from "@/hooks/use-toast"
import { CollapsibleFAQ } from "@/components/ui/collapsible-faq"
import { DollarSign, Clock, CheckCircle, AlertCircle, X, Calendar, Plane, ArrowRight, HelpCircle } from "lucide-react"
import { getUserRefunds } from "@/lib/user-dashboard-api"

export default function RefundCenter() {
  const [refunds, setRefunds] = useState<any[]>([])
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showSmartRefund, setShowSmartRefund] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    getUserRefunds()
      .then((data) => {
        setRefunds(data.refunds || [])
        setSelectedTicket(data.activeTicket || null)
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to load refunds")
        setLoading(false)
      })
  }, [])

  const handleClaimRefund = (refund: any) => {
    toast({
      title: "Claiming Refund",
      description: `Processing refund of ${refund.refundAmount} AVAX`,
    })

    setTimeout(() => {
      toast({
        title: "Refund Claimed!",
        description: `${refund.refundAmount} AVAX has been transferred to your wallet`,
      })
    }, 2000)
  }

  const handleTrackProgress = (refund: any) => {
    toast({
      title: "Tracking Progress",
      description: "Opening refund tracking details",
    })
    // Navigate to detailed tracking page
  }

  const handleViewDetails = (refund: any) => {
    // Create detailed view modal or navigate to details page
    const details = `
Refund Details for ${refund.id}:
- Flight: ${refund.route.fromFull} → ${refund.route.toFull}
- Airline: ${refund.airline} ${refund.flightNumber}
- Original Price: ${refund.originalPrice} AVAX
- Refund Amount: ${refund.refundAmount} AVAX
- Status: ${refund.status}
- Reason: ${refund.reason}
- Request Date: ${new Date(refund.requestDate).toLocaleDateString()}
${refund.processedDate ? `- Processed: ${new Date(refund.processedDate).toLocaleDateString()}` : ""}
  `

    alert(details) // Replace with proper modal

    toast({
      title: "Refund Details",
      description: "Viewing detailed refund information",
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
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "rejected":
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const totalRefunded = refunds.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.refundAmount, 0)
  const pendingRefunds = refunds.filter((r) => r.status === "pending").length

  if (showSmartRefund) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Refund Calculator</h1>
            <p className="text-gray-600 mt-2">AI-powered refund calculation based on airline policies</p>
          </div>
          <Button variant="outline" onClick={() => setShowSmartRefund(false)}>
            ← Back to Refund Center
          </Button>
        </div>
        <SmartRefundSystem ticket={selectedTicket} onRefundRequest={handleRefundRequest} />
      </div>
    )
  }

  if (loading) return <div className="p-8 text-center">Loading refunds...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Refund Center</h1>
        <p className="text-gray-600 mt-2">Track and manage your flight refunds powered by smart contracts</p>
      </div>

      {/* Quick Refund Action */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need a Refund?</h3>
              <p className="text-gray-600 mb-4">
                Use our smart refund calculator to check eligibility and get instant quotes
              </p>
              <Button
                onClick={() => setShowSmartRefund(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Calculate Smart Refund
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refund Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refunded</p>
                <p className="text-3xl font-bold text-gray-900">{totalRefunded.toFixed(2)} AVAX</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">All refunds processed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Refunds</p>
                <p className="text-3xl font-bold text-gray-900">{pendingRefunds}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Avg. processing: 2-3 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">85%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refund History */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Refund History</h2>

        {refunds.map((refund) => (
          <Card key={refund.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(refund.status)}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {refund.route.fromFull} → {refund.route.toFull}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {refund.airline} • {refund.flightNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(refund.status)}</div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Flight: {new Date(refund.flightDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Requested: {new Date(refund.requestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Original: {refund.originalPrice} AVAX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Ticket: {refund.ticketId}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Reason for Refund:</p>
                <p className="text-sm text-gray-600">{refund.reason}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  {refund.status === "approved" && (
                    <div>
                      <p className="text-sm text-gray-600">Refund Amount</p>
                      <p className="font-semibold text-green-600 text-lg">{refund.refundAmount} AVAX</p>
                      <p className="text-xs text-gray-500">({refund.refundPercentage}% of original price)</p>
                    </div>
                  )}
                  {refund.status === "pending" && (
                    <div>
                      <p className="text-sm text-gray-600">Expected Refund</p>
                      <p className="font-semibold text-yellow-600 text-lg">{refund.refundAmount} AVAX</p>
                      <p className="text-xs text-gray-500">Est. processing: {refund.estimatedProcessing}</p>
                    </div>
                  )}

                  {refund.processedDate && (
                    <div>
                      <p className="text-sm text-gray-600">Processed Date</p>
                      <p className="font-medium">{new Date(refund.processedDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {refund.status === "approved" && (
                    <Button
                      className="bg-gradient-to-r from-red-500 to-blue-600"
                      onClick={() => handleClaimRefund(refund)}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Claim Refund
                    </Button>
                  )}
                  {refund.status === "pending" && (
                    <Button variant="outline" onClick={() => handleTrackProgress(refund)}>
                      <Clock className="w-4 h-4 mr-2" />
                      Track Progress
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(refund)}>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Refund FAQs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          <CollapsibleFAQ
            question="How long do refunds take to process?"
            answer="Refunds are processed automatically by smart contracts within 2-3 days. Chainlink Automation verifies flight status and refund eligibility."
          />
          <CollapsibleFAQ
            question="What determines my refund amount?"
            answer="Refund amounts depend on airline policies, time before departure, and flight status. Our smart contracts automatically calculate the correct amount based on these factors."
          />
          <CollapsibleFAQ
            question="Why was my refund rejected?"
            answer="Refunds may be rejected if requested outside the allowed timeframe, for non-refundable tickets, or if the flight has already departed."
          />
          <CollapsibleFAQ
            question="Can I appeal a rejected refund?"
            answer="Yes, you can contact our support team to review rejected refunds, especially in cases of flight cancellations or significant delays."
          />
        </CardContent>
      </Card>
    </div>
  )
}
