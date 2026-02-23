import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type DateItem = {
  key: string; // YYYY-MM-DD
  dateLabel: string; // e.g. "Aug 1"
  dayLabel: string; // e.g. "Mon"
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function formatUtcKey(d: Date) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

function makeWholeYearUtc(year: number): DateItem[] {
  const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0)); // Jan 1
  const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0, 0)); // Jan 1 next year

  const out: DateItem[] = [];
  for (let d = new Date(start); d < end; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push({
      key: formatUtcKey(d),
      dateLabel: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`,
      dayLabel: DAYS[d.getUTCDay()],
    });
  }
  return out;
}

const DateCelendar = () => {
  const dates = useMemo(
    () => makeWholeYearUtc(new Date().getUTCFullYear()),
    [],
  );

  const DateItemView = useCallback(({ date }: { date: DateItem }) => {
    return (
      <TouchableOpacity>
        <LinearGradient
          // Background Linear Gradient
          colors={["#8776b3", "#c0a8ff"]}
          key={date.key}
          style={{
            width: 70,
            height: 60,
            padding: 5,
            backgroundColor: "#a99ad1",
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 18 }}>
            {date.dateLabel}
          </Text>
          <Text style={{ color: "#ffffff", fontSize: 16 }}>
            {date.dayLabel}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ borderRadius: 5 }}
      >
        {dates.map((date) => (
          <DateItemView date={date} key={date.key} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DateCelendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
});
