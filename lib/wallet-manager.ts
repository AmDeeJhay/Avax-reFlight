"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface WalletState {
  isConnected: boolean
  isDemoMode: boolean
  address: string | null
  balance: string
  role: "user" | "admin" | null
  chainId: number | null
}

interface WalletStore extends WalletState {
  connect: (mode: "demo" | "real", role?: "user" | "admin") => Promise<void>
  disconnect: () => void
  setBalance: (balance: string) => void
  switchRole: (role: "user" | "admin") => void
}

// Demo wallet addresses for different roles
const DEMO_ADDRESSES = {
  user: "0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e",
  admin: "0x8ba1f109551bD432803012645Hac136c5c8b8e",
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      isConnected: false,
      isDemoMode: false,
      address: null,
      balance: "0.00",
      role: null,
      chainId: null,

      connect: async (mode: "demo" | "real", role: "user" | "admin" = "user") => {
        try {
          if (mode === "demo") {
            // Demo mode connection
            set({
              isConnected: true,
              isDemoMode: true,
              address: DEMO_ADDRESSES[role],
              balance: role === "admin" ? "125.50" : "2.45",
              role,
              chainId: 43113, // Avalanche Fuji testnet
            })
          } else {
            // Real wallet connection logic would go here
            // For now, we'll simulate a real connection
            set({
              isConnected: true,
              isDemoMode: false,
              address: "0x" + Math.random().toString(16).substr(2, 40),
              balance: (Math.random() * 10).toFixed(4),
              role: "user",
              chainId: 43113,
            })
          }
        } catch (error) {
          console.error("Wallet connection failed:", error)
          throw error
        }
      },

      disconnect: () => {
        set({
          isConnected: false,
          isDemoMode: false,
          address: null,
          balance: "0.00",
          role: null,
          chainId: null,
        })
      },

      setBalance: (balance: string) => {
        set({ balance })
      },

      switchRole: (role: "user" | "admin") => {
        const currentState = get()
        if (currentState.isDemoMode) {
          set({
            role,
            address: DEMO_ADDRESSES[role],
            balance: role === "admin" ? "125.50" : "2.45",
          })
        }
      },
    }),
    {
      name: "flychain-wallet-storage",
      storage: createJSONStorage(() => {
        // Check if we're in the browser
        if (typeof window !== "undefined") {
          return localStorage
        }
        // Return a mock storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
    },
  ),
)
