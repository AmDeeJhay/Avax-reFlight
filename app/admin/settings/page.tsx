"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Shield, Bell, Zap, Users, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AdminSettings() {
  const [notifications, setNotifications] = useState({
    newBookings: true,
    disputes: true,
    systemAlerts: true,
    userRegistrations: false,
  })

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully",
    })
  }

  const handleSaveSecurity = () => {
    toast({
      title: "Security Updated",
      description: "Security settings have been saved",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated",
      description: "Notification preferences have been saved",
    })
  }

  const handleSaveBlockchain = () => {
    toast({
      title: "Blockchain Settings Saved",
      description: "Blockchain configuration has been updated",
    })
  }

  const handleSaveUsers = () => {
    toast({
      title: "User Settings Saved",
      description: "User management settings have been updated",
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Configure platform settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platformName" className="text-sm">
                    Platform Name
                  </Label>
                  <Input id="platformName" defaultValue="FlyChain" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail" className="text-sm">
                    Support Email
                  </Label>
                  <Input id="supportEmail" type="email" defaultValue="support@flychain.com" className="text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">
                  Platform Description
                </Label>
                <Input id="description" defaultValue="Decentralized flight booking platform" className="text-sm" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-sm">
                    Default Timezone
                  </Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-sm">
                    Default Currency
                  </Label>
                  <Select defaultValue="avax">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avax">AVAX</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleSaveGeneral}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-600">Require 2FA for admin access</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">IP Whitelist</p>
                    <p className="text-xs text-gray-600">Restrict admin access to specific IPs</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-gray-600">Auto-logout after inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionDuration" className="text-sm">
                  Session Duration (minutes)
                </Label>
                <Input id="sessionDuration" type="number" defaultValue="30" className="text-sm" />
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleSaveSecurity}>
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">New Bookings</p>
                    <p className="text-xs text-gray-600">Get notified of new flight bookings</p>
                  </div>
                  <Switch
                    checked={notifications.newBookings}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newBookings: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Dispute Alerts</p>
                    <p className="text-xs text-gray-600">Get notified of new disputes</p>
                  </div>
                  <Switch
                    checked={notifications.disputes}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, disputes: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">System Alerts</p>
                    <p className="text-xs text-gray-600">Get notified of system issues</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">User Registrations</p>
                    <p className="text-xs text-gray-600">Get notified of new user registrations</p>
                  </div>
                  <Switch
                    checked={notifications.userRegistrations}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, userRegistrations: checked })}
                  />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Blockchain Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="network" className="text-sm">
                    Network
                  </Label>
                  <Select defaultValue="avalanche">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gasLimit" className="text-sm">
                    Gas Limit
                  </Label>
                  <Input id="gasLimit" defaultValue="21000" className="text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractAddress" className="text-sm">
                  Smart Contract Address
                </Label>
                <Input
                  id="contractAddress"
                  defaultValue="0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e"
                  className="text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto Gas Optimization</p>
                  <p className="text-xs text-gray-600">Automatically optimize gas fees</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleSaveBlockchain}>
                <Save className="w-4 h-4 mr-2" />
                Save Blockchain Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2" />
                User Management Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">KYC Required</p>
                    <p className="text-xs text-gray-600">Require KYC verification for new users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Auto-approve KYC</p>
                    <p className="text-xs text-gray-600">Automatically approve basic KYC</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-xs text-gray-600">Require email verification for registration</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxBookings" className="text-sm">
                    Max Bookings per User
                  </Label>
                  <Input id="maxBookings" type="number" defaultValue="10" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultTier" className="text-sm">
                    Default User Tier
                  </Label>
                  <Select defaultValue="bronze">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-red-500 to-blue-600 text-sm" onClick={handleSaveUsers}>
                <Save className="w-4 h-4 mr-2" />
                Save User Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
