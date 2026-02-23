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
      .order("created_at", { ascending: true });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching top budget entries:", error);
    return [];
  }
}

export async function deleteBudgetEntry(id: number) {
  try {
    const { error } = await supabase.from("budget").delete().eq("id", id);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting budget entry:", error);
  }
}
