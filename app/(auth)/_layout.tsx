import { Stack } from "expo-router";
import React from "react";

const AuthLayOut = () => {
  return (
    <Stack>
      <Stack.Screen
        options={{ headerShown: false, animation: "default" }}
        name="login"
      />
      <Stack.Screen
        options={{ headerShown: false, animation: "default" }}
        name="register"
      />
    </Stack>
  );
};

export default AuthLayOut;
