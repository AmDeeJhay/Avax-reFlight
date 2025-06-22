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
        return <Crown className="w-5 h-5" />
      case "Epic":
        return <Gem className="w-5 h-5" />
      case "Rare":
        return <Zap className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
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
        y: -8,
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className="perspective-1000"
    >
      <Card
        className={`relative overflow-hidden border-0 shadow-2xl ${getRarityBg(ticket.metadata.rarity)} transform-gpu`}
      >
        {/* Animated Border */}
        <div className="absolute inset-0 p-[2px] rounded-lg">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-lg animate-pulse`}
          />
          <div className={`relative h-full w-full rounded-lg ${getRarityBg(ticket.metadata.rarity)}`} />
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-purple/10 pointer-events-none" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-full opacity-30`}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative p-6 z-10">
          {/* Header with Rarity Badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} flex items-center justify-center shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Plane className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">
                  {ticket.route.from} → {ticket.route.to}
                </h3>
                <p className="text-gray-600 font-medium">
                  {ticket.airline} • {ticket.flightNumber}
                </p>
              </div>
            </div>

            <motion.div
              className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} text-white shadow-lg`}
              whileHover={{ scale: 1.05 }}
            >
              {getRarityIcon(ticket.metadata.rarity)}
              <span className="font-bold text-sm">{ticket.metadata.rarity}</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* NFT Token Info */}
          <div className="bg-black/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-800">NFT #{ticket.tokenId}</span>
              </div>
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                ERC-721
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600 font-medium">Contract</p>
                <p className="font-mono text-xs text-purple-700 truncate">{ticket.contractAddress}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Chain</p>
                <p className="font-semibold text-purple-700">Avalanche</p>
              </div>
            </div>
          </div>

          {/* Flight Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Date & Time</span>
              </div>
              <p className="font-bold text-gray-900">{new Date(ticket.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">{ticket.time}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Seat & Gate</span>
              </div>
              <p className="font-bold text-gray-900">
                {ticket.class} • {ticket.seat}
              </p>
              <p className="text-sm text-gray-600">Gate {ticket.metadata.gate}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Passenger</span>
              </div>
              <p className="font-bold text-gray-900 truncate">{ticket.passenger.name}</p>
              <p className="text-sm text-gray-600 truncate">{ticket.passenger.email}</p>
            </motion.div>

            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              <p className="font-bold text-gray-900 capitalize">{ticket.status}</p>
              <p className="text-sm text-gray-600">Verified NFT</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Dialog open={showQR} onOpenChange={setShowQR}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full bg-white/70 backdrop-blur-sm border-white/30">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                </motion.div>
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
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full bg-white/70 backdrop-blur-sm border-white/30">
                    <Download className="w-4 h-4 mr-2" />
                    Boarding Pass
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Digital Boarding Pass</DialogTitle>
                </DialogHeader>
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
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-blue-200 text-sm">PASSENGER</p>
                      <p className="font-bold text-lg">{ticket.passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">SEAT</p>
                      <p className="font-bold text-lg">{ticket.seat}</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/30">
            <div>
              <p className="text-sm text-gray-600 font-medium">NFT Value</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {ticket.price} AVAX
              </p>
            </div>

            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction?.("share", ticket)}
                  className="bg-white/70 backdrop-blur-sm border-white/30"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={() => onAction?.("view", ticket)}
                  className={`bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} text-white shadow-lg border-0`}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View NFT
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${getRarityGradient(ticket.metadata.rarity)} rounded-lg blur opacity-20 -z-10`}
        />
      </Card>
    </motion.div>
  )
}
