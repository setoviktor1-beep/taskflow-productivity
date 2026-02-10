import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-zinc-100 selection:text-zinc-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="text-2xl font-black tracking-tighter">TaskFlow</div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Login</Link>
          <Link href="/register" className="bg-white text-zinc-950 px-6 py-2.5 rounded-full text-sm font-black hover:bg-zinc-200 transition-all">
            Join Now
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 mb-8 uppercase tracking-widest">
            <Zap size={14} className="text-yellow-400" /> Version 1.0 is live
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
            Manage tasks <span className="text-zinc-500">without the noise.</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-xl mb-12">
            TaskFlow is a minimal productivity system built for focus. Capture inbox items, set priorities, and execute your plan with zero clutter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="bg-zinc-100 text-zinc-950 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3 group">
              Start your workspace <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="bg-zinc-900/50 backdrop-blur border border-zinc-800 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-zinc-800 transition-all flex items-center justify-center">
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-32">
          {[
            { icon: <CheckCircle2 className="text-blue-400" />, title: "Inbox Capture", desc: "Instantly capture tasks before you forget them." },
            { icon: <BarChart3 className="text-purple-400" />, title: "Kanban Visuals", desc: "See your entire workflow at a single glance." },
            { icon: <Shield className="text-emerald-400" />, title: "Enterprise Security", desc: "Data is protected by PostgreSQL RLS technology." }
          ].map((feat, i) => (
            <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all group">
              <div className="mb-6 bg-zinc-950 w-12 h-12 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-sm font-medium">
        <p>© 2026 TaskFlow Productivity. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-white">Terms</Link>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </main>
  );
}