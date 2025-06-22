"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Calendar, Clock, MapPin, QrCode, ExternalLink, Sparkles, Shield, Hash } from "lucide-react"

interface NFTTicketProps {
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
    tokenId?: number
    contractAddress?: string
  }
  onAction?: (action: string, ticket: any) => void
}

export function NFTTicketCard({ ticket, onAction }: NFTTicketProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "from-green-400 to-emerald-600"
      case "reselling":
        return "from-blue-400 to-cyan-600"
      case "cancelled":
        return "from-gray-400 to-slate-600"
      case "expired":
        return "from-red-400 to-rose-600"
      default:
        return "from-purple-400 to-indigo-600"
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 border-green-200",
      reselling: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200",
      expired: "bg-red-100 text-red-800 border-red-200",
    }

    return (
      <Badge className={`${colors[status as keyof typeof colors]} border font-medium`}>{status.toUpperCase()}</Badge>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-white to-gray-50 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
        {/* NFT Gradient Border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getStatusColor(ticket.status)} opacity-10`} />

        {/* NFT Header with Sparkles */}
        <div className="relative">
          <div className={`h-2 bg-gradient-to-r ${getStatusColor(ticket.status)}`} />
          <div className="absolute top-2 right-4 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-1 rounded">
              NFT #{ticket.nftId.split("-")[1]}
            </span>
          </div>
        </div>

        <CardContent className="p-6 relative">
          {/* Status and Actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStatusColor(ticket.status)} flex items-center justify-center shadow-lg`}
              >
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {ticket.route.fromFull} → {ticket.route.toFull}
                </h3>
                <p className="text-sm text-gray-600">
                  {ticket.airline} • {ticket.flightNumber}
                </p>
              </div>
            </div>
            {getStatusBadge(ticket.status)}
          </div>

          {/* Flight Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{new Date(ticket.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{ticket.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                {ticket.class} • {ticket.seat}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Verified NFT</span>
            </div>
          </div>

          {/* NFT Metadata */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4 border border-purple-100">
            <div className="flex items-center space-x-2 mb-3">
              <Hash className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">NFT Metadata</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Token ID:</span>
                <span className="font-mono text-purple-700">
                  {ticket.tokenId || Math.floor(Math.random() * 100000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contract:</span>
                <span className="font-mono text-purple-700">{ticket.contractAddress || "0x742d...5c8e"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Standard:</span>
                <span className="font-mono text-purple-700">ERC-721</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chain:</span>
                <span className="font-mono text-purple-700">Avalanche</span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Original Price</p>
              <p className="text-xl font-bold text-gray-900">{ticket.price} AVAX</p>
            </div>

            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAction?.("qr", ticket)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <QrCode className="w-4 h-4 mr-1" />
                  QR
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={() => onAction?.("view", ticket)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View NFT
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Holographic Effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-1000" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
