"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchTasks, updateTask, deleteTask } from "@/lib/task-queries";
import type { Task, TaskStatus } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskFormModal";
import { Plus } from "lucide-react";

const columns: { key: TaskStatus; title: string; color: string }[] = [
  { key: "inbox", title: "Inbox", color: "bg-zinc-500/10 text-zinc-400" },
  { key: "todo", title: "To Do", color: "bg-blue-500/10 text-blue-400" },
  { key: "doing", title: "Doing", color: "bg-yellow-500/10 text-yellow-400" },
  { key: "done", title: "Done", color: "bg-green-500/10 text-green-400" }
];

export default function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, mode: "edit" as "create" | "edit", initial: null as Task | null });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await fetchTasks({ sort: "priority", dir: "desc" });
    setTasks(data);
    setLoading(false);
  };

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = { inbox: [], todo: [], doing: [], done: [] };
    tasks.forEach(t => map[t.status].push(t));
    return map;
  }, [tasks]);

  const handleMove = async (task: Task, newStatus: TaskStatus) => {
    await updateTask(task.id, { status: newStatus });
    load();
  };

  return (
    <div className="p-6 md:p-10 h-full flex flex-col space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Kanban Board</h1>
          <p className="text-zinc-500 text-sm">Visualize your workflow.</p>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-zinc-500">Loading workspace...</div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-10">
          {columns.map(col => (
            <div key={col.key} className="flex flex-col w-full min-w-[280px] bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${col.color}`}>
                    {col.title}
                  </span>
                  <span className="text-zinc-600 text-xs font-bold">{tasksByStatus[col.key].length}</span>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {tasksByStatus[col.key].map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onEdit={(t) => setModal({ open: true, mode: "edit", initial: t })}
                    onDelete={async (t) => { if (confirm("Delete?")) { await deleteTask(t.id); load(); } }}
                    onMove={handleMove}
                  />
                ))}
                {tasksByStatus[col.key].length === 0 && (
                  <div className="py-10 text-center text-[10px] text-zinc-700 font-bold uppercase tracking-widest border-2 border-dashed border-zinc-800/30 rounded-2xl italic">
                    Drop here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskFormModal 
        open={modal.open} 
        mode={modal.mode} 
        initial={modal.initial} 
        onClose={() => setModal({ ...modal, open: false })} 
        onSubmit={async (payload) => {
          if (modal.initial) await updateTask(modal.initial.id, payload);
          load();
        }}
      />
    </div>
  );
}
