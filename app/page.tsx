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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mobile-viewport">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 mobile-header">
        <div className="container mx-auto mobile-container py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Plane className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              FlyChain
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors mobile-text">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors mobile-text">
              How It Works
            </Link>
            <Link href="#partners" className="text-gray-600 hover:text-gray-900 transition-colors mobile-text">
              Partners
            </Link>
            <UnifiedConnectButton variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" />
          </nav>
          <div className="md:hidden">
            <UnifiedConnectButton variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 sm:py-16 lg:py-20 mobile-container">
        <div className="container mx-auto text-center max-w-4xl">
          <ScaleIn delay={0.2}>
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-red-500 to-blue-600 text-white text-xs sm:text-sm">
              Built on Avalanche • Powered by Chainlink
            </Badge>
          </ScaleIn>

          <ScaleIn delay={0.4}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
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
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Reclaim control over your travel with decentralized flight booking, NFT tickets, and automated refunds.
              The future of travel is here.
            </p>
          </ScaleIn>

          <ScaleIn delay={0.8}>
            <div className="mb-6 sm:mb-8">
              <UnifiedConnectButton
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 w-full sm:w-auto"
                showRoleSwitch={true}
              />
            </div>
          </ScaleIn>

          <ScaleIn delay={1.0}>
            <p className="text-xs sm:text-sm text-gray-500">
              Connect with demo mode to explore instantly, or use your real wallet
            </p>
          </ScaleIn>
        </div>
      </section>

      {/* Flight Search Panel */}
      <section className="py-8 sm:py-12 lg:py-16 mobile-container bg-white">
        <div className="container mx-auto max-w-4xl">
          <AnimatedCard className="shadow-2xl border-0 bg-gradient-to-r from-red-50 to-blue-50">
            <Card>
              <CardHeader className="text-center mobile-card">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Search Flights</CardTitle>
                <p className="text-gray-600 mobile-text">Find your next adventure on the blockchain</p>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 mobile-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Departure</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mobile-input">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          <span className="mobile-text">Select date</span>
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
                        <Button variant="outline" className="w-full justify-start mobile-input">
                          <CalendarDays className="w-4 h-4 mr-2" />
                          <span className="mobile-text">Select date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <label className="text-sm font-medium text-gray-700">Passengers</label>
                    <Select>
                      <SelectTrigger className="mobile-input">
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
                    <SelectTrigger className="mobile-input">
                      <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white py-2.5 sm:py-3 mobile-text">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Search Flights
                </Button>

                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Connect your wallet to view live pricing and book flights
                </p>
              </CardContent>
            </Card>
          </AnimatedCard>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 mobile-container bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Choose FlyChain?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of travel with blockchain-powered booking, true ticket ownership, and automated
              fairness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <ScaleIn delay={0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white mobile-card">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Refundable Tickets</h3>
                  <p className="text-gray-600 mobile-text">
                    Cancel anytime with automated refunds based on smart contract logic and real-time flight data.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.2}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white mobile-card">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Resell & Get Paid</h3>
                  <p className="text-gray-600 mobile-text">
                    Can't make your flight? List your NFT ticket on our marketplace and earn from resales.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.3}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white mobile-card">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure & Verifiable</h3>
                  <p className="text-gray-600 mobile-text">
                    All transactions verified through Chainlink oracles with immutable records on Avalanche.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-white mobile-card">
                <CardContent className="pt-6 sm:pt-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Decentralized & Global</h3>
                  <p className="text-gray-600 mobile-text">
                    No central authority. Lower fees. Global access. Built on Avalanche for speed and scale.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 mobile-container bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">How FlyChain Works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Simple steps to revolutionize your travel experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <ScaleIn delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">1. Connect Wallet</h3>
                <p className="text-gray-600 mobile-text">Connect your Web3 wallet to access the decentralized booking platform.</p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">2. Search & Book</h3>
                <p className="text-gray-600 mobile-text">
                  Find flights with real-time pricing and book directly on-chain with NFT ticket generation.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">3. Cancel or Sell</h3>
                <p className="text-gray-600 mobile-text">
                  Plans changed? Cancel for automated refunds or list your ticket for resale.
                </p>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Coins className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">4. Get Paid</h3>
                <p className="text-gray-600 mobile-text">
                  Receive automatic refunds or resale payouts directly to your wallet on-chain.
                </p>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-8 sm:py-12 lg:py-16 mobile-container bg-gradient-to-r from-red-50 to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Powered By Industry Leaders</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-12 opacity-70">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CL</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">Chainlink</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-red-500">Avalanche</span>
            </div>
          </div>
          <p className="text-gray-600 mt-4 sm:mt-6 mobile-text">
            Built on Avalanche for lightning-fast transactions. Powered by Chainlink for reliable, real-world data.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 mobile-container bg-gradient-to-r from-red-500 to-blue-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Fly the Decentralized Way?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
            Join the future of travel. Book your first flight on FlyChain today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <UnifiedConnectButton
              size="lg"
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto"
              showRoleSwitch={true}
            />
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Learn More
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 mobile-container bg-gray-900 text-white mobile-safe-area">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-2xl font-bold">FlyChain</span>
              </div>
              <p className="text-gray-400 mobile-text">Fly freely. Fly fairly. The decentralized future of travel.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 mobile-text">Platform</h4>
              <ul className="space-y-2 text-gray-400 mobile-text">
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
              <h4 className="font-semibold mb-3 sm:mb-4 mobile-text">Resources</h4>
              <ul className="space-y-2 text-gray-400 mobile-text">
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
              <h4 className="font-semibold mb-3 sm:mb-4 mobile-text">Company</h4>
              <ul className="space-y-2 text-gray-400 mobile-text">
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

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 mobile-text">
            <p>&copy; 2024 FlyChain. All rights reserved. Built on Avalanche. Powered by Chainlink.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
