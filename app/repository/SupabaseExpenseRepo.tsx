import { Expense } from "../model/expense";
import { IExpenseRepo } from "./IExpenseRepo";
import { createClient, SupabaseClient } from "@supabase/supabase-js"; // Import Supabase client

// Initialize Supabase client

class SupabaseExpenseRepo implements IExpenseRepo {
  private supabase : SupabaseClient

   constructor() {
     this.supabase = createClient("https://efpxfvokufzuuqipqujw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcHhmdm9rdWZ6dXVxaXBxdWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjgxNDEsImV4cCI6MjA0OTM0NDE0MX0.--mB2x0M0ctMWYWgLkI-FF0zZEhyNWRvV_D8QY7ItnQ");
  }

  public async addExpense(expense: Expense): Promise<void> {
    const { data, error } = await this.supabase
      .from("expenses") // Assuming your table is called 'expenses'
      .insert([
        {
          user_id: expense.userId,
          amount: expense.amount,
          name: expense.name,
          category: expense.category,
          updated_at: expense.updated_at,
        },
      ]);

    if (error) {
      throw new Error(`Failed to add expense: ${error.message} , ${expense}`);
    }
  }

  public async getExpenseByUserIdAndMonth(
    userId: string,
    month: string
  ): Promise<Expense[]> {
    const { data, error } = await this.supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .like("date", `${month}%`); // Assuming date is in 'YYYY-MM-DD' format

    if (error) {
      throw new Error(`Failed to fetch expenses: ${error.message}`);
    }

    return data.map((item: any) => new Expense(item));
  }

 public async getRecentExpenses(limit: number): Promise<Expense[]> {
    const { data, error } = await this.supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch recent expenses: ${error.message}`);
    }

    return data.map((item: any) => new Expense(item)); // Map results to Expense objects
  }

  public async updateExpenses(
    expenseId: string,
    updatedExpense: Expense
  ): Promise<void> {
    const { data, error } = await this.supabase
      .from("expenses")
      .update({
        amount: updatedExpense.amount,
        description: updatedExpense.description,
        category: updatedExpense.category,
        date: updatedExpense.updated_at,
      })
      .eq("id", expenseId); // Assuming 'id' is the primary key

    if (error) {
      throw new Error(`Failed to update expense: ${error.message}`);
    }
  }
}

export default SupabaseExpenseRepo;
