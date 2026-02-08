"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListTodo, Columns, Settings, LogOut } from "lucide-react";
import { cx } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/board", label: "Board", icon: Columns },
  { href: "/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  const pathname = usePathname();
  const supabase = createSupabaseBrowserClient();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-zinc-900 bg-zinc-950/40 p-4 md:flex">
      <div className="p-2 mb-6">
        <div className="text-xl font-black tracking-tight">TaskFlow</div>
      </div>
      <nav className="flex-1 space-y-1">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={cx(
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
            pathname === item.href ? "bg-zinc-900 text-zinc-50" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
          )}>
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
