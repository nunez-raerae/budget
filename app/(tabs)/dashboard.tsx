import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const dashboard = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        {/* <View>
          {Array(50)
            .fill(0)
            .map((_, index) => (
              <Text key={index}>Item {index + 1}</Text>
            ))}
        </View> */}
        <Text>dashboard</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default dashboard;
