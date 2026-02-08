import { createSupabaseServerClient } from "@/utils/supabase/server";
import { todayISODate, addDaysISODate, priorityBadge } from "@/lib/utils";
import TaskCard from "@/components/TaskCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const today = todayISODate();
  const nextWeek = addDaysISODate(7);

  // 1. Today's Tasks
  const { data: todayTasks } = await supabase.from("tasks")
    .select("*")
    .eq("due_date", today)
    .neq("status", "done")
    .order("priority", { ascending: false });

  // 2. Overdue Tasks
  const { data: overdueTasks } = await supabase.from("tasks")
    .select("*")
    .lt("due_date", today)
    .neq("status", "done")
    .order("due_date", { ascending: true });

  // 3. Stats
  const { count: inboxCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("status", "inbox");

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Focused overview of your priorities.</p>
        </div>
        <Link href="/tasks" className="bg-zinc-100 text-zinc-950 px-6 py-2.5 rounded-2xl font-bold hover:bg-white transition-all shadow-lg shadow-white/5">
          + New Task
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Inbox</p>
          <p className="text-3xl font-black mt-1">{inboxCount || 0}</p>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
          <p className="text-red-500/80 text-xs font-bold uppercase tracking-widest">Overdue</p>
          <p className="text-3xl font-black mt-1 text-red-400">{overdueTasks?.length || 0}</p>
        </div>
        <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Due Today</p>
          <p className="text-3xl font-black mt-1">{todayTasks?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Today's Priorities
          </h2>
          <div className="space-y-3">
            {todayTasks?.length ? todayTasks.map((t: any) => (
              <div key={t.id} className="bg-zinc-900/20 border border-zinc-800 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-zinc-100">{t.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityBadge(t.priority)}`}>{t.priority}</span>
                </div>
              </div>
            )) : <p className="text-zinc-500 text-sm italic">Clear for today.</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Action Required (Overdue)
          </h2>
          <div className="space-y-3">
            {overdueTasks?.length ? overdueTasks.map((t: any) => (
              <div key={t.id} className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl">
                <p className="font-bold text-red-200">{t.title}</p>
                <p className="text-xs text-red-400/60 mt-1 italic">Due: {t.due_date}</p>
              </div>
            )) : <p className="text-zinc-500 text-sm italic">Nothing overdue.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
