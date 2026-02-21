import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { session, profile, isLoading } = useAuthContext();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
    } catch (error) {
      console.error("Unexpected error signing out:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Text onPress={handleLogout}>Logout</Text>
      <Link href="/(auth)/login">Go to Login</Link>
    </View>
  );
}
