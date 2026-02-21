import { expo } from "@/app.json";
import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${expo.scheme}://google-auth/callback`,
    },
  });

  if (!data?.url) return;

  await WebBrowser.openAuthSessionAsync(
    data.url,
    `${expo.scheme}://google-auth/callback`,
  );
}
