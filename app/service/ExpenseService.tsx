import { Expense } from "../model/expense"; 
import { IExpenseRepo } from "../repository/IExpenseRepo";
import SupabaseExpenseRepo from "../repository/SupabaseExpenseRepo";

export class ExpenseService {
    private static instance: ExpenseService;
    private expenseRepo: IExpenseRepo;

    private constructor() {
      this.expenseRepo = new SupabaseExpenseRepo(); // Or any other repository
    }

    public async addExpense(expense: Expense) {
      await this.expenseRepo.addExpense(expense);
    }
  
    public async getExpenseByUserIdAndMonth(userId: string, month: string) {
      return await this.expenseRepo.getExpenseByUserIdAndMonth(userId, month);
    }
  
    public async getRecentExpenses(limit: number) {
      return await this.expenseRepo.getRecentExpenses(limit);
    }
  
    public async updateExpenses(expenseId: string, updatedExpense: Expense) {
      await this.expenseRepo.updateExpenses(expenseId, updatedExpense);
    }

     // Method to access the single instance
    public static getInstance(): ExpenseService {
      if (!ExpenseService.instance) {
        ExpenseService.instance = new ExpenseService(); // Create the instance if it doesn't exist
      }
      return ExpenseService.instance;
    }

  }

export default ExpenseService;
