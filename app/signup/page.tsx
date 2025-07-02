"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await signupUser({ email, password, name });
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccess(true);
        toast.success("Registration successful! Logging you in...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(res?.message || "Signup failed");
      }
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("password")) {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err?.message || (typeof err === "string" ? err : "Signup failed"));
      }
      toast.error(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google signup coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <Card className="relative w-full max-w-md p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-blue-50/20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="group flex items-center text-red-600 hover:text-red-700 mb-6 text-sm font-medium transition-all duration-200 hover:gap-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-red-600 rounded-2xl shadow-xl ring-4 ring-white/50 flex items-center justify-center">
                <Image 
                  src="/placeholder-logo.svg" 
                  alt="Avax-reFlight Logo" 
                  width={32} 
                  height={32} 
                  className="filter brightness-0 invert" 
                />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-red-500 rounded-2xl opacity-20 blur-lg animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-500 text-center font-medium">Join Avax-reFlight and start your journey</p>
          </div>

          {/* Google Signup Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 py-3 mb-6 border-2 border-gray-200 rounded-2xl bg-white/70 hover:bg-white hover:border-gray-300 transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image src="/google-logo.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </button>

          <div className="flex items-center my-6">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="mx-4 text-xs text-gray-400 font-medium">or continue with email</span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {success && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl mb-4 text-center font-semibold animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Registration successful! Redirecting...
              </div>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4 text-center font-semibold animate-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="pl-11 h-12 bg-white/70 border-2 border-gray-200 focus:border-red-400 focus:bg-white rounded-2xl text-gray-800 placeholder:text-gray-400 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="pl-11 h-12 bg-white/70 border-2 border-gray-200 focus:border-red-400 focus:bg-white rounded-2xl text-gray-800 placeholder:text-gray-400 transition-all duration-200"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="pl-11 pr-11 h-12 bg-white/70 border-2 border-gray-200 focus:border-red-400 focus:bg-white rounded-2xl text-gray-800 placeholder:text-gray-400 transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-transparent bg-gradient-to-r from-red-600 to-blue-500 bg-clip-text font-semibold hover:from-red-700 hover:to-blue-600 transition-all duration-200"
            >
              Sign in
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
