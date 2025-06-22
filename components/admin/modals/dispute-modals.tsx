"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, CheckCircle, Send } from "lucide-react"

interface DisputeDetailsModalProps {
  dispute: any
  trigger?: React.ReactNode
}

export function DisputeDetailsModal({ dispute, trigger }: DisputeDetailsModalProps) {
  const [open, setOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-100 text-red-800">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Dispute Details - {dispute?.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Dispute Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dispute ID:</span>
                  <span className="font-medium">{dispute?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket ID:</span>
                  <span className="font-medium">{dispute?.ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{dispute?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  {getStatusBadge(dispute?.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  {getPriorityBadge(dispute?.priority)}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">User & Timeline</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">User:</span>
                  <span className="font-medium">{dispute?.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{new Date(dispute?.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="font-medium">{new Date(dispute?.lastUpdate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned To:</span>
                  <span className="font-medium">{dispute?.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Subject</h3>
            <p className="text-gray-900">{dispute?.subject}</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{dispute?.description}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Communication History</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">User ({dispute?.user})</span>
                  <span className="text-xs text-gray-500">{new Date(dispute?.createdDate).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700">{dispute?.description}</p>
              </div>
              <div className="text-center text-sm text-gray-500">No admin responses yet</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface RespondToDisputeModalProps {
  dispute: any
  trigger?: React.ReactNode
}

export function RespondToDisputeModal({ dispute, trigger }: RespondToDisputeModalProps) {
  const [open, setOpen] = useState(false)
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState(dispute?.status || "open")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Response Sent",
      description: `Your response has been sent to the user. Dispute status updated to ${status}.`,
    })

    setOpen(false)
    setResponse("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-gradient-to-r from-red-500 to-blue-600">
            <Send className="w-4 h-4 mr-2" />
            Respond
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Respond to Dispute
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Dispute Summary</h3>
            <p className="text-sm text-gray-600">ID: {dispute?.id}</p>
            <p className="text-sm text-gray-600">Subject: {dispute?.subject}</p>
            <p className="text-sm text-gray-600">User: {dispute?.user}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="response">Your Response</Label>
            <Textarea
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response to the user..."
              rows={6}
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your response will be sent to the user via email and will be visible in their
              dispute history.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
              Send Response
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface ResolveDisputeModalProps {
  dispute: any
  trigger?: React.ReactNode
}

export function ResolveDisputeModal({ dispute, trigger }: ResolveDisputeModalProps) {
  const [open, setOpen] = useState(false)
  const [resolution, setResolution] = useState("")
  const [refundAmount, setRefundAmount] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Dispute Resolved",
      description: `Dispute ${dispute?.id} has been marked as resolved. User will be notified.`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Resolved
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Resolve Dispute
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Dispute Information</h3>
            <p className="text-sm text-gray-600">ID: {dispute?.id}</p>
            <p className="text-sm text-gray-600">Type: {dispute?.type}</p>
            <p className="text-sm text-gray-600">Subject: {dispute?.subject}</p>
          </div>

          {dispute?.type === "refund" && (
            <div className="space-y-2">
              <Label htmlFor="refundAmount">Refund Amount (AVAX)</Label>
              <Input
                id="refundAmount"
                type="number"
                step="0.01"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="Enter refund amount"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution Summary</Label>
            <Textarea
              id="resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Describe how the dispute was resolved..."
              rows={4}
              required
            />
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Resolution Actions:</strong> The user will be notified of the resolution via email.
              {dispute?.type === "refund" && " Any refund will be processed automatically to their wallet."}
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Resolve Dispute
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
