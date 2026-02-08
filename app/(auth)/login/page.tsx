"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="flex h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-3xl font-black">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">Your system is waiting for you.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 font-bold py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-zinc-500">New here? <Link href="/register" className="text-zinc-200 hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
}
