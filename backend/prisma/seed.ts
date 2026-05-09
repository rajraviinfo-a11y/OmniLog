import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a default Household
  const household = await prisma.household.create({
    data: {
      id: 'household-1',
      name: 'The Smiths',
      subscription_tier: 'FREE',
    },
  });

  // Create a default User
  const user = await prisma.user.create({
    data: {
      id: 'user-1',
      name: 'Ravi',
      email: 'ravi@example.com',
      role: 'ADMIN',
      household_id: household.id,
      ai_credits: 100,
    },
  });

  // Create some initial inventory
  await prisma.inventory.createMany({
    data: [
      {
        household_id: household.id,
        item_name: 'Milk',
        quantity: 2.0,
        unit: 'Liters',
        category: 'Groceries',
      },
      {
        household_id: household.id,
        item_name: 'Rice',
        quantity: 5.0,
        unit: 'kg',
        category: 'Pantry',
      },
    ],
  });

  // Create an initial expense
  await prisma.expense.create({
    data: {
      household_id: household.id,
      user_id: user.id,
      amount: 50.0,
      category: 'Utilities',
      description: 'Water Delivery',
    },
  });

  // Create an initial diet log
  await prisma.dietLog.create({
    data: {
      user_id: user.id,
      meal_name: 'Chicken Salad',
      calories: 450,
      macros: JSON.stringify({ protein: 40, carbs: 15, fat: 20 }),
    },
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
