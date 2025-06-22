"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Calendar, Clock, DollarSign, Plane, CheckCircle, AlertCircle } from "lucide-react"

interface RefundDetailsModalProps {
  refund: any
  trigger?: React.ReactNode
}

export function RefundDetailsModal({ refund, trigger }: RefundDetailsModalProps) {
  const [open, setOpen] = useState(false)

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
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "approved":
        return 100
      case "pending":
        return 50
      case "rejected":
        return 0
      default:
        return 0
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Refund Details - {refund?.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Overview */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(refund?.status)}
                <div>
                  <h3 className="font-semibold text-lg">Refund Status</h3>
                  <p className="text-gray-600">Current status of your refund request</p>
                </div>
              </div>
              {getStatusBadge(refund?.status)}
            </div>

            <Progress value={getProgressValue(refund?.status)} className="h-2 mb-2" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Submitted</span>
              <span>Processing</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Flight Information */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Plane className="w-5 h-5 mr-2" />
              Flight Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="font-medium">
                    {refund?.route?.fromFull} → {refund?.route?.toFull}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Flight</p>
                  <p className="font-medium">
                    {refund?.airline} {refund?.flightNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Flight Date</p>
                  <p className="font-medium">{new Date(refund?.flightDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Ticket ID</p>
                  <p className="font-medium">{refund?.ticketId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Original Price</p>
                  <p className="font-medium">{refund?.originalPrice} AVAX</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Refund Amount</p>
                  <p className="font-medium text-green-600">{refund?.refundAmount} AVAX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Request Date</span>
                  <span className="text-sm font-medium">{new Date(refund?.requestDate).toLocaleDateString()}</span>
                </div>
                {refund?.processedDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Processed Date</span>
                    <span className="text-sm font-medium">{new Date(refund?.processedDate).toLocaleDateString()}</span>
                  </div>
                )}
                {refund?.estimatedProcessing && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Processing</span>
                    <span className="text-sm font-medium">
                      {new Date(refund?.estimatedProcessing).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Financial Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Original Payment</span>
                  <span className="text-sm font-medium">{refund?.originalPrice} AVAX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Refund Percentage</span>
                  <span className="text-sm font-medium">{refund?.refundPercentage}%</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-semibold">Refund Amount</span>
                  <span className="text-sm font-semibold text-green-600">{refund?.refundAmount} AVAX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Refund Reason</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded">{refund?.reason}</p>
          </div>

          {/* Smart Contract Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-blue-800">Smart Contract Processing</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>• Refund processed automatically by smart contract</p>
              <p>• Chainlink oracles verify flight status and refund eligibility</p>
              <p>• Funds will be transferred directly to your connected wallet</p>
              {refund?.status === "approved" && (
                <p className="font-medium">• Transaction hash will be provided once processed</p>
              )}
            </div>
          </div>

          {/* Actions */}
          {refund?.status === "approved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Refund Approved!</h3>
                  <p className="text-sm text-green-700">Your refund is ready to be claimed.</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Claim {refund?.refundAmount} AVAX</Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
