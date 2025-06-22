"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, User } from "lucide-react"

interface SellerProfileTooltipProps {
  seller: string
  children: React.ReactNode
}

export function SellerProfileTooltip({ seller, children }: SellerProfileTooltipProps) {
  const [open, setOpen] = useState(false)

  // Mock seller data - would come from API
  const sellerData = {
    address: seller,
    rating: 4.8,
    totalSales: 23,
    memberSince: "2024-01-15",
    tier: "Gold",
    verified: true,
    responseTime: "< 1 hour",
    completionRate: 98,
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className="cursor-pointer hover:text-blue-600 transition-colors">{children}</span>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{seller}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{sellerData.rating} rating</span>
                </div>
              </div>
            </div>
            {sellerData.verified && <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Sales</p>
              <p className="font-semibold">{sellerData.totalSales}</p>
            </div>
            <div>
              <p className="text-gray-600">Completion Rate</p>
              <p className="font-semibold">{sellerData.completionRate}%</p>
            </div>
            <div>
              <p className="text-gray-600">Response Time</p>
              <p className="font-semibold">{sellerData.responseTime}</p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="font-semibold">{new Date(sellerData.memberSince).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              {sellerData.tier} Tier
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              View Full Profile
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
