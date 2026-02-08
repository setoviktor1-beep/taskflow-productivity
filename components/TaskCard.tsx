import { priorityBadge } from "@/lib/utils";
import type { Task, TaskStatus } from "@/lib/types";
import { Edit2, Trash2, ArrowRight } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete, onMove }: { 
  task: Task; 
  onEdit: (t: Task) => void; 
  onDelete: (t: Task) => void;
  onMove?: (t: Task, s: TaskStatus) => void;
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4 hover:bg-zinc-900/40 transition-all shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-bold text-zinc-100">{task.title}</h3>
          {task.description && <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{task.description}</p>}
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityBadge(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/50 pt-3">
        <div className="flex gap-2">
          <span className="text-[10px] text-zinc-500 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">{task.status}</span>
          {task.due_date && <span className="text-[10px] text-zinc-400 font-medium">Due: {task.due_date}</span>}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg"><Edit2 size={14}/></button>
          <button onClick={() => onDelete(task)} className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14}/></button>
        </div>
      </div>
    </div>
  );
}
