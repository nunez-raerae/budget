import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const AddModal = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>AddModal</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AddModal;
