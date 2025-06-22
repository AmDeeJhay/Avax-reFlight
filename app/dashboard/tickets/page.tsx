"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RedesignedNFTTicket } from "@/components/nft/redesigned-nft-ticket"
import { AnimatedList, AnimatedListItem } from "@/components/animations/enhanced-transitions"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, Plane, Plus } from "lucide-react"

const mockTickets = [
  {
    id: "TKT-001",
    status: "active",
    route: { from: "NYC", to: "LAX", fromFull: "New York", toFull: "Los Angeles" },
    date: "2024-12-15",
    time: "14:30",
    class: "Business",
    seat: "4A",
    airline: "SkyLink Airways",
    flightNumber: "SL 1234",
    price: 0.89,
    nftId: "NFT-12345",
    tokenId: 12345,
    contractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
    passenger: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    metadata: {
      rarity: "Rare" as const,
      attributes: [
        { trait_type: "Class", value: "Business" },
        { trait_type: "Route", value: "Transcontinental" },
        { trait_type: "Airline", value: "SkyLink Airways" },
        { trait_type: "Season", value: "Winter 2024" },
      ],
      gate: "A12",
      terminal: "Terminal 1",
      boardingTime: "13:45",
      checkInStatus: true,
    },
  },
  {
    id: "TKT-002",
    status: "reselling",
    route: { from: "LAX", to: "MIA", fromFull: "Los Angeles", toFull: "Miami" },
    date: "2024-12-20",
    time: "09:15",
    class: "Economy",
    seat: "15A",
    airline: "ChainFly",
    flightNumber: "CF 5678",
    price: 0.42,
    nftId: "NFT-12346",
    tokenId: 12346,
    contractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
    passenger: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
    },
    metadata: {
      rarity: "Common" as const,
      attributes: [
        { trait_type: "Class", value: "Economy" },
        { trait_type: "Route", value: "Domestic" },
        { trait_type: "Airline", value: "ChainFly" },
        { trait_type: "Season", value: "Winter 2024" },
      ],
      gate: "B7",
      terminal: "Terminal 2",
      boardingTime: "08:30",
      checkInStatus: false,
    },
  },
  {
    id: "TKT-003",
    status: "cancelled",
    route: { from: "MIA", to: "NYC", fromFull: "Miami", toFull: "New York" },
    date: "2024-11-25",
    time: "18:45",
    class: "First",
    seat: "1A",
    airline: "AeroChain",
    flightNumber: "AC 9012",
    price: 1.12,
    nftId: "NFT-12347",
    tokenId: 12347,
    contractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
    passenger: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 (555) 456-7890",
    },
    metadata: {
      rarity: "Legendary" as const,
      attributes: [
        { trait_type: "Class", value: "First" },
        { trait_type: "Route", value: "Premium" },
        { trait_type: "Airline", value: "AeroChain" },
        { trait_type: "Season", value: "Fall 2024" },
      ],
      gate: "C3",
      terminal: "Terminal 3",
      boardingTime: "18:00",
      checkInStatus: true,
    },
  },
]

export default function MyTickets() {
  const [tickets] = useState(mockTickets)
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleTicketAction = (action: string, ticket: any) => {
    switch (action) {
      case "qr":
        toast({
          title: "QR Code Generated",
          description: "Boarding QR code is ready for scanning",
          duration: 2000,
        })
        break
      case "view":
        toast({
          title: "Opening NFT Explorer",
          description: "Viewing NFT details on blockchain explorer",
          duration: 2000,
        })
        window.open(`https://testnet.snowtrace.io/token/${ticket.contractAddress}?a=${ticket.tokenId}`, "_blank")
        break
      case "share":
        toast({
          title: "Share NFT",
          description: "NFT sharing link copied to clipboard",
          duration: 2000,
        })
        break
      default:
        console.log(`Action ${action} for ticket`, ticket)
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesTab = selectedTab === "all" || ticket.status === selectedTab
    const matchesSearch =
      searchTerm === "" ||
      ticket.route.fromFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.route.toFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My NFT Tickets</h1>
        <p className="text-gray-600 mt-2">Manage your flight tickets and NFTs on the blockchain</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tickets by route, airline, or flight number..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tickets ({tickets.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({tickets.filter((t) => t.status === "active").length})</TabsTrigger>
          <TabsTrigger value="reselling">
            Reselling ({tickets.filter((t) => t.status === "reselling").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({tickets.filter((t) => t.status === "cancelled").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tickets Grid */}
      {filteredTickets.length > 0 ? (
        <AnimatedList className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <AnimatedListItem key={ticket.id}>
              <RedesignedNFTTicket ticket={ticket} onAction={handleTicketAction} />
            </AnimatedListItem>
          ))}
        </AnimatedList>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try adjusting your search terms or filters."
              : selectedTab === "all"
                ? "You haven't booked any flights yet."
                : `No ${selectedTab} tickets found.`}
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Book Your First Flight
          </Button>
        </div>
      )}

      {/* NFT Collection Stats */}
      {filteredTickets.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Collection Value</h3>
            <p className="text-3xl font-bold text-purple-700">
              {tickets.reduce((sum, ticket) => sum + ticket.price, 0).toFixed(2)} AVAX
            </p>
            <p className="text-sm text-purple-600 mt-1">Total NFT value</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Active Flights</h3>
            <p className="text-3xl font-bold text-green-700">{tickets.filter((t) => t.status === "active").length}</p>
            <p className="text-sm text-green-600 mt-1">Ready to travel</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">NFT Rarity</h3>
            <p className="text-3xl font-bold text-blue-700">Rare</p>
            <p className="text-sm text-blue-600 mt-1">Collection status</p>
          </div>
        </div>
      )}
    </div>
  )
}
