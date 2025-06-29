"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from "lucide-react"
import { MakeOfferModal } from "@/components/user/modals/make-offer-modal"
import { SellerProfileTooltip } from "@/components/user/seller-profile-tooltip"
import { useEffect, useState } from "react"
import { getTicketById, buyTicket } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Marketplace() {
	const { toast } = useToast()
	const [listingId, setListingId] = useState("")
	const [fetchedListing, setFetchedListing] = useState<any | null>(null)
	const [buying, setBuying] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [fetching, setFetching] = useState(false)

	// Fetch ticket/listing by ID
	const handleFetchListing = async () => {
		setError(null)
		setFetchedListing(null)
		setFetching(true)
		try {
			const data = await getTicketById(listingId)
			// If your API returns the ticket directly, use data; if wrapped, use data.ticket or data.data.ticket
			setFetchedListing(data.ticket || data.data?.ticket || data)
		} catch (err) {
			setFetchedListing(null)
			setError("Listing not found or error fetching listing.")
		} finally {
			setFetching(false)
		}
	}

	// Buy a listed ticket
	const handleBuyNow = async (listing: any) => {
		setBuying(true)
		setError(null)
		try {
			await buyTicket(listing._id || listing.id || listing.nftId)
			toast({
				title: "Purchase Successful!",
				description: `You now own NFT ticket ${listing.nftTokenId || listing.nftId || listing.id}. Check your wallet.`,
			})
			setFetchedListing(null)
			setListingId("")
		} catch (err) {
			setError("Failed to complete purchase. Please try again.")
			toast({
				title: "Purchase Failed",
				description: "Failed to complete purchase. Please try again.",
				variant: "destructive",
			})
		} finally {
			setBuying(false)
		}
	}

	if (fetching) {
		return (
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="mb-6 flex gap-2">
					<Skeleton className="h-10 w-64" />
					<Skeleton className="h-10 w-32" />
				</div>
				<Card className="mb-6">
					<CardContent>
						<div className="flex flex-col gap-2">
							<Skeleton className="h-6 w-32 mb-2" />
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-10 w-32 mt-2" />
						</div>
					</CardContent>
				</Card>
				<div className="mb-8">
					<Skeleton className="h-10 w-48 mb-2" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>
		)
	}

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			{/* Fetch by ID UI */}
			<div className="mb-6 flex gap-2">
				<Input
					placeholder="Enter Ticket ID for Resale"
					value={listingId}
					onChange={(e) => setListingId(e.target.value)}
					className="w-64"
				/>
				<Button onClick={handleFetchListing} disabled={fetching} className="flex items-center gap-2">
					{fetching && <Loader2 className="animate-spin w-4 h-4" />}
					{fetching ? "Fetching..." : "Fetch Listing"}
				</Button>
			</div>
			{error && <div className="text-red-600 mb-4">{error}</div>}
			{fetchedListing && (
				<Card className="mb-6">
					<CardContent>
						<div>
							<h3 className="font-bold">Listing Details</h3>
							<p>ID: {fetchedListing._id || fetchedListing.id || fetchedListing.nftId}</p>
							<p>Status: {fetchedListing.status}</p>
							<p>Price: {fetchedListing.price || fetchedListing.listingPrice} AVAX</p>
							{/* Add more fields as needed */}
							<Button onClick={() => handleBuyNow(fetchedListing)} disabled={buying} className="mt-2">
								{buying ? <><Loader2 className="animate-spin w-4 h-4 mr-2" />Buying...</> : "Buy Now"}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Resale Marketplace</h1>
				<p className="text-gray-600 mt-2">Buy unused tickets from other travelers at discounted prices</p>
			</div>

			{/* Marketplace Listings */}
			{/* You may want to remove mockListings and use real listings here in the future */}
		</div>
	)
}
