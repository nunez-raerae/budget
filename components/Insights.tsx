import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  createAnimatedComponent,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Insights = () => {
  const PressableAnimted = createAnimatedComponent(Pressable);
  const Iconsss = createAnimatedComponent(Ionicons);
  const [isFocused, setFocused] = React.useState(false);

  const beat = useSharedValue(1);
  const shake = useSharedValue(0);

  React.useEffect(() => {
    beat.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 220, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 220, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );

    shake.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 100 }),
        withTiming(2, { duration: 120 }),
        withTiming(-2, { duration: 120 }),
        withTiming(0, { duration: 100 }),
        withTiming(0, { duration: 500 }), // pause between shakes
      ),
      -1,
      false,
    );
  }, [beat, shake]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: beat.value }, { translateX: shake.value }],
  }));

  return (
    <View style={{ marginTop: 16, width: "100%", padding: 16 }}>
      <View
        style={{
          elevation: 2,
          marginTop: 20,
          width: "100%",
          padding: 16,
          backgroundColor: "#ffffff",
          borderRadius: 12,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              alignItems: "center",
              gap: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Ionicons name="pie-chart" size={24} color="#4f46e5" />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              Quick Insights
            </Text>
          </View>
          <PressableAnimted
            onPress={() => setFocused(true)}
            style={{
              transform: [{ scale: isFocused ? 1.05 : 1 }],
              transitionDuration: "200ms",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 8,
              borderRadius: 9999,
              backgroundColor: "#6365f12f",
              flexDirection: "row",
            }}
          >
            <Iconsss
              style={iconAnimatedStyle}
              name="sparkles"
              size={18}
              color="#4f46e5"
            />
            <Text style={{ color: "#4f46e5", fontWeight: "500", fontSize: 14 }}>
              AI Analyze
            </Text>
          </PressableAnimted>
        </View>
      </View>
    </View>
  );
};

export default Insights;
