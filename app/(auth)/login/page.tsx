"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github, Mail, ArrowRight, Lock, User } from "lucide-react";

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
    if (error) alert(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-[440px] relative">
        {/* Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white text-zinc-950 mb-4 shadow-2xl shadow-white/10 font-black text-2xl">
            TF
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Welcome back</h1>
          <p className="text-zinc-500 mt-2">Enter your credentials to access your workspace.</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleOAuth('github')}
              className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 rounded-2xl transition-all border border-zinc-700/50 active:scale-95"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </button>
            <button 
              onClick={() => handleOAuth('google')}
              className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
            >
              <Mail size={20} />
              <span className="text-sm">Google</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]"><span className="bg-[#0c0c0e] px-4 text-zinc-500 font-black">Or continue with</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="group relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-zinc-500 focus:ring-4 focus:ring-zinc-500/5 text-sm transition-all" 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={18} />
              <input 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-zinc-500 focus:ring-4 focus:ring-zinc-500/5 text-sm transition-all" 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              disabled={loading} 
              className="group w-full bg-zinc-100 text-zinc-950 font-black py-4 rounded-2xl hover:bg-white transition-all disabled:opacity-50 shadow-xl shadow-white/5 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? "Authenticating..." : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-zinc-500 font-medium">
            Don't have an account? <Link href="/register" className="text-white font-bold hover:underline ml-1">Join TaskFlow</Link>
          </p>
          <div className="flex gap-6 text-xs font-bold text-zinc-600 uppercase tracking-widest">
            <Link href="/legal/privacy" className="hover:text-zinc-400">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-zinc-400">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
