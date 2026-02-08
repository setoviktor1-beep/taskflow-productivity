import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-6xl font-black tracking-tighter">TaskFlow</h1>
        <p className="text-xl text-zinc-400">
          The productivity system that stays out of your way. Capture, plan, and execute with clarity.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/login" className="bg-zinc-100 text-zinc-950 px-8 py-3 rounded-2xl font-bold hover:bg-white transition-all">
            Login
          </Link>
          <Link href="/register" className="bg-zinc-900 border border-zinc-800 text-white px-8 py-3 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
            Join Now
          </Link>
        </div>
      </div>
    </main>
  );
}
