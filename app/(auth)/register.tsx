import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const register = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.error("Error signing up:", error);
      } else {
        console.log(
          "Registration successful! Please check your email for confirmation.",
        );
      }
    } catch (error) {
      console.error("Unexpected error signing up:", error);
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
        onPress={handleRegister}
      >
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: "#007bff", fontWeight: "bold" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default register;
