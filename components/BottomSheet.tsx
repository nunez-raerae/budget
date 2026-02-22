import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { JSX, useMemo } from "react";
import { StyleSheet, Text } from "react-native";

const BottomSheet = ({
  ref,
}: {
  ref: React.Ref<BottomSheetModal>;
}): JSX.Element => {
  const snapPoints = useMemo(() => ["25%"], []);

  return (
    <BottomSheetModal
      ref={ref}
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
  );
};

export default BottomSheet;

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
