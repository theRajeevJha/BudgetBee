// ExpenseRepository.ts
import { format, parse } from 'date-fns';

interface Expense {
    category: string;
    itemName: string;
    price: string;
    date: string; // Adding the date field
  }
  
  // This will hold the expenses in memory for now
  let expenses: Expense[] = [
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
    { itemName: 'Burger', price: '5', category: 'FastFood', date: '2024-11-15' },
    { itemName: 'Pizza', price: '8', category: 'FastFood', date: '2024-11-05' },
    { itemName: 'Phone Case', price: '15', category: 'Mobile', date: '2024-10-01' },
  ];
  
  // Function to add an expense
  export const addExpense = (category: string, itemName: string, price: string): Expense => {
    const newExpense: Expense = {
      category,
      itemName,
      price,
      date: new Date().toLocaleString(), // Set current date and time
    };
    expenses.push(newExpense);
    return newExpense;
  };
  
  // Function to get all expenses
  export const getExpenses = (): Expense[] => {
    return expenses;
  };

  // Get expenses by a specific month and year
  export const getExpensesByDate = (year: number, month: number) => {
    const selectedMonthYear = `${year}-${month + 1}`; // Format as 'YYYY-MM'

    return expenses.filter((expense) => {
      const parsedDate = parse(expense.date, 'yyyy-MM-dd', new Date());
      const expenseMonthYear = format(parsedDate, 'yyyy-MM'); // Get the month/year of the expense
      return expenseMonthYear === selectedMonthYear;
    });
  };

  // Get recent expenses (showing the last 10 added expenses)
  export const getRecentExpenses = () => {
    // Sort by date in descending order to get the most recent first
    return expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10); // Show only the most recent 10 expenses
  };
  
  // Function to clear all expenses (optional)
  export const clearExpenses = (): void => {
    expenses = [];
  };

  export const getCategories = () => {
    //complete this method
    return [
    'food', 'entertainment', 'mobile'
   ]
  }
  