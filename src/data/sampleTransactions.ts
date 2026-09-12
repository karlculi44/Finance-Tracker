import type {
  Transaction,
  TransactionCategory,
  TransactionFilterType,
} from "../types/Transaction";

const descriptions = [
  "Monthly Salary",
  "Groceries",
  "Gasoline",
  "Internet Bill",
  "Coffee",
  "Freelance Project",
  "Restaurant Dinner",
  "Gym Membership",
  "Electricity Bill",
  "Online Course",
  "New Clothes",
  "Weekend Trip",
  "Doctor Consultation",
  "Mobile Load",
  "Movie Night",
  "Home Supplies",
  "Transportation",
  "Pharmacy",
  "Streaming Subscription",
  "Client Payment",
] as const;

const categories: TransactionCategory[] = [
  "Salary",
  "Food",
  "Transportation",
  "Bills",
  "Food",
  "Other",
  "Food",
  "Health",
  "Bills",
  "Education",
  "Shopping",
  "Travel",
  "Health",
  "Bills",
  "Entertainment",
  "Shopping",
  "Transportation",
  "Health",
  "Entertainment",
  "Other",
];

const amounts = [
  25000, 2850, 1500, 1699, 180, 5000, 850, 1200, 2180, 1500, 2200, 3500, 800,
  500, 700, 1350, 1200, 650, 450, 4200,
];

const incomeIndexes = new Set([0, 5, 19]);

function createMonthlyTransactions(monthOffset: number, currentDate: Date) {
  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - monthOffset,
    1,
  );
  const daysAvailable =
    monthOffset === 0
      ? Math.max(1, currentDate.getDate())
      : new Date(
          monthStart.getFullYear(),
          monthStart.getMonth() + 1,
          0,
        ).getDate();

  return descriptions.map((description, index): Transaction => {
    const day =
      monthOffset === 0
        ? 1 + (index % daysAvailable)
        : 1 + (index % Math.min(daysAvailable, 20));
    const type: TransactionFilterType = incomeIndexes.has(index)
      ? "Income"
      : "Expense";

    return {
      id: `sample-${monthOffset + 1}-${index + 1}`,
      description,
      amount: amounts[index],
      type,
      category: categories[index],
      date: new Date(
        monthStart.getFullYear(),
        monthStart.getMonth(),
        day,
        9 + (index % 8),
        (index * 7) % 60,
      ),
    };
  });
}

export const sampleTransactions: Transaction[] = [
  ...createMonthlyTransactions(0, new Date()),
  ...createMonthlyTransactions(1, new Date()),
  ...createMonthlyTransactions(2, new Date()),
];
