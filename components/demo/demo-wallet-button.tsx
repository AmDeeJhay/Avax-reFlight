"use client"

import { Button } from "@/components/ui/button"
import { Wallet, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DemoWalletButton() {
  const router = useRouter()
  const { toast } = useToast()

  const connectDemo = (role: "user" | "admin") => {
    // Simulate wallet connection for demo purposes
    localStorage.setItem("demo-wallet", "true")
    localStorage.setItem("demo-role", role)
    localStorage.setItem("demo-address", role === "admin" ? "0xAdmin...1234" : "0xUser...5678")

    toast({
      title: "Demo Wallet Connected",
      description: `Connected as ${role}. You can now explore the dashboard!`,
      duration: 3000,
    })

    // Redirect to appropriate dashboard
    if (role === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={() => connectDemo("user")}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      >
        <User className="w-4 h-4 mr-2" />
        Demo as User
      </Button>
      <Button
        onClick={() => connectDemo("admin")}
        className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
      >
        <Shield className="w-4 h-4 mr-2" />
        Demo as Admin
      </Button>
      <Button variant="outline" className="border-flychain-blue text-flychain-blue hover:bg-flychain-blue/10">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Real Wallet
      </Button>
    </div>
  )
}
