import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { JSX, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
const categories = [
  "🍖 Food",
  "🚗 Transport",
  "🎬 Entertainment",
  "🛍️ Shopping",
  "🏥 Health",
  "🎓 Education",
  "💡 Bills",
  "✈️ Travel",
  "🛒 Groceries",
  "🍽️ Dining Out",
  "🏋️ Fitness",
  "🎨 Hobbies",
  "🎁 Gifts",
  "🧑‍💼 Personal",
  "📦 Subscription",
  "💰 Investment",
  "💵 Savings",
  "🎗️ Charity",
  "❓ Other",
];

const categoriesIncome = [
  "💼 Salary",
  "🏢 Business",
  "💻 Freelance",
  "📈 Investments",
  "🎁 Gifts",
];

type formType = {
  type: string;
  category: string;
  amount: string;
  notes: string;
};

const BottomSheet = ({
  ref,
}: {
  ref: React.Ref<BottomSheetModal>;
}): JSX.Element => {
  const snapPoints = useMemo(() => ["40%"], []);
  const inputref =
    React.useRef<React.ComponentRef<typeof BottomSheetTextInput>>(null);
  const queryClient = useQueryClient();
  const session = useAuthContext();

  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formType>({
    defaultValues: {
      type: "Expense",
      category: "",
      amount: "0",
      notes: "",
    },
  });

  const handleChange = useCallback((index: number) => {
    if (index === 0) {
      inputref.current?.focus();
    }
  }, []);

  const type = watch("type");
  const category = watch("category");

  const categoriesToShow = useMemo(
    () => (type === "Expense" ? categories : categoriesIncome),
    [type],
  );

  const handleTypeChange = useCallback(
    (newType: formType["type"]) => {
      setValue("type", newType, {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const handleSelectCategory = useCallback(
    (selectedCategory: formType["category"]) => {
      setValue("category", selectedCategory, {
        shouldValidate: true,
      });
    },
    [setValue],
  );

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["addEntry"],
    mutationFn: async (data: formType) =>
      await supabase.from("budget").insert({
        amount: data.amount, // Get the value from the input
        type: data.type, // "Expense" or "Income"
        category: data.category, // Get the selected category
        desc: data.notes, // Get the notes from the input
        log_date: new Date().toISOString(), // Use current date or get from a date picker
        user_uuid: session?.session?.user?.id, // Get the user ID from the session
      }),
  });

  const handleSave = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      reset({
        type: "Expense",
        category: "",
        amount: "0",
        notes: "",
      });
      if (ref && "current" in ref) {
        ref.current?.dismiss();
      }
      // Close the bottom sheet
      queryClient.invalidateQueries({ queryKey: ["topBudgetEntries"] }); // Invalidate the query to refetch the updated data
    } catch (error) {
      console.log(error);
    }
  });
  const canSave = isValid && !isPending;

  const renderCategory = useCallback(
    (item: string) => (
      <Pressable
        onPress={() => handleSelectCategory(item)}
        key={item}
        style={{
          opacity: category === item ? 1 : 0.5,
          width: 100,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          backgroundColor: "#e2e2e2",
          borderRadius: 20,
          marginRight: 8,
        }}
      >
        <Text>{item}</Text>
      </Pressable>
    ),
    [category],
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      keyboardBehavior="extend"
      onChange={handleChange}
      enableDynamicSizing={false}
      bottomInset={10}
      stackBehavior="replace"
      enableContentPanningGesture={false}
    >
      <BottomSheetView style={styles.sheetContent}>
        <View
          style={{
            width: "100%",

            alignItems: "center",
            marginBottom: 16,
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Controller
            control={control}
            name="type"
            rules={{ required: "Type is required" }}
            render={() => <></>}
          />
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={() => <></>}
          />
          <Pressable
            onPress={() => handleTypeChange("Expense")}
            style={{
              opacity: type === "Expense" ? 1 : 0.5,
              borderRadius: 20,
              width: "50%",
              height: 40,
              backgroundColor: "#e2e2e2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Expense</Text>
          </Pressable>
          <Pressable
            onPress={() => handleTypeChange("Income")}
            style={{
              opacity: type === "Income" ? 1 : 0.5,
              borderRadius: 20,
              width: "50%",
              height: 40,
              backgroundColor: "#e2e2e2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Income</Text>
          </Pressable>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "#e2e2e2",
            borderRadius: 10,
            padding: 8,
            paddingLeft: 30,
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange, onBlur } }) => (
              <BottomSheetTextInput
                keyboardType="decimal-pad"
                ref={inputref}
                id="amount"
                value={value.toString()}
                onChangeText={(text) => onChange(text)}
                onBlur={onBlur}
                style={styles.input}
              />
            )}
          />

          <Text
            style={{
              padding: 8,
              position: "absolute",
              fontSize: 35,
              fontWeight: "400",
            }}
          >
            ₱
          </Text>
        </View>

        <View style={{ width: "100%", flex: 1, marginTop: 16 }}>
          <BottomSheetFlatList
            horizontal
            data={categoriesToShow}
            keyExtractor={(item: string) => item}
            renderItem={({ item }: { item: string }) => renderCategory(item)}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginBottom: 8,
            fontWeight: "bold",
            marginTop: 16,
            color: "#555",
          }}
        >
          Additonal notes (optional)
        </Text>
        <Controller
          control={control}
          name="notes"
          render={({ field: { value, onChange, onBlur } }) => (
            <BottomSheetTextInput
              value={value}
              onChangeText={(text) => onChange(text)}
              onBlur={onBlur}
              keyboardType="default"
              style={styles.input1}
            />
          )}
        />

        <TouchableOpacity
          disabled={!canSave}
          onPress={canSave ? handleSave : undefined}
          style={{
            opacity: canSave ? 0.5 : 1,
            flexDirection: "row",
            marginTop: 16,
            width: "100%",
            backgroundColor: "#007bff",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            {isPending ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
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
  input: {
    width: "100%",
    // height: 40,
    borderColor: "gray",
    fontSize: 25,

    fontStyle: "normal",
    fontWeight: "bold",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  input1: {
    width: "100%",
    // height: 40,
    borderColor: "gray",
    fontSize: 18,

    fontStyle: "normal",
    borderRadius: 10,
    paddingHorizontal: 8,

    backgroundColor: "#e2e2e2",

    padding: 8,
    paddingLeft: 5,
  },
});
