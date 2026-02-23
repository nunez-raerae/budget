import { supabase } from "@/lib/supabase";

export async function fetchTopBudgetEntries() {
  try {
    const now = new Date();
    // UTC: this month range
    const startOfMonthUtc = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0),
    );
    const startOfNextMonthUtc = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0),
    );
    const { data, error } = await supabase
      .from("budget")
      .select("*")
      .gte("created_at", startOfMonthUtc.toISOString())
      .lt("created_at", startOfNextMonthUtc.toISOString())
      .order("amount", { ascending: false });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching top budget entries:", error);
    return [];
  }
}

export async function fetchAllSpendingByMonth() {
  try {
    const now = new Date();
    const startOfMonthUtc = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0),
    );
    const startOfNextMonthUtc = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0),
    );
    const { data, error } = await supabase
      .from("budget")
      .select("*")
      .eq("type", "Expense")
      .gte("created_at", startOfMonthUtc.toISOString())
      .lt("created_at", startOfNextMonthUtc.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching all spending by month:", error);
    return [];
  }
}
