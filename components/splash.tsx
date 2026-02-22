import { useAuthContext } from "@/hooks/use-auth-context";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoading) {
        SplashScreen.hideAsync();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return null;
}
