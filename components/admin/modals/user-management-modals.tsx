"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Edit, Shield, Ban } from "lucide-react"

interface EditUserModalProps {
  user: any
  trigger?: React.ReactNode
}

export function EditUserModal({ user, trigger }: EditUserModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    tier: user?.tier || "Bronze",
    status: user?.status || "active",
    notes: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "User Updated",
      description: `User ${user.address} has been updated successfully`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit User Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p className="text-sm text-gray-600">Address: {user?.address}</p>
            <p className="text-sm text-gray-600">User ID: {user?.id}</p>
            <p className="text-sm text-gray-600">Joined: {new Date(user?.joinDate).toLocaleDateString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tier">User Tier</Label>
              <Select
                value={formData.tier}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, tier: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Account Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Admin Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any notes about this user..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
              Update User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface VerifyKYCModalProps {
  user: any
  trigger?: React.ReactNode
}

export function VerifyKYCModal({ user, trigger }: VerifyKYCModalProps) {
  const [open, setOpen] = useState(false)
  const [decision, setDecision] = useState("")
  const [reason, setReason] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "KYC Status Updated",
      description: `User KYC has been ${decision}. User will be notified via email.`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Verify KYC
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            KYC Verification
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p className="text-sm text-gray-600">Address: {user?.address}</p>
            <p className="text-sm text-gray-600">Current KYC Status: {user?.kycStatus}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="decision">KYC Decision</Label>
            <Select value={decision} onValueChange={setDecision} required>
              <SelectTrigger>
                <SelectValue placeholder="Select KYC decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">Approve - Verify KYC</SelectItem>
                <SelectItem value="rejected">Reject - Request More Info</SelectItem>
                <SelectItem value="pending">Keep Pending - Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason/Notes</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for decision or additional notes..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
              Update KYC Status
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface SuspendUserModalProps {
  user: any
  trigger?: React.ReactNode
}

export function SuspendUserModal({ user, trigger }: SuspendUserModalProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "User Suspended",
      description: `User ${user.address} has been suspended. They will be notified via email.`,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="text-red-600">
            <Ban className="w-4 h-4 mr-2" />
            Suspend User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-red-600" />
            Suspend User Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-red-800">Warning</h3>
            <p className="text-sm text-red-700">
              Suspending this user will prevent them from accessing the platform and making new bookings. Existing
              bookings will remain valid unless cancelled separately.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p className="text-sm text-gray-600">Address: {user?.address}</p>
            <p className="text-sm text-gray-600">Total Bookings: {user?.totalBookings}</p>
            <p className="text-sm text-gray-600">Total Spent: {user?.totalSpent} AVAX</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Suspension Duration</Label>
            <Select value={duration} onValueChange={setDuration} required>
              <SelectTrigger>
                <SelectValue placeholder="Select suspension duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Suspension</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter detailed reason for suspension..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Suspend User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
