"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<'user' | 'admin'>('user');

  // Check if user is already logged in
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");
  let userInitials = "AR";
  let userAvatar = null;
  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.name) {
        userInitials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
      }
      if (user?.avatar) {
        userAvatar = user.avatar;
      }
    } catch {}
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await loginUser(email, password);
      setSuccess(true);
      toast.success("Login successful!");
      setTimeout(() => {
        if (role === 'admin') {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 1200);
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("password")) {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err?.message || (typeof err === "string" ? err : "Login failed"));
      }
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <Card className="relative w-full max-w-md p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-red-50/20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="group flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium transition-all duration-200 hover:gap-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="w-16 h-16 mb-4 shadow-xl ring-4 ring-white/50">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt="User Avatar" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-blue-600 text-white text-xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-blue-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-center font-medium">Sign in to your Avax-reFlight account</p>
          </div>

          {success && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl mb-4 text-center font-semibold animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Login successful! Redirecting...
              </div>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4 text-center font-semibold animate-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selector */}
            <div className="flex items-center justify-center p-1 bg-gray-100 rounded-2xl mb-6">
              <label className={`flex-1 text-center py-2 px-4 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 ${
                role === 'user' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="sr-only"
                />
                User
              </label>
              <label className={`flex-1 text-center py-2 px-4 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 ${
                role === 'admin' 
                  ? 'bg-white text-red-600 shadow-md' 
                  : 'text-gray-600 hover:text-red-600'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="sr-only"
                />
                Admin
              </label>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 bg-white/70 border-2 border-gray-200 focus:border-blue-400 focus:bg-white rounded-2xl text-gray-800 placeholder:text-gray-400 transition-all duration-200"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="pl-11 pr-11 h-12 bg-white/70 border-2 border-gray-200 focus:border-blue-400 focus:bg-white rounded-2xl text-gray-800 placeholder:text-gray-400 transition-all duration-200"
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
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-transparent bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text font-semibold hover:from-blue-700 hover:to-red-600 transition-all duration-200"
            >
              Sign up
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}