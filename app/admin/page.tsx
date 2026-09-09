"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f9a8d4] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-[#e8b4cc]">
        {/* Admin avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#f9a8d4] mb-3">
            <Image
              src="/images/images-5.jpeg"
              alt="Admin avatar"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-[#1e1b4b] font-black text-2xl">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage projects</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[#1e1b4b] text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#e8b4cc] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9a8d4] text-[#1e1b4b]"
              placeholder="Username"
              required
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#1e1b4b] text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#e8b4cc] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9a8d4] text-[#1e1b4b]"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1e1b4b] text-white py-2 rounded-lg font-semibold hover:bg-[#312e81] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#ec4899] hover:underline">
            ← Back to portfoli
          </Link>
        </div>
      </div>
    </div>
  );
}
