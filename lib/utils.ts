import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayISODate() {
  return new Date().toISOString().split('T')[0];
}

export function addDaysISODate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function priorityBadge(priority: string) {
  switch (priority) {
    case "urgent": return "border-red-500/30 bg-red-500/10 text-red-200";
    case "high": return "border-orange-500/30 bg-orange-500/10 text-orange-200";
    case "medium": return "border-sky-500/30 bg-sky-500/10 text-sky-200";
    default: return "border-zinc-500/30 bg-zinc-500/10 text-zinc-200";
  }
}
