import { SplashScreenController } from "@/components/splash";
import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/provider/auth-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootNavigator = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="(auth)"
        />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="(tabs)"
        />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="inverted" />
    </AuthProvider>
  );
}
