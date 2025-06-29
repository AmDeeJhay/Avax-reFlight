"use client"

import { useEffect, useState } from "react"
import { fetchFromApi } from "@/lib/api"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RedesignedNFTTicket } from "@/components/nft/redesigned-nft-ticket"
import { AnimatedList, AnimatedListItem } from "@/components/animations/enhanced-transitions"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, Plane, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MyTickets() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    setLoading(true)
    fetchFromApi("tickets") // Adjust endpoint if needed
      .then((res) => {
        // Map API ticket schema to UI ticket structure
        const apiTickets = res.data?.ticket
          ? Array.isArray(res.data.ticket)
            ? res.data.ticket
            : [res.data.ticket]
          : []
        // Transform API ticket to match UI structure if needed
        const mappedTickets = apiTickets.map((t: any) => ({
          id: t._id,
          status: t.status || "active",
          route: {
            from: t.flightId?.from,
            to: t.flightId?.to,
            fromFull: t.flightId?.from, // Adjust if you have full names
            toFull: t.flightId?.to,
          },
          date: t.flightId?.departureTime ? t.flightId.departureTime.slice(0, 10) : "",
          time: t.flightId?.departureTime ? new Date(t.flightId.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
          class: t.class || "Economy",
          seat: t.seat || "-",
          airline: t.flightId?.airline,
          flightNumber: t.flightId?._id,
          price: t.price,
          nftId: t.nftTokenId,
          tokenId: t.nftTokenId,
          contractAddress: t.contractAddress || "",
          passenger: {
            name: t.ownerId || "",
            email: "",
            phone: "",
          },
          metadata: {
            rarity: "Common",
            attributes: [],
            gate: "-",
            terminal: "-",
            boardingTime: t.flightId?.departureTime ? new Date(t.flightId.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
            checkInStatus: false,
          },
        }))
        setTickets(mappedTickets)
        setLoading(false)
      })
      .catch((err) => {
        setError(typeof err === "string" ? err : "Failed to fetch tickets")
        setLoading(false)
      })
  }, [])

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

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="flex flex-col gap-6 items-center">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="w-full max-w-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-10 w-32 ml-auto" />
                </div>
                <div className="flex gap-2 mt-4">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-16" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
  }

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
