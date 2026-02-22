import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
const settings = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%"], []);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text onPress={() => handleOpenPress()}>settings</Text>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        // index={-1}
        enablePanDownToClose
        // style={styles.bottomSheet}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        bottomInset={10}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default settings;
const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  bottomSheet: {
    left: 0,
    right: 0,
  },
  sheetContent: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
