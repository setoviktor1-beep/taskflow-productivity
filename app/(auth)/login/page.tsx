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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        
        {/* Logo ir Antraštė */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4">
            <span className="text-white font-bold text-xl">TF</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sveiki sugrįžę</h2>
        </div>

        {/* Socialiniai mygtukai sulygiuoti po du */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            type="button"
            onClick={() => signInWithSocial('github')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            <img src="https://authjs.dev/img/providers/github.svg" className="w-4 h-4 invert" alt="GitHub" />
            GitHub
          </button>
          <button 
            type="button"
            onClick={() => signInWithSocial('google')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
        </div>

        {/* Skiriamoji linija */}
        <div className="relative mb-8 flex items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="px-3 text-xs text-gray-500 uppercase tracking-widest">Arba el. paštu</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Sulygiuota forma */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase ml-1">El. paštas</label>
            <input 
              type="email" 
              placeholder="vardas@imone.lt"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase ml-1">Slaptažodis</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-700"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg mt-2 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Jungiamasi..." : "Prisijungti"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Neturite paskyros? <Link href="/register" className="text-blue-400 hover:underline">Registruotis</Link>
        </p>
      </div>
    </div>
  )
}
