import { useAuthContext } from "@/hooks/use-auth-context";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  setTimeout(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, 1000);

  return null;
}
