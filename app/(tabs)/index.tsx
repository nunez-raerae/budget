import Insights from "@/components/Insights";
import { useTimeFrame } from "@/store/store";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const formatterPHP = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

const Index = () => {
  const timeFrame = useTimeFrame((state) => state.timeFrame);

  const timeFrameButtons = useCallback(() => {
    return <TimeFrameButtons />;
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#4f46e5" }}>
        <StatusBar animated={true} style="inverted" />
        <View style={styles.mainContainer}>
          <View style={styles.cardHeader}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#c3cdfd",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long", // "Friday"
                    month: "short", // "Feb"
                    day: "numeric", // "25"
                  })}
                </Text>
                <Text
                  style={{ color: "#ffffff", fontSize: 24, fontWeight: "900" }}
                >
                  Hello, User!
                </Text>
              </View>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={{
                  backgroundColor: "#4f46e5",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  padding: 5,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: "#c3cdfd",
                }}
              />
            </View>
            <Text
              style={{
                color: "#c3cdfd",
                fontSize: 14,
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Total Spent this {timeFrame.toLocaleLowerCase()}
            </Text>

            <Text
              style={{
                marginBottom: 16,
                color: "#ffffff",
                fontSize: 35,
                fontWeight: "900",
              }}
            >
              {formatterPHP.format(Math.floor(Math.random() * 1000) + 100)}
            </Text>

            {timeFrameButtons()}
          </View>
          <Insights />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  cardHeader: {
    backgroundColor: "#4f46e5",
    width: "100%",
    // height: 200,
    justifyContent: "center",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

function TimeFrameButtons() {
  const updateTimeFrame = useTimeFrame((state) => state.updateTimeFrame);
  const timeFrames = ["Today", "Week", "Month", "Year"];

  const [currentTimeFrame, setCurrentTimeFrame] = React.useState("Today");

  const Pressanimate = Animated.createAnimatedComponent(Pressable);
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        borderRadius: 99999,
        padding: 5,

        backgroundColor: "#6366f1",
      }}
    >
      {timeFrames.map((frame) => (
        <Pressanimate
          style={{
            transform: [{ scale: currentTimeFrame === frame ? 1.01 : 1 }],
            transitionDuration: "200ms",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,

            minWidth: 70,
            backgroundColor:
              currentTimeFrame === frame ? "#ffffff" : "transparent",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 99999,
          }}
          onPress={() => {
            setCurrentTimeFrame(frame);
            updateTimeFrame(frame);
          }}
          key={frame}
        >
          <Text
            style={{
              color: currentTimeFrame === frame ? "#4338ca" : "#ffffff",
              fontWeight: "800",
            }}
          >
            {frame}
          </Text>
        </Pressanimate>
      ))}
    </View>
  );
}
