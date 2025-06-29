"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, MoreVertical, MessageSquare, Clock, CheckCircle, X, User, Calendar, Filter } from "lucide-react"
import {
  DisputeDetailsModal,
  RespondToDisputeModal,
  ResolveDisputeModal,
} from "@/components/admin/modals/dispute-modals"
import { CreateTicketModal } from "@/components/admin/modals/create-ticket-modal"
import { getAllDisputes } from "@/lib/admin-disputes"
import { Skeleton } from "@/components/ui/skeleton"

export default function DisputeCenter() {
  const [disputes, setDisputes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const isMounted = useRef(true)

  const fetchDisputes = async () => {
    setLoading(true)
    try {
      const data = await getAllDisputes()
      setDisputes(data.disputes || data)
      setError(null)
    } catch {
      setError("Failed to load disputes")
    } finally {
      if (isMounted.current) setLoading(false)
    }
  }

  useEffect(() => {
    isMounted.current = true
    fetchDisputes()
    return () => { isMounted.current = false }
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-red-100 text-red-800 text-xs">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 text-xs">Resolved</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 text-xs">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 text-xs">Low</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {priority}
          </Badge>
        )
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "refund":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "booking":
        return <MessageSquare className="w-4 h-4 text-green-500" />
      case "marketplace":
        return <User className="w-4 h-4 text-purple-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-36 rounded" />
        </div>
      </div>
      {/* Search and Filters Skeleton */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Dispute Table Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-full mb-3" />
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        {[...Array(4)].map((_, j) => (
                          <Skeleton key={j} className="h-4 w-32" />
                        ))}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          {[...Array(3)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-20" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispute Center</h1>
            <p className="text-sm text-gray-600 mt-1">Manage user disputes and support tickets</p>
          </div>
          <CreateTicketModal onSuccess={fetchDisputes} />
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
                  placeholder="Search by dispute ID, subject, or user..."
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
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
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

      {/* Dispute Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-gray-900">{disputes.length}</p>
            <p className="text-xs text-gray-600">Total Disputes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-red-600">{disputes.filter((d) => d.status === "open").length}</p>
            <p className="text-xs text-gray-600">Open</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-yellow-600">
              {disputes.filter((d) => d.status === "in_progress").length}
            </p>
            <p className="text-xs text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-green-600">{disputes.filter((d) => d.status === "resolved").length}</p>
            <p className="text-xs text-gray-600">Resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dispute Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDisputes.map((dispute) => (
              <Card key={dispute.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(dispute.type)}
                          <h3 className="text-base font-semibold truncate">{dispute.subject}</h3>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          {getStatusBadge(dispute.status)}
                          {getPriorityBadge(dispute.priority)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DisputeDetailsModal
                                dispute={dispute}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                }
                              />
                              <ResolveDisputeModal
                                dispute={dispute}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Resolved
                                  </DropdownMenuItem>
                                }
                              />
                              <DropdownMenuItem className="text-red-600">
                                <X className="w-4 h-4 mr-2" />
                                Close Dispute
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dispute.description}</p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">
                            Created {new Date(dispute.createdDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">
                            Updated {new Date(dispute.lastUpdate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">{dispute.user}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">{dispute.assignedTo}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-gray-600">Dispute ID</p>
                            <p className="font-medium truncate">{dispute.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Ticket ID</p>
                            <p className="font-medium truncate">{dispute.ticketId}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Type</p>
                            <p className="font-medium capitalize">{dispute.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-4 flex-shrink-0">
                      <RespondToDisputeModal dispute={dispute} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDisputes.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search terms." : "No disputes match the selected filters."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
