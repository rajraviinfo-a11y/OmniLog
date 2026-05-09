import { AiParsedIntent } from '@omnilog/shared';
import { InventoryService } from './inventory.service';
import { ExpenseService } from './expense.service';
import { DietService } from './diet.service';

export class AiService {
  static async parseAndExecute(input: string, userId: string, householdId: string): Promise<any> {
    const lowerInput = input.toLowerCase();
    let category: AiParsedIntent['category'] = 'Unknown';
    let extractedData: any = {};
    let savedRecord = null;

    // MOCK AI LOGIC (Regex-based)
    const expenseMatch = lowerInput.match(/(paid|bought|spent).*?(?:for\s)?\$?(\d+(?:\.\d+)?).*?(?:for|on)?\s([a-z\s]+)/i);
    const inventoryMatch = lowerInput.match(/(bought|got|added)\s(\d+(?:\.\d+)?)\s?(kg|g|l|liters|bottles|pcs)\s([a-z\s]+)/i);
    const dietMatch = lowerInput.match(/(ate|had|consumed)\s(.*)/i);

    if (inventoryMatch && !lowerInput.includes('for $') && !lowerInput.includes('paid')) {
      category = 'Inventory';
      extractedData = {
        quantity: parseFloat(inventoryMatch[2]),
        unit: inventoryMatch[3],
        item: inventoryMatch[4].trim()
      };
      savedRecord = await InventoryService.addOrUpdateItem({
        householdId,
        itemName: extractedData.item,
        quantity: extractedData.quantity,
        unit: extractedData.unit,
        category: 'Groceries'
      });

    } else if (expenseMatch || lowerInput.includes('paid')) {
      category = 'Expense';
      const amountMatch = lowerInput.match(/\$?(\d+(?:\.\d+)?)/);
      const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
      
      extractedData = {
        amount: amount,
        description: input
      };
      savedRecord = await ExpenseService.addExpense({
        householdId,
        userId,
        amount: extractedData.amount,
        category: 'General',
        description: input
      });
      
    } else if (dietMatch) {
      category = 'Consumption';
      extractedData = {
        meal: dietMatch[2].trim(),
        mockMacros: { protein: 20, carbs: 30, fat: 10 }
      };
      savedRecord = await DietService.addLog({
        userId,
        mealName: extractedData.meal,
        calories: 350,
        macros: extractedData.mockMacros
      });
    }

    return {
      parsed_intent: { category, extracted_data: extractedData },
      record: savedRecord
    };
  }
}
