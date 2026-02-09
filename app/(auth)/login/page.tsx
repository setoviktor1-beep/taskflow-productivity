"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Github, Mail } from "lucide-react";

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
    <div className="flex h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2 text-sm">Your productivity system is waiting.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleOAuth('github')}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-2xl transition-all border border-zinc-700"
          >
            <Github size={20} />
            <span className="text-sm">GitHub</span>
          </button>
          <button 
            onClick={() => handleOAuth('google')}
            className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-bold py-3 rounded-2xl transition-all"
          >
            <Mail size={20} />
            <span className="text-sm">Google</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-2 text-zinc-500 font-bold tracking-widest">Or continue with</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600 text-sm" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600 text-sm" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 font-black py-3 rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-white/5">
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500 font-medium">
          New to TaskFlow? <Link href="/register" className="text-zinc-200 font-bold hover:underline ml-1">Create an account</Link>
        </p>
      </div>
    </div>
  );
}