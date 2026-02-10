// app/(app)/settings/page.tsx
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user!;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black text-white">Settings</h1>
        <p className="text-zinc-500 text-sm">Manage your profile and account preferences.</p>
      </header>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-widest text-[10px]">Your Profile</h2>
          
          <div className="space-y-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <label className="block text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Full Name</label>
              <p className="text-zinc-100 font-medium">{profile?.full_name || "Not set"}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <label className="block text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Email Address</label>
              <p className="text-zinc-100 font-medium">{user.email}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <label className="block text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Account Created</label>
              <p className="text-zinc-100 font-medium">{new Date(profile?.created_at || '').toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-widest text-[10px] mb-4">Appearance</h2>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-zinc-100 font-medium text-sm">Dark Mode</p>
              <p className="text-zinc-500 text-xs">System preference is always active.</p>
            </div>
            <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center px-1">
              <div className="w-3 h-3 bg-white rounded-full ml-auto" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
