/**
 * Smart contract interaction utilities for FlyChain
 */

import { createPublicClient, createWalletClient, http, parseEther } from "viem"
import { avalanche, avalancheFuji } from "viem/chains"

// Contract addresses (these would be deployed contract addresses)
export const CONTRACTS = {
  FLIGHT_BOOKING: "0x1234567890abcdef1234567890abcdef12345678",
  NFT_TICKETS: "0x2234567890abcdef1234567890abcdef12345678",
  MARKETPLACE: "0x3234567890abcdef1234567890abcdef12345678",
  REFUND_MANAGER: "0x4234567890abcdef1234567890abcdef12345678",
} as const

// ABI definitions (simplified for demo)
export const FLIGHT_BOOKING_ABI = [
  {
    name: "bookFlight",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "flightId", type: "string" },
      { name: "passenger", type: "address" },
      { name: "seatClass", type: "uint8" },
    ],
    outputs: [{ name: "ticketId", type: "uint256" }],
  },
  {
    name: "cancelFlight",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "ticketId", type: "uint256" }],
    outputs: [{ name: "refundAmount", type: "uint256" }],
  },
] as const

export const NFT_TICKETS_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenURI", type: "string" },
    ],
    outputs: [{ name: "tokenId", type: "uint256" }],
  },
  {
    name: "transferFrom",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
    outputs: [],
  },
] as const

// Client setup
const chain = process.env.NODE_ENV === "production" ? avalanche : avalancheFuji

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})

export const getWalletClient = (account: `0x${string}`) => {
  return createWalletClient({
    account,
    chain,
    transport: http(),
  })
}

// Contract interaction functions
export class FlightBookingContract {
  static async bookFlight(account: `0x${string}`, flightId: string, seatClass: number, price: string) {
    try {
      const walletClient = getWalletClient(account)

      const hash = await walletClient.writeContract({
        address: CONTRACTS.FLIGHT_BOOKING,
        abi: FLIGHT_BOOKING_ABI,
        functionName: "bookFlight",
        args: [flightId, account, seatClass],
        value: parseEther(price),
      })

      // Wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return { success: true, hash, receipt }
    } catch (error) {
      console.error("Booking error:", error)
      return { success: false, error: error.message }
    }
  }

  static async cancelFlight(account: `0x${string}`, ticketId: number) {
    try {
      const walletClient = getWalletClient(account)

      const hash = await walletClient.writeContract({
        address: CONTRACTS.FLIGHT_BOOKING,
        abi: FLIGHT_BOOKING_ABI,
        functionName: "cancelFlight",
        args: [ticketId],
      })

      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return { success: true, hash, receipt }
    } catch (error) {
      console.error("Cancellation error:", error)
      return { success: false, error: error.message }
    }
  }

  static async getFlightDetails(flightId: string) {
    try {
      // In a real implementation, this would call a view function
      // For now, return mock data
      return {
        id: flightId,
        airline: "SkyLink Airways",
        departure: { city: "New York", code: "NYC", time: "14:30" },
        arrival: { city: "Los Angeles", code: "LAX", time: "17:45" },
        price: "0.45",
        available: true,
      }
    } catch (error) {
      console.error("Error fetching flight details:", error)
      return null
    }
  }
}

export class NFTTicketsContract {
  static async transferTicket(account: `0x${string}`, to: `0x${string}`, tokenId: number) {
    try {
      const walletClient = getWalletClient(account)

      const hash = await walletClient.writeContract({
        address: CONTRACTS.NFT_TICKETS,
        abi: NFT_TICKETS_ABI,
        functionName: "transferFrom",
        args: [account, to, tokenId],
      })

      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return { success: true, hash, receipt }
    } catch (error) {
      console.error("Transfer error:", error)
      return { success: false, error: error.message }
    }
  }

  static async getTicketMetadata(tokenId: number) {
    try {
      // Mock ticket metadata
      return {
        id: tokenId,
        flightId: "SL1234",
        passenger: "0x1234...5678",
        seat: "4A",
        class: "Business",
        departure: "2024-12-15T14:30:00Z",
        route: "NYC → LAX",
      }
    } catch (error) {
      console.error("Error fetching ticket metadata:", error)
      return null
    }
  }
}

// Utility functions
export const formatPrice = (price: string | number): string => {
  if (typeof price === "string") {
    return `${Number.parseFloat(price).toFixed(2)} AVAX`
  }
  return `${price.toFixed(2)} AVAX`
}

export const formatTransactionHash = (hash: string): string => {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

export const getExplorerUrl = (hash: string): string => {
  const baseUrl = chain.id === avalanche.id ? "https://snowtrace.io" : "https://testnet.snowtrace.io"
  return `${baseUrl}/tx/${hash}`
}
