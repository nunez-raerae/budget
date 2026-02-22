import BottomSheet from "@/components/BottomSheet";
import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { scale, vs } from "react-native-size-matters";

const formatterPHP = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

export default function Index() {
  const { width } = useWindowDimensions(); // CHANGED: read screen width
  const isWide = width >= 420; // CHANGED: breakpoint you can tweak
  const cardWidth = isWide ? "50%" : "100%";

  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
    } catch (error) {
      console.error("Unexpected error signing out:", error);
    }
  };

  // CHANGED: example values (replace with your real data)
  const budget = 2000;
  const spent = 500;

  // CHANGED: progress calculations
  const remaining = Math.max(budget - spent, 0);
  const progress = budget > 0 ? Math.min(spent / budget, 1) : 0; // 0..1
  const progressPct = `${Math.round(progress * 1000) / 10}%`; // e.g. 17.5%

  const isOverBudget = spent > budget;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          paddingTop: 20,
          paddingHorizontal: 16,
          paddingBottom: 1,
        }}
      >
        {/* CHANGED: responsive container */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 20, // if your RN version doesn't support `gap`, remove it and use margins
          }}
        >
          {/* CHANGED: responsive card */}
          <LinearGradient
            // Background Linear Gradient
            colors={["#8776b3", "#c0a8ff"]}
            style={{
              borderRadius: 8,
              padding: 16,
              elevation: 2,
              width: "100%",
              height: vs(110),
              minHeight: vs(90),
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: vs(80),
                height: vs(80),
                position: "absolute",
                borderRadius: 999,
                top: vs(-30),
                right: vs(-30),
                zIndex: 0,
                backgroundColor: "#ffffff33",
              }}
            />
            <View
              style={{
                width: vs(80),
                height: vs(80),
                position: "absolute",
                borderRadius: 999,
                top: vs(70),
                right: scale(280),
                zIndex: 0,
                backgroundColor: "#ffffff33",
              }}
            />
            {/* <View> */}
            <View style={{ width: "100%", marginBottom: 15 }}>
              <Text style={{ fontWeight: "bold", color: "#e7dde1" }}>
                Monthly Budget
              </Text>
              <Text
                style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}
              >
                {formatterPHP.format(budget)}
              </Text>
            </View>

            <View style={{ width: "100%" }}>
              <View
                style={{
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: "#e7dde1" }}>Spent this month</Text>
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                  {formatterPHP.format(spent) /* CHANGED: show spent amount */}
                </Text>
              </View>

              <View>
                <View
                  style={{
                    width: "100%",
                    height: 10,
                    backgroundColor: "#ffffff80",
                    borderRadius: 999,
                    overflow: "hidden",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: `${progress * 100}%`,
                      height: "100%",
                      backgroundColor: spent > budget ? "#f10000" : "#ffffff",
                    }}
                  />
                </View>
              </View>
              <View>
                {isOverBudget ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {isOverBudget ? (
                      <Ionicons
                        name="trending-down"
                        size={16}
                        color="#f10000"
                      />
                    ) : (
                      <Ionicons name="trending-up" size={16} color="#abf4d0" />
                    )}
                    <Text style={{ color: "#f10000", marginLeft: 4 }}>
                      Over budget by {formatterPHP.format(spent - budget)}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="trending-up" size={16} color="#abf4d0" />
                    <Text
                      style={{
                        color: "#abf4d0",
                        marginLeft: 4,
                        fontWeight: "bold",
                      }}
                    >
                      Remaining: {formatterPHP.format(budget - spent)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* </View> */}
          </LinearGradient>
        </View>
        <View
          style={{
            width: "100%",
            height: "auto",
            marginTop: 20,

            alignItems: "center",
            borderRadius: 8,
            padding: 16,
            backgroundColor: "#ffffff",
          }}
        >
          <Text
            style={{
              color: "#202020",
              fontSize: 15,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Top Spending
          </Text>

          {Array(4)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={{
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#202020" }}>
                    Category {index + 10}
                  </Text>
                  <Text style={{ color: "#202020", fontWeight: "bold" }}>
                    {formatterPHP.format((index + 1) * 100)}
                  </Text>
                </View>
                <View
                  style={{
                    height: 10,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${(index + 1) * Math.random() * 25}%`,
                      height: "100%",
                      backgroundColor: "#a8a8a8",
                      borderRadius: 999,
                    }}
                  />
                </View>
              </View>
            ))}
        </View>

        <View style={{ width: "100%", marginTop: 10, flex: 1 }}>
          <View style={{ width: "100%", borderRadius: 10 }}>
            <Text
              style={{
                marginTop: 20,
                alignSelf: "flex-start",
                fontSize: 16,
                fontWeight: "bold",
                color: "#202020",
              }}
            >
              Recent Transactions
            </Text>
            <Text>Today</Text>
          </View>
          {/* <View style={{ width: "100%", flexGrow: 1 }}> */}
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text>Transaction {index + 1}</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {formatterPHP.format((index + 1) * 50)}
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => handleOpenPress()}
          style={{
            margin: 10,
            height: scale(50),
            width: scale(50),
            borderRadius: 999,
            backgroundColor: "#ffffff",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
            right: 0,
          }}
        >
          <LinearGradient
            style={{
              height: scale(50),
              width: scale(50),
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
            // Background Linear Gradient
            colors={["#ed6e84", "#ff9176"]}
          >
            <Ionicons name="add" color={"#ffffff"} size={scale(40)} />
          </LinearGradient>
        </TouchableOpacity>
        <BottomSheet ref={bottomSheetRef} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
