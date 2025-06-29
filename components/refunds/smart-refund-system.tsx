"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Shield, AlertTriangle, CheckCircle, Calculator, Timer, Plane, Info } from "lucide-react"
import { fetchFromApi } from "@/lib/api"

interface RefundPolicy {
  airline: string
  rules: Array<{
    timeframe: string
    percentage: number
    description: string
  }>
}

interface SmartRefundProps {
  ticket: {
    id: string
    flightNumber: string
    airline: string
    departureTime: string
    price: number
    bookingTime: string
    class: string
  }
  onRefundRequest?: (refundData: any) => void
}

const AIRLINE_POLICIES: Record<string, RefundPolicy> = {
  "SkyLink Airways": {
    airline: "SkyLink Airways",
    rules: [
      { timeframe: "24+ hours", percentage: 100, description: "Full refund available" },
      { timeframe: "2-24 hours", percentage: 75, description: "Partial refund with fee" },
      { timeframe: "0-2 hours", percentage: 25, description: "Minimal refund only" },
    ],
  },
  ChainFly: {
    airline: "ChainFly",
    rules: [
      { timeframe: "48+ hours", percentage: 100, description: "Full refund guaranteed" },
      { timeframe: "4-48 hours", percentage: 80, description: "Good refund rate" },
      { timeframe: "0-4 hours", percentage: 30, description: "Emergency refund only" },
    ],
  },
  AeroChain: {
    airline: "AeroChain",
    rules: [
      { timeframe: "72+ hours", percentage: 95, description: "Near full refund" },
      { timeframe: "6-72 hours", percentage: 70, description: "Standard refund" },
      { timeframe: "0-6 hours", percentage: 20, description: "Last minute penalty" },
    ],
  },
}

export function SmartRefundSystem({ ticket, onRefundRequest }: SmartRefundProps) {
  const [timeUntilFlight, setTimeUntilFlight] = useState<number>(0)
  const [refundEligibility, setRefundEligibility] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [policy, setPolicy] = useState<RefundPolicy | null>(null)
  const [policyLoading, setPolicyLoading] = useState(true)
  const [policyError, setPolicyError] = useState<string | null>(null)

  useEffect(() => {
    const calculateTimeUntilFlight = () => {
      const now = new Date().getTime()
      const flightTime = new Date(ticket.departureTime).getTime()
      const hoursUntilFlight = (flightTime - now) / (1000 * 60 * 60)
      setTimeUntilFlight(Math.max(0, hoursUntilFlight))

      // Calculate refund eligibility
      calculateRefundEligibility(hoursUntilFlight)
    }

    calculateTimeUntilFlight()
    const interval = setInterval(calculateTimeUntilFlight, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [ticket])

  useEffect(() => {
    setPolicyLoading(true)
    setPolicyError(null)
    fetchFromApi(`airlines/${encodeURIComponent(ticket.airline)}/refund-policy`)
      .then((data) => {
        setPolicy(data)
        setPolicyLoading(false)
      })
      .catch((err) => {
        setPolicyError(typeof err === "string" ? err : "Failed to load airline policy")
        setPolicyLoading(false)
      })
  }, [ticket.airline])

  const calculateRefundEligibility = (hoursUntilFlight: number) => {
    setIsCalculating(true)

    setTimeout(() => {
      const usedPolicy = policy || AIRLINE_POLICIES[ticket.airline]
      if (!usedPolicy) {
        setRefundEligibility({ eligible: false, reason: "Airline policy not found" })
        setIsCalculating(false)
        return
      }

      let applicableRule = usedPolicy.rules[usedPolicy.rules.length - 1] // Default to last rule

      for (const rule of usedPolicy.rules) {
        const [min, max] = rule.timeframe.includes("+")
          ? [Number.parseInt(rule.timeframe), Number.POSITIVE_INFINITY]
          : rule.timeframe.split("-").map((t) => Number.parseInt(t))

        if (hoursUntilFlight >= min && (max === Number.POSITIVE_INFINITY || hoursUntilFlight < max)) {
          applicableRule = rule
          break
        }
      }

      const refundAmount = (ticket.price * applicableRule.percentage) / 100
      const processingFee = Math.max(0.01, refundAmount * 0.05) // 5% processing fee, min 0.01 AVAX
      const finalAmount = Math.max(0, refundAmount - processingFee)

      setRefundEligibility({
        eligible: applicableRule.percentage > 0,
        percentage: applicableRule.percentage,
        refundAmount: finalAmount,
        processingFee,
        rule: applicableRule,
        hoursUntilFlight: Math.floor(hoursUntilFlight),
        estimatedProcessingTime: "2-4 hours",
      })
      setIsCalculating(false)
    }, 1500)
  }

  const handleRefundRequest = () => {
    if (refundEligibility?.eligible) {
      onRefundRequest?.({
        ticketId: ticket.id,
        refundAmount: refundEligibility.refundAmount,
        reason: "Passenger requested refund",
        policy: refundEligibility.rule,
      })
    }
  }

  const getStatusColor = () => {
    if (!refundEligibility) return "gray"
    if (refundEligibility.percentage >= 80) return "green"
    if (refundEligibility.percentage >= 50) return "yellow"
    if (refundEligibility.percentage > 0) return "orange"
    return "red"
  }

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.floor(hours * 60)} minutes`
    if (hours < 24) return `${Math.floor(hours)} hours`
    return `${Math.floor(hours / 24)} days`
  }

  return (
    <div className="space-y-6">
      {/* Flight Info Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Plane className="w-5 h-5" />
            <span className="truncate">Smart Refund Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Flight</p>
              <p className="font-semibold truncate">{ticket.flightNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Airline</p>
              <p className="font-semibold truncate">{ticket.airline}</p>
            </div>
            <div>
              <p className="text-gray-600">Departure</p>
              <p className="font-semibold">{new Date(ticket.departureTime).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Original Price</p>
              <p className="font-semibold">{ticket.price} AVAX</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Until Flight */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Time Until Departure</span>
            </div>
            <Badge variant={timeUntilFlight > 24 ? "default" : timeUntilFlight > 2 ? "secondary" : "destructive"}>
              {formatTime(timeUntilFlight)}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Flight Progress</span>
              <span>{Math.max(0, Math.min(100, 100 - (timeUntilFlight / 168) * 100)).toFixed(0)}%</span>
            </div>
            <Progress value={Math.max(0, Math.min(100, 100 - (timeUntilFlight / 168) * 100))} className="h-2" />
            <p className="text-xs text-gray-600">Refund percentage decreases as departure approaches</p>
          </div>
        </CardContent>
      </Card>

      {/* Refund Calculation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Calculator className="w-5 h-5" />
            <span>Refund Calculation</span>
            {isCalculating && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isCalculating ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-600">Calculating refund eligibility...</p>
              </div>
            </div>
          ) : refundEligibility ? (
            <div className="space-y-4">
              {/* Eligibility Status */}
              <Alert className={`border-${getStatusColor()}-200 bg-${getStatusColor()}-50`}>
                <div className="flex items-center space-x-2">
                  {refundEligibility.eligible ? (
                    <CheckCircle className={`w-4 h-4 text-${getStatusColor()}-600`} />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  <AlertDescription className={`text-${getStatusColor()}-800 font-medium`}>
                    {refundEligibility.eligible
                      ? `${refundEligibility.percentage}% refund available`
                      : "No refund available for this timeframe"}
                  </AlertDescription>
                </div>
              </Alert>

              {refundEligibility.eligible && (
                <>
                  {/* Refund Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Refund Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="font-medium">{ticket.price} AVAX</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Refund Rate ({refundEligibility.percentage}%):</span>
                        <span className="font-medium">
                          {((ticket.price * refundEligibility.percentage) / 100).toFixed(4)} AVAX
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Processing Fee:</span>
                        <span>-{refundEligibility.processingFee.toFixed(4)} AVAX</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Final Refund:</span>
                        <span className="text-green-600">{refundEligibility.refundAmount.toFixed(4)} AVAX</span>
                      </div>
                    </div>
                  </div>

                  {/* Policy Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800 mb-1">{ticket.airline} Policy</p>
                        <p className="text-blue-700">{refundEligibility.rule.description}</p>
                        <p className="text-blue-600 mt-2">
                          Estimated processing: {refundEligibility.estimatedProcessingTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleRefundRequest}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    size="lg"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Request Refund ({refundEligibility.refundAmount.toFixed(4)} AVAX)
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600">Unable to calculate refund eligibility</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Airline Policy Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Shield className="w-5 h-5" />
            <span className="truncate">{ticket.airline} Refund Policy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {policyLoading ? (
            <div className="text-center py-4 text-gray-500">Loading airline policy...</div>
          ) : policyError ? (
            <div className="text-center py-4 text-red-500">{policyError}</div>
          ) : (
            <div className="space-y-3">
              {(policy || AIRLINE_POLICIES[ticket.airline])?.rules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{rule.timeframe} before departure</p>
                    <p className="text-xs text-gray-600">{rule.description}</p>
                  </div>
                  <Badge variant={rule.percentage >= 80 ? "default" : rule.percentage >= 50 ? "secondary" : "outline"}>
                    {rule.percentage}%
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
