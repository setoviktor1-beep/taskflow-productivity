import type { Task, TaskPriority, TaskStatus } from "./types";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";

export type TaskFilters = {
  q?: string;
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
  sort?: "due" | "created" | "priority";
  dir?: "asc" | "desc";
};

export async function fetchTasks(filters: TaskFilters): Promise<Task[]> {
  const supabase = createSupabaseBrowserClient();
  let query = supabase.from("tasks").select("*");

  if (filters.status && filters.status !== "all") query = query.eq("status", filters.status);
  if (filters.priority && filters.priority !== "all") query = query.eq("priority", filters.priority);
  if (filters.q) query = query.ilike("title", `%${filters.q}%`);

  const { data, error } = await query.order(filters.sort === 'due' ? 'due_date' : 'created_at', { ascending: filters.dir === 'asc' });
  if (error) throw error;
  return data as Task[];
}

export async function createTask(payload: any) {
  const supabase = createSupabaseBrowserClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from("tasks").insert({ ...payload, user_id: user?.id });
  if (error) throw error;
}

export async function updateTask(id: string, patch: any) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("tasks").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteTask(id: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}
