"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Search, MoreVertical, Edit, Ban, Shield, User, Calendar, Ticket, DollarSign, Filter } from "lucide-react"
import { EditUserModal, VerifyKYCModal, SuspendUserModal } from "@/components/admin/modals/user-management-modals"
import { UserExportModal } from "@/components/admin/modals/user-export-modal"
import { fetchFromApi } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    setLoading(true)
    fetchFromApi("admin/users")
      .then((res) => {
        const apiUsers = res.data?.users || []
        setUsers(apiUsers)
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to fetch users")
        setLoading(false)
      })
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 text-xs">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getKycBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 text-xs">Rejected</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getTierBadge = (tier: string) => {
    const colors = {
      Bronze: "bg-amber-100 text-amber-800",
      Silver: "bg-gray-100 text-gray-800",
      Gold: "bg-yellow-100 text-yellow-800",
      Platinum: "bg-purple-100 text-purple-800",
    }
    return <Badge className={`${colors[tier as keyof typeof colors]} text-xs`}>{tier}</Badge>
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewProfile = (user: any) => {
    // API call would go here
    fetch(`/api/admin/users/${user.id}/profile`)
      .then((response) => response.json())
      .then((data) => {
        // Navigate to user profile page or open modal
        window.open(`/admin/users/${user.id}/profile`, "_blank")
      })
      .catch(() => {
        // Fallback - show user details in alert for now
        alert(
          `User Profile:\nAddress: ${user.address}\nTier: ${user.tier}\nTotal Bookings: ${user.totalBookings}\nTotal Spent: ${user.totalSpent} AVAX`,
        )
      })
  }

  if (loading) {
    return (
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
                          <Skeleton className="h-5 w-32" />
                          <div className="flex items-center space-x-2 ml-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-64 mb-3" />
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
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor and manage platform users</p>
          </div>
          <UserExportModal />
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
                  placeholder="Search by address or user ID..."
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
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-gray-900">{users.length}</p>
            <p className="text-xs text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</p>
            <p className="text-xs text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-yellow-600">{users.filter((u) => u.kycStatus === "pending").length}</p>
            <p className="text-xs text-gray-600">KYC Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-blue-600">
              {users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-600">Total Volume (AVAX)</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold truncate">{formatAddress(user.address)}</h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {getStatusBadge(user.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <EditUserModal
                                user={user}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                }
                              />
                              <VerifyKYCModal
                                user={user}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Shield className="w-4 h-4 mr-2" />
                                    Verify KYC
                                  </DropdownMenuItem>
                                }
                              />
                              <SuspendUserModal
                                user={user}
                                trigger={
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend User
                                  </DropdownMenuItem>
                                }
                              />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 truncate">
                        User ID: {user.id} • Tier: {user.tier}
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">
                            Joined {new Date(user.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Ticket className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs">{user.totalBookings} bookings</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs">{user.totalSpent} AVAX</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-xs truncate">
                            Active {new Date(user.lastActivity).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="text-gray-600">Status</p>
                            <div className="mt-1">{getStatusBadge(user.status)}</div>
                          </div>
                          <div>
                            <p className="text-gray-600">KYC Status</p>
                            <div className="mt-1">{getKycBadge(user.kycStatus)}</div>
                          </div>
                          <div>
                            <p className="text-gray-600">Tier</p>
                            <div className="mt-1">{getTierBadge(user.tier)}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-red-500 to-blue-600 text-xs"
                        onClick={() => handleViewProfile(user)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchTerm ? "Try adjusting your search terms." : "No users match the selected filters."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
