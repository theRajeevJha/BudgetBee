import { Expense } from "../model/expense";

export interface IExpenseRepo {
    addExpense(expense: Expense): Promise<void>;
    getExpenseByUserIdAndMonth(userId: string, month: string): Promise<Expense[]>;
    getRecentExpenses(limit: number): Promise<Expense[]>;
    updateExpenses(expenseId: string, updatedExpense: Expense): Promise<void>;
}