
  export class Expense {
    userId: string;
    amount: number;
    description: string;
    category: string;
    name: string;
    updated_at: Date
  
    constructor(data: any) {
      this.userId = data.user_id;
      this.amount = data.amount;
      this.description = data.description;
      this.category = data.category;
      this.name = data.name;
      this.updated_at = data.updated_at
    }
  }