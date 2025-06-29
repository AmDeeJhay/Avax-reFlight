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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Edit, User, FileText, Ticket, Plane } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchFromApi } from "@/lib/api"

interface EditTicketModalProps {
  ticket: any
  trigger?: React.ReactNode
}

export function EditTicketModal({ ticket, trigger }: EditTicketModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    status: ticket?.status || "active",
    seat: ticket?.seat || "",
    class: ticket?.class || "economy",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchFromApi(`admin/tickets/${ticket.id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
      toast({
        title: "Ticket Updated",
        description: `Ticket ${ticket.id} has been updated successfully`,
      })
      setOpen(false)
    } catch {
      toast({
        title: "Update Failed",
        description: "Failed to update ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Ticket
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Ticket {ticket?.id}
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
              <h3 className="font-semibold mb-2">Ticket Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-gray-600">
                  Route: {ticket?.route?.fromFull} → {ticket?.route?.toFull}
                </p>
                <p className="text-gray-600">
                  Flight: {ticket?.airline} {ticket?.flightNumber}
                </p>
                <p className="text-gray-600">Date: {ticket?.date}</p>
                <p className="text-gray-600">User: {ticket?.user}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Ticket Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="reselling">Reselling</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, class: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seat">Seat Assignment</Label>
              <Input
                id="seat"
                value={formData.seat}
                onChange={(e) => setFormData((prev) => ({ ...prev, seat: e.target.value }))}
                placeholder="e.g., 12A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Admin Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes about this ticket..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
                Update Ticket
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface ContactUserModalProps {
  ticket: any
  trigger?: React.ReactNode
}

export function ContactUserModal({ ticket, trigger }: ContactUserModalProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchFromApi(`admin/users/${ticket.user}/contact`, {
        method: "POST",
        body: JSON.stringify({ subject, message, ticketId: ticket.id }),
        headers: { "Content-Type": "application/json" },
      })
      toast({
        title: "Message Sent",
        description: `Message sent to user ${ticket.user}`,
      })
      setOpen(false)
      setMessage("")
      setSubject("")
    } catch {
      toast({
        title: "Send Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Contact User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact User
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
            <div className="bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-6 w-32 mb-2" />
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full mb-2" />
              ))}
            </div>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">User Information</h3>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">User Address: {ticket?.user}</p>
                <p className="text-gray-600">Ticket ID: {ticket?.id}</p>
                <p className="text-gray-600">
                  Flight: {ticket?.airline} {ticket?.flightNumber}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter message subject..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message to the user..."
                rows={6}
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This message will be sent to the user's registered email address and will also
                appear in their notification center.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
                Send Message
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

interface TicketDetailsModalProps {
  ticket: any
  trigger?: React.ReactNode
}

export function TicketDetailsModal({ ticket, trigger }: TicketDetailsModalProps) {
  const [open, setOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "reselling":
        return <Badge className="bg-blue-100 text-blue-800">Reselling</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case "used":
        return <Badge className="bg-gray-100 text-gray-800">Used</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="bg-gradient-to-r from-red-500 to-blue-600">
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Ticket Details - {ticket?.id}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="flight">Flight Info</TabsTrigger>
            <TabsTrigger value="user">User Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Ticket Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket ID:</span>
                    <span className="font-medium">{ticket?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NFT ID:</span>
                    <span className="font-medium">{ticket?.nftId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(ticket?.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">{ticket?.price} AVAX</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booked:</span>
                    <span className="font-medium">{new Date(ticket?.bookingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium">{ticket?.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seat:</span>
                    <span className="font-medium">{ticket?.seat}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flight" className="space-y-4">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{ticket?.airline}</h3>
                  <p className="text-gray-600">
                    {ticket?.flightNumber} • {ticket?.aircraft}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold">{ticket?.time}</p>
                  <p className="text-gray-600">
                    {ticket?.route?.fromFull} ({ticket?.route?.from})
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-px bg-gray-300 flex-1" />
                    <Plane className="w-4 h-4 text-gray-400 mx-2" />
                    <div className="h-px bg-gray-300 flex-1" />
                  </div>
                  <p className="text-sm font-medium">Direct Flight</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">Arrival</p>
                  <p className="text-gray-600">
                    {ticket?.route?.toFull} ({ticket?.route?.to})
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">User Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Address:</strong> {ticket?.user}
                </p>
                <p>
                  <strong>Total Bookings:</strong> 12
                </p>
                <p>
                  <strong>Member Since:</strong> January 2024
                </p>
                <p>
                  <strong>Tier:</strong> Silver
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              <div className="bg-white border-l-4 border-l-green-500 p-3 rounded">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">Ticket Booked</span>
                  <span className="text-xs text-gray-500">{new Date(ticket?.bookingDate).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">Ticket successfully booked and NFT minted</p>
              </div>
              <div className="bg-white border-l-4 border-l-blue-500 p-3 rounded">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">Payment Confirmed</span>
                  <span className="text-xs text-gray-500">{new Date(ticket?.bookingDate).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600">Payment of {ticket?.price} AVAX confirmed on blockchain</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface GenerateReportModalProps {
  trigger?: React.ReactNode
}

export function GenerateReportModal({ trigger }: GenerateReportModalProps) {
  const [open, setOpen] = useState(false)
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [format, setFormat] = useState("pdf")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetchFromApi("/admin/reports/generate", {
        method: "POST",
        body: JSON.stringify({ reportType, dateRange, format }),
        headers: { "Content-Type": "application/json" },
      })
      toast({
        title: "Report Generated",
        description: "Your report is being generated and will be emailed to you shortly.",
      })
      setOpen(false)
    } catch {
      toast({
        title: "Generation Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Ticket Report
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-6 w-32 mb-2" />
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full mb-2" />
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Skeleton className="h-6 w-32 mb-2" />
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full mb-2" />
                ))}
              </div>
            </div>
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-tickets">All Tickets</SelectItem>
                  <SelectItem value="active-tickets">Active Tickets</SelectItem>
                  <SelectItem value="cancelled-tickets">Cancelled Tickets</SelectItem>
                  <SelectItem value="revenue-report">Revenue Report</SelectItem>
                  <SelectItem value="user-activity">User Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The report will be generated and sent to your admin email address. Large reports
                may take a few minutes to process.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
                Generate Report
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
