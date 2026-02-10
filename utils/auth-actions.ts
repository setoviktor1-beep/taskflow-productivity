import { createSupabaseBrowserClient } from "@/utils/supabase/client";

export const signInWithSocial = async (provider: 'github' | 'google') => {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) alert(error.message);
};
