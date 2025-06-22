import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { avalanche, avalancheFuji } from "wagmi/chains"
import { QueryClient } from "@tanstack/react-query"

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "your-project-id"

// 2. Create wagmiConfig
const metadata = {
  name: "FlyChain",
  description: "Decentralized Flight Booking Platform",
  url: "https://flychain.app",
  icons: ["https://flychain.app/icon.png"],
}

const chains = [avalanche, avalancheFuji] as const

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#E84142",
    "--w3m-color-mix-strength": 20,
    "--w3m-accent": "#375BD2",
    "--w3m-border-radius-master": "8px",
  },
})

export const queryClient = new QueryClient()
