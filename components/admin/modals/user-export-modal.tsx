"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Download } from "lucide-react"

interface UserExportModalProps {
  trigger?: React.ReactNode
}

export function UserExportModal({ trigger }: UserExportModalProps) {
  const [open, setOpen] = useState(false)
  const [exportType, setExportType] = useState("")
  const [format, setFormat] = useState("csv")
  const [includeFields, setIncludeFields] = useState({
    address: true,
    joinDate: true,
    totalBookings: true,
    totalSpent: true,
    tier: true,
    kycStatus: true,
    lastActivity: true,
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // API call would go here
    fetch("/api/admin/users/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exportType, format, includeFields }),
    })
      .then(() => {
        toast({
          title: "Export Started",
          description: "User data export is being processed and will be downloaded shortly.",
        })
        setOpen(false)
      })
      .catch(() => {
        toast({
          title: "Export Failed",
          description: "Failed to export user data. Please try again.",
          variant: "destructive",
        })
      })
  }

  const handleFieldChange = (field: string, checked: boolean) => {
    setIncludeFields((prev) => ({ ...prev, [field]: checked }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export User Data
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="exportType">Export Type</Label>
            <Select value={exportType} onValueChange={setExportType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select export type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-users">All Users</SelectItem>
                <SelectItem value="active-users">Active Users Only</SelectItem>
                <SelectItem value="suspended-users">Suspended Users Only</SelectItem>
                <SelectItem value="kyc-verified">KYC Verified Users</SelectItem>
                <SelectItem value="kyc-pending">KYC Pending Users</SelectItem>
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
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(includeFields).map(([field, checked]) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={checked}
                    onCheckedChange={(checked) => handleFieldChange(field, checked as boolean)}
                  />
                  <Label htmlFor={field} className="text-sm capitalize">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Privacy Notice:</strong> Exported data contains sensitive user information. Handle according to
              privacy policies and regulations.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-500 to-blue-600">
              Export Data
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
