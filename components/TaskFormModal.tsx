"use client";
import { useState, useEffect } from "react";
import type { Task, TaskStatus, TaskPriority } from "@/lib/types";
import { X } from "lucide-react";

export default function TaskFormModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit
}: {
  open: boolean;
  mode: "create" | "edit";
  initial?: Task | null;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("inbox");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initial) {
      setTitle(initial.title);
      setDescription(initial.description || "");
      setStatus(initial.status);
      setPriority(initial.priority);
      setDueDate(initial.due_date || "");
    } else if (open) {
      setTitle("");
      setDescription("");
      setStatus("inbox");
      setPriority("medium");
      setDueDate("");
    }
  }, [open, initial]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        title,
        description: description || null,
        status,
        priority,
        due_date: dueDate || null
      });
      onClose();
    } catch (e) {
      alert("Error saving task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{mode === "create" ? "New Task" : "Edit Task"}</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-100"><X size={24}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:border-zinc-600 font-bold" 
            placeholder="Task Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
          
          <textarea 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:border-zinc-600 min-h-[100px]" 
            placeholder="Notes (optional)" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Status</label>
              <select className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 outline-none focus:border-zinc-600" value={status} onChange={e => setStatus(e.target.value as any)}>
                <option value="inbox">Inbox</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Priority</label>
              <select className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 outline-none focus:border-zinc-600" value={priority} onChange={e => setPriority(e.target.value as any)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest ml-1">Due Date</label>
            <input 
              type="date" 
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 outline-none focus:border-zinc-600" 
              value={dueDate} 
              onChange={e => setDueDate(e.target.value)} 
            />
          </div>

          <button disabled={loading} className="w-full bg-zinc-100 text-zinc-950 font-black py-4 rounded-2xl hover:bg-white transition-all disabled:opacity-50 mt-4 shadow-xl shadow-white/5">
            {loading ? "Saving..." : mode === "create" ? "Create Task" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
