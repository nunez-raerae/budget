import { Tabs } from "expo-router";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "#9e9e9e",
          borderTopWidth: 1,
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        // sceneStyle: {
        //   backgroundColor: "#810a0a",
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarLabelStyle: {
            fontWeight: "semibold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarLabelStyle: {
            fontWeight: "semibold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabelStyle: {
            fontWeight: "semibold",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
