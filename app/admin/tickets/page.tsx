"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Edit, Trash2, Ticket, Calendar, Clock, MapPin, Filter, User } from "lucide-react"
import {
  EditTicketModal,
  ContactUserModal,
  TicketDetailsModal,
  GenerateReportModal,
} from "@/components/admin/modals/ticket-management-modals"

const mockTickets = [
  {
    id: "TKT-001",
    user: "0x1234...5678",
    status: "active",
    route: { from: "NYC", to: "LAX", fromFull: "New York", toFull: "Los Angeles" },
    date: "2024-12-15",
    time: "14:30",
    class: "Business",
    seat: "4A",
    airline: "SkyLink Airways",
    flightNumber: "SL 1234",
    price: 0.89,
    nftId: "NFT-12345",
    bookingDate: "2024-11-20",
  },
  {
    id: "TKT-002",
    user: "0x5678...9012",
    status: "reselling",
    route: { from: "LAX", to: "MIA", fromFull: "Los Angeles", toFull: "Miami" },
    date: "2024-12-20",
    time: "09:15",
    class: "Economy",
    seat: "12B",
    airline: "ChainFly",
    flightNumber: "CF 5678",
    price: 0.42,
    nftId: "NFT-12346",
    bookingDate: "2024-11-18",
  },
  {
    id: "TKT-003",
    user: "0x9012...3456",
    status: "cancelled",
    route: { from: "MIA", to: "CHI", fromFull: "Miami", toFull: "Chicago" },
    date: "2024-11-25",
    time: "18:45",
    class: "First",
    seat: "1A",
    airline: "AeroChain",
    flightNumber: "AC 9012",
    price: 1.12,
    nftId: "NFT-12347",
    bookingDate: "2024-11-10",
  },
]

export default function TicketOversight() {
  const [tickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
      case "reselling":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Reselling</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 text-xs">Cancelled</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.route.fromFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.route.toFull.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Oversight</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor and manage all platform tickets</p>
          </div>
          <GenerateReportModal />
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by ticket ID, user, or route..."
                  className="pl-10 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="reselling">Reselling</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-gray-900">{tickets.length}</p>
            <p className="text-xs text-gray-600">Total Tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-green-600">{tickets.filter((t) => t.status === "active").length}</p>
            <p className="text-xs text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-blue-600">{tickets.filter((t) => t.status === "reselling").length}</p>
            <p className="text-xs text-gray-600">Reselling</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-red-600">{tickets.filter((t) => t.status === "cancelled").length}</p>
            <p className="text-xs text-gray-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ticket Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold truncate">
                          {ticket.route.fromFull} → {ticket.route.toFull}
                        </h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {getStatusBadge(ticket.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <EditTicketModal
                                ticket={ticket}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Ticket
                                  </DropdownMenuItem>
                                }
                              />
                              <ContactUserModal
                                ticket={ticket}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <User className="w-4 h-4 mr-2" />
                                    Contact User
                                  </DropdownMenuItem>
                                }
                              />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel Ticket
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 truncate">
                        {ticket.airline} • {ticket.flightNumber} • NFT #{ticket.nftId.split("-")[1]}
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">{new Date(ticket.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs">{ticket.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">
                            {ticket.class} • {ticket.seat}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">{ticket.user}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-gray-600">Ticket ID</p>
                            <p className="font-medium truncate">{ticket.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Price</p>
                            <p className="font-medium">{ticket.price} AVAX</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Booked</p>
                            <p className="font-medium">{new Date(ticket.bookingDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-4 flex-shrink-0">
                      <TicketDetailsModal ticket={ticket} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search terms." : "No tickets match the selected filters."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
