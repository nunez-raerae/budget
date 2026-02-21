import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error signing in:", error);
      }
    } catch (error) {
      console.error("Unexpected error signing in:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderRadius: 15,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderRadius: 15,
          paddingHorizontal: 10,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={{
          width: "80%",
          height: 40,
          borderRadius: 15,
          backgroundColor: "#007bff",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={handleLogin}
      >
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={{ color: "#007bff", fontWeight: "bold" }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
