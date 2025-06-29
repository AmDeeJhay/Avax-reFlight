"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Plane,
  Shield,
  RefreshCw,
  Coins,
  Globe,
  Search,
  ArrowRight,
  CheckCircle,
  Users,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"
import { UnifiedConnectButton } from "@/components/wallet/unified-connect-button"
import { AnimatedCard, ScaleIn } from "@/components/animations/enhanced-transitions"
import { AirportSelector } from "@/components/booking/airport-selector"

export default function FlyChainLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              Avax-reFlights
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#partners" className="text-gray-600 hover:text-gray-900 transition-colors">
              Partners
            </Link>
            <UnifiedConnectButton variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <ScaleIn delay={0.2}>
            <Badge className="mb-6 bg-gradient-to-r from-red-500 to-blue-600 text-white">
              Built on Avalanche • Powered by Chainlink
            </Badge>
          </ScaleIn>

          <ScaleIn delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Book Flights.{" "}
              <span className="bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                Trade Tickets.
              </span>{" "}
              Get Refunded.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                All On-Chain.
              </span>
            </h1>
          </ScaleIn>

          <ScaleIn delay={0.6}>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Reclaim control over your travel with decentralized flight booking, NFT tickets, and automated refunds.
              The future of travel is here.
            </p>
          </ScaleIn>

          <ScaleIn delay={0.8}>
            <div className="mb-8">
              <UnifiedConnectButton
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                showRoleSwitch={true}
              />
            </div>
          </ScaleIn>

          <ScaleIn delay={1.0}>
            <p className="text-sm text-gray-500">
              Connect with demo mode to explore instantly, or use your real wallet
            </p>
          </ScaleIn>
        </div>
      </section>

      {/* Flight Search Panel */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <AnimatedCard className="shadow-2xl border-0 bg-gradient-to-r from-red-50 to-blue-50">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Search Flights</CardTitle>
                <p className="text-gray-600">Find your next adventure on the blockchain</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">From</label>
                    <AirportSelector
                      value=""
                      onSelect={(code) => console.log("From:", code)}
                      placeholder="Select departure city"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">To</label>
                    <AirportSelector
                      value=""
                      onSelect={(code) => console.log("To:", code)}
                      placeholder="Select destination city"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Departure</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          Select date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Return (Optional)</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          Select date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Passengers</label>
                    <Select>
                      <SelectTrigger>
                        <Users className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="1 Adult" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Adult</SelectItem>
                        <SelectItem value="2">2 Adults</SelectItem>
                        <SelectItem value="3">3 Adults</SelectItem>
                        <SelectItem value="4">4+ Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Class</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white py-3">
                  <Search className="w-5 h-5 mr-2" />
                  Search Flights
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Connect your wallet to view live pricing and book flights
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FlyChain?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of travel with blockchain-powered booking, true ticket ownership, and automated
              fairness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScaleIn delay={0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Refundable Tickets</h3>
                  <p className="text-gray-600">
                    Cancel anytime with automated refunds based on smart contract logic and real-time flight data.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.2}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Resell & Get Paid</h3>
                  <p className="text-gray-600">
                    Can't make your flight? List your NFT ticket on our marketplace and earn from resales.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.3}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Verifiable</h3>
                  <p className="text-gray-600">
                    All transactions verified through Chainlink oracles with immutable records on Avalanche.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Decentralized & Global</h3>
                  <p className="text-gray-600">
                    No central authority. Lower fees. Global access. Built on Avalanche for speed and scale.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How FlyChain Works</h2>
            <p className="text-xl text-gray-600">Simple steps to revolutionize your travel experience</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <ScaleIn delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Connect Wallet</h3>
                <p className="text-gray-600">Connect your Web3 wallet to access the decentralized booking platform.</p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Search & Book</h3>
                <p className="text-gray-600">
                  Find flights with real-time pricing and book directly on-chain with NFT ticket generation.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Cancel or Sell</h3>
                <p className="text-gray-600">
                  Plans changed? Cancel for automated refunds or list your ticket for resale.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coins className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">4. Get Paid</h3>
                <p className="text-gray-600">
                  Receive automatic refunds or resale payouts directly to your wallet on-chain.
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-16 px-4 bg-gradient-to-r from-red-50 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Powered By Industry Leaders</h2>
          <div className="flex justify-center items-center space-x-12 opacity-80">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.prod.website-files.com/5f6b7190899f41fb70882d08/6656037210b1691e305622e4_logo.svg"
                alt="Chainlink Logo"
                className="w-12 h-12 object-contain"
                style={{ background: "white", borderRadius: "0.5rem", padding: 4 }}
              />
              <span className="text-2xl font-bold text-blue-600">Chainlink</span>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Avalanche_logo_without_text.svg"
                alt="Avalanche Logo"
                className="w-12 h-12 object-contain"
                style={{ background: "white", borderRadius: "0.5rem", padding: 4 }}
              />
              <span className="text-2xl font-bold text-red-500">Avalanche</span>
            </div>
          </div>
          <p className="text-gray-600 mt-6">
            Built on Avalanche for lightning-fast transactions. Powered by Chainlink for reliable, real-world data.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Fly the Decentralized Way?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the future of travel. Book your first flight on FlyChain today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <UnifiedConnectButton
              size="lg"
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-100"
              showRoleSwitch={true}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Avax-reFlights</span>
              </div>
              <p className="text-gray-400">Fly freely. Fly fairly. The decentralized future of travel.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    User Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Rewards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Avax-reFlights. All rights reserved. Built on Avalanche. Powered by Chainlink.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
