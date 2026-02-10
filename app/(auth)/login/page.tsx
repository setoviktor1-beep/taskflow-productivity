"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithSocial } from '@/utils/auth-actions';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Pagrindinė kortelė */}
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        {/* Logo / Antraštė */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">TF</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter your credentials to access your workspace.</p>
        </div>

        {/* Socialiniai prisijungimai */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => signInWithSocial('github')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
          >
            <img src="https://authjs.dev/img/providers/github.svg" className="w-4 h-4 invert" alt="GitHub" />
            GitHub
          </button>
          <button 
            onClick={() => signInWithSocial('google')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#111] px-2 text-gray-500">Or continue with</span></div>
        </div>

        {/* Formos laukai */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1 uppercase">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* Footer nuorodos */}
        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500">
            Don't have an account? <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">Join TaskFlow</Link>
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-600">
            <Link href="/legal/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>

      </div>
    </div>
  )
}