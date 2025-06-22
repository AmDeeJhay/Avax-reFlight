"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plane,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  ExternalLink,
  Shield,
  Hash,
  User,
  Star,
  Download,
  Share2,
  Zap,
  Crown,
  Award,
} from "lucide-react"

interface EnhancedNFTTicketProps {
  ticket: {
    id: string
    status: string
    route: { from: string; to: string; fromFull: string; toFull: string }
    date: string
    time: string
    class: string
    seat: string
    airline: string
    flightNumber: string
    price: number
    nftId: string
    tokenId: number
    contractAddress: string
    passenger: {
      name: string
      email: string
      phone: string
    }
    metadata: {
      rarity: "Common" | "Rare" | "Epic" | "Legendary"
      attributes: Array<{ trait_type: string; value: string }>
      gate: string
      terminal: string
      boardingTime: string
      checkInStatus: boolean
    }
  }
  onAction?: (action: string, ticket: any) => void
}

export function EnhancedNFTTicket({ ticket, onAction }: EnhancedNFTTicketProps) {
  const [showQR, setShowQR] = useState(false)
  const [showBoardingPass, setShowBoardingPass] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "from-yellow-400 to-orange-500"
      case "Epic":
        return "from-purple-400 to-pink-500"
      case "Rare":
        return "from-blue-400 to-cyan-500"
      default:
        return "from-gray-400 to-slate-500"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return <Crown className="w-4 h-4" />
      case "Epic":
        return <Zap className="w-4 h-4" />
      case "Rare":
        return <Star className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  const generateQRData = () => {
    return JSON.stringify({
      ticketId: ticket.id,
      nftId: ticket.nftId,
      passenger: ticket.passenger.name,
      flight: ticket.flightNumber,
      seat: ticket.seat,
      gate: ticket.metadata.gate,
      boardingTime: ticket.metadata.boardingTime,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
        {/* Rarity Border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(ticket.metadata.rarity)} opacity-20`} />
        <div className={`h-3 bg-gradient-to-r ${getRarityColor(ticket.metadata.rarity)}`} />

        {/* NFT Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${getRarityColor(ticket.metadata.rarity)} flex items-center justify-center shadow-lg`}
              >
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 truncate">
                  {ticket.route.fromFull} → {ticket.route.toFull}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {ticket.airline} • {ticket.flightNumber}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <Badge
                className={`bg-gradient-to-r ${getRarityColor(ticket.metadata.rarity)} text-white border-0 flex items-center space-x-1`}
              >
                {getRarityIcon(ticket.metadata.rarity)}
                <span className="text-xs font-bold">{ticket.metadata.rarity}</span>
              </Badge>
              <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded">
                #{ticket.tokenId}
              </span>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{new Date(ticket.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{ticket.time}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium truncate">
                  {ticket.class} • {ticket.seat}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Gate {ticket.metadata.gate}</span>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Passenger Details</span>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-medium truncate">{ticket.passenger.name}</p>
              <p className="text-gray-600 truncate">{ticket.passenger.email}</p>
              <p className="text-gray-600">{ticket.passenger.phone}</p>
            </div>
          </div>

          {/* NFT Attributes */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4 border border-purple-100">
            <div className="flex items-center space-x-2 mb-3">
              <Hash className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">NFT Attributes</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ticket.metadata.attributes.map((attr, index) => (
                <div key={index} className="text-xs">
                  <span className="text-gray-600">{attr.trait_type}:</span>
                  <span className="font-mono text-purple-700 ml-1 truncate block">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Dialog open={showQR} onOpenChange={setShowQR}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 min-w-0">
                  <QrCode className="w-4 h-4 mr-1" />
                  <span className="truncate">QR Code</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Boarding QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-48 h-48 bg-white p-4 rounded-lg border-2 border-gray-200">
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{ticket.flightNumber}</p>
                    <p className="text-sm text-gray-600">
                      Gate {ticket.metadata.gate} • Seat {ticket.seat}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Boarding: {ticket.metadata.boardingTime}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 min-w-0">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="truncate">Boarding Pass</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Digital Boarding Pass</DialogTitle>
                </DialogHeader>
                <BoardingPass ticket={ticket} />
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              onClick={() => onAction?.("share", ticket)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white flex-1 min-w-0"
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="truncate">Share NFT</span>
            </Button>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
            <div>
              <p className="text-sm text-gray-600">NFT Value</p>
              <p className="text-xl font-bold text-gray-900">{ticket.price} AVAX</p>
            </div>
            <Button
              onClick={() => onAction?.("view", ticket)}
              className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </div>

        {/* Holographic Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-10 animate-pulse delay-500" />
        </div>
      </Card>
    </motion.div>
  )
}

function BoardingPass({ ticket }: { ticket: any }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{ticket.airline}</h2>
          <p className="text-blue-100">Boarding Pass</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{ticket.flightNumber}</p>
          <p className="text-blue-100">NFT Ticket</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-blue-200 text-sm">PASSENGER</p>
          <p className="font-bold text-lg truncate">{ticket.passenger.name}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">SEAT</p>
          <p className="font-bold text-lg">{ticket.seat}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">FROM</p>
          <p className="font-bold">{ticket.route.from}</p>
          <p className="text-sm text-blue-100">{ticket.route.fromFull}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">TO</p>
          <p className="font-bold">{ticket.route.to}</p>
          <p className="text-sm text-blue-100">{ticket.route.toFull}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">DATE</p>
          <p className="font-bold">{new Date(ticket.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">TIME</p>
          <p className="font-bold">{ticket.time}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">GATE</p>
          <p className="font-bold">{ticket.metadata.gate}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm">BOARDING</p>
          <p className="font-bold">{ticket.metadata.boardingTime}</p>
        </div>
      </div>

      <div className="border-t border-blue-400 pt-4 flex justify-between items-center">
        <div>
          <p className="text-blue-200 text-sm">NFT TOKEN ID</p>
          <p className="font-mono font-bold">#{ticket.tokenId}</p>
        </div>
        <div className="w-16 h-16 bg-white rounded flex items-center justify-center">
          <QrCode className="w-12 h-12 text-gray-800" />
        </div>
      </div>
    </div>
  )
}
