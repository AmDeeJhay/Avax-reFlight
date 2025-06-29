"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import { createDisputeTicket } from "@/lib/admin-disputes"
import { Skeleton } from "@/components/ui/skeleton"

interface CreateTicketModalProps {
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function CreateTicketModal({ trigger, onSuccess }: CreateTicketModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    userAddress: "",
    ticketId: "",
    type: "",
    priority: "medium",
    subject: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createDisputeTicket({
        user: formData.userAddress,
        ticketId: formData.ticketId,
        type: formData.type,
        priority: formData.priority,
        subject: formData.subject,
        description: formData.description,
      })
      toast({
        title: "Ticket Created",
        description: "Support ticket has been created successfully.",
      })
      setOpen(false)
      setFormData({
        userAddress: "",
        ticketId: "",
        type: "",
        priority: "medium",
        subject: "",
        description: "",
      })
      if (onSuccess) onSuccess()
    } catch {
      toast({
        title: "Creation Failed",
        description: "Failed to create ticket. Please try again.",
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
          <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Support Ticket
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-12">
            <div className="flex flex-col gap-6 items-center">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64 mb-4" />
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-10 w-96 mb-2" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userAddress">User Address</Label>
                <Input
                  id="userAddress"
                  value={formData.userAddress}
                  onChange={(e) => handleInputChange("userAddress", e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketId">Related Ticket ID (Optional)</Label>
                <Input
                  id="ticketId"
                  value={formData.ticketId}
                  onChange={(e) => handleInputChange("ticketId", e.target.value)}
                  placeholder="TKT-001"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Ticket Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refund">Refund Issue</SelectItem>
                    <SelectItem value="booking">Booking Problem</SelectItem>
                    <SelectItem value="marketplace">Marketplace Issue</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed description of the issue..."
                rows={5}
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The user will be notified about this ticket via email and it will appear in their
                support history.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600" disabled={loading}>
                {loading ? "Creating..." : "Create Ticket"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
