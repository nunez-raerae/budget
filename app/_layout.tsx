import { SplashScreenController } from "@/components/splash";
import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/provider/auth-provider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "card",
          }}
          name="AddModal"
        />
      </Stack.Protected>
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <GestureHandlerRootView style={{ flex: 1, justifyContent: "center" }}>
        <BottomSheetModalProvider>
          <RootNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <StatusBar style="inverted" />
    </AuthProvider>
  );
}
