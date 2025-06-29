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
  MapPin,
  QrCode,
  ExternalLink,
  Shield,
  Hash,
  User,
  Download,
  Share2,
  Zap,
  Crown,
  Award,
  Sparkles,
  Gem,
} from "lucide-react"

interface RedesignedNFTTicketProps {
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

export function RedesignedNFTTicket({ ticket, onAction }: RedesignedNFTTicketProps) {
  const [showQR, setShowQR] = useState(false)
  const [showBoardingPass, setShowBoardingPass] = useState(false)

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "from-yellow-400 via-orange-500 to-red-500"
      case "Epic":
        return "from-purple-400 via-pink-500 to-red-500"
      case "Rare":
        return "from-blue-400 via-purple-500 to-pink-500"
      default:
        return "from-gray-400 via-gray-500 to-gray-600"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
      case "Epic":
        return <Gem className="w-4 h-4 sm:w-5 sm:h-5" />
      case "Rare":
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
      default:
        return <Award className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-gradient-to-br from-yellow-50 to-orange-50"
      case "Epic":
        return "bg-gradient-to-br from-purple-50 to-pink-50"
      case "Rare":
        return "bg-gradient-to-br from-blue-50 to-purple-50"
      default:
        return "bg-gradient-to-br from-gray-50 to-slate-50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
      className="perspective-1000"
    >
      <Card
        className={`relative overflow-hidden border-0 shadow-lg sm:shadow-2xl ${getRarityBg(ticket.metadata.rarity)} transform-gpu`}
      >
        {/* Animated Border */}
        <div className="absolute inset-0 p-[1px] sm:p-[2px] rounded-lg">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-lg animate-pulse`}
          />
          <div className={`relative h-full w-full rounded-lg ${getRarityBg(ticket.metadata.rarity)}`} />
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple/10 pointer-events-none" />

        {/* Floating Particles - Hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-full opacity-30`}
              animate={{
                x: [0, 60, 0],
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${15 + i * 20}%`,
                top: `${25 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="relative p-3 sm:p-4 lg:p-6 z-10">
          {/* Header with Rarity Badge */}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <motion.div
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} flex items-center justify-center shadow-lg flex-shrink-0`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-1 mobile-truncate">
                  {ticket.route.from} → {ticket.route.to}
                </h3>
                <p className="text-gray-600 font-medium text-sm sm:text-base mobile-truncate">
                  {ticket.airline} • {ticket.flightNumber}
                </p>
              </div>
            </div>

            <motion.div
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} text-white shadow-lg flex-shrink-0`}
              whileHover={{ scale: 1.05 }}
            >
              {getRarityIcon(ticket.metadata.rarity)}
              <span className="font-bold text-xs sm:text-sm">{ticket.metadata.rarity}</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </div>

          {/* NFT Token Info */}
          <div className="bg-black/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-bold text-purple-800 text-sm sm:text-base">NFT #{ticket.tokenId}</span>
              </div>
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm text-xs">
                ERC-721
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div>
                <p className="text-gray-600 font-medium">Contract</p>
                <p className="font-mono text-xs text-purple-700 mobile-truncate">{ticket.contractAddress}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Chain</p>
                <p className="font-semibold text-purple-700">Avalanche</p>
              </div>
            </div>
          </div>

          {/* Flight Details Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Date & Time</span>
              </div>
              <p className="font-bold text-gray-900 text-sm sm:text-base">{new Date(ticket.date).toLocaleDateString()}</p>
              <p className="text-xs sm:text-sm text-gray-600">{ticket.time}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Seat & Gate</span>
              </div>
              <p className="font-bold text-gray-900 text-sm sm:text-base">
                {ticket.class} • {ticket.seat}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Gate {ticket.metadata.gate}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Passenger</span>
              </div>
              <p className="font-bold text-gray-900 text-sm sm:text-base mobile-truncate">{ticket.passenger.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 mobile-truncate">{ticket.passenger.email}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Status</span>
              </div>
              <p className="font-bold text-gray-900 text-sm sm:text-base capitalize">{ticket.status}</p>
              <p className="text-xs sm:text-sm text-gray-600">Verified NFT</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Dialog open={showQR} onOpenChange={setShowQR}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full bg-white/70 backdrop-blur-sm border-white/30 text-xs sm:text-sm h-8 sm:h-9 lg:h-10">
                    <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    QR Code
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="mobile-modal">
                <DialogHeader>
                  <DialogTitle className="mobile-text">Boarding QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white p-3 sm:p-4 rounded-lg border-2 border-gray-200">
                    <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                      <QrCode className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium mobile-text">{ticket.flightNumber}</p>
                    <p className="text-sm text-gray-600">
                      Gate {ticket.metadata.gate} • Seat {ticket.seat}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full bg-white/70 backdrop-blur-sm border-white/30 text-xs sm:text-sm h-8 sm:h-9 lg:h-10">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Boarding Pass
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="mobile-modal">
                <DialogHeader>
                  <DialogTitle className="mobile-text">Digital Boarding Pass</DialogTitle>
                </DialogHeader>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold">{ticket.airline}</h2>
                      <p className="text-blue-100 text-sm sm:text-base">Boarding Pass</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold">{ticket.flightNumber}</p>
                      <p className="text-blue-100 text-sm sm:text-base">NFT Ticket</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-blue-200 text-xs sm:text-sm">PASSENGER</p>
                      <p className="font-bold text-sm sm:text-lg mobile-truncate">{ticket.passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs sm:text-sm">SEAT</p>
                      <p className="font-bold text-sm sm:text-lg">{ticket.seat}</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/30">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">NFT Value</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {ticket.price} AVAX
              </p>
            </div>

            <div className="flex space-x-1 sm:space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction?.("share", ticket)}
                  className="bg-white/70 backdrop-blur-sm border-white/30 text-xs h-8 sm:h-9"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={() => onAction?.("view", ticket)}
                  className={`bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} text-white shadow-lg border-0 text-xs h-8 sm:h-9`}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">View NFT</span>
                  <span className="sm:hidden">View</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Glow Effect - Hidden on mobile for performance */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-lg blur opacity-20 -z-10 hidden sm:block`}
        />
      </Card>
    </motion.div>
  )
}
