"use client";
import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask, type TaskFilters } from "@/lib/task-queries";
import type { Task } from "@/lib/types";
import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskFormModal";
import { Search, Plus } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({ sort: "created", dir: "desc" });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, mode: "create" as "create" | "edit", initial: null as Task | null });

  useEffect(() => {
    load();
  }, [filters]);

  const load = async () => {
    setLoading(true);
    const data = await fetchTasks(filters);
    setTasks(data);
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">My Tasks</h1>
          <p className="text-zinc-500 text-sm">Organize and execute your work.</p>
        </div>
        <button onClick={() => setModal({ open: true, mode: "create", initial: null })} className="bg-zinc-100 text-zinc-950 p-3 rounded-2xl hover:bg-white shadow-lg">
          <Plus size={24}/>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-zinc-600" 
            placeholder="Search tasks..." 
            onChange={e => setFilters({ ...filters, q: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 outline-none text-sm font-bold" onChange={e => setFilters({ ...filters, status: e.target.value as any })}>
            <option value="all">All Status</option>
            <option value="inbox">Inbox</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <select className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-4 py-3 outline-none text-sm font-bold" onChange={e => setFilters({ ...filters, priority: e.target.value as any })}>
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center text-zinc-500 animate-pulse">Scanning tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map(t => (
            <TaskCard 
              key={t.id} 
              task={t} 
              onEdit={(task) => setModal({ open: true, mode: "edit", initial: task })} 
              onDelete={async (task) => { if (confirm("Delete this task?")) { await deleteTask(task.id); load(); } }} 
            />
          ))}
          {tasks.length === 0 && <div className="col-span-full py-20 text-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-3xl">No tasks found matching your filters.</div>}
        </div>
      )}

      <TaskFormModal 
        open={modal.open} 
        mode={modal.mode} 
        initial={modal.initial} 
        onClose={() => setModal({ ...modal, open: false })} 
        onSubmit={async (payload) => {
          if (modal.mode === "create") await createTask(payload);
          else if (modal.initial) await updateTask(modal.initial.id, payload);
          load();
        }}
      />
    </div>
  );
}
