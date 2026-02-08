"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) alert(error.message);
    else router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-3xl font-black">Join TaskFlow</h1>
          <p className="text-zinc-400 mt-2">Start managing tasks with clarity.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-zinc-600" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 font-bold py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-50">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-zinc-500">Already have an account? <Link href="/login" className="text-zinc-200 hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
