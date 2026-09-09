import { Banknote, Car, ShoppingBag, Utensils, Wifi } from "lucide-react";
import TransactionItem from "./TransactionItem";

const TransactionListData = [
  {
    icon: <Utensils size={18} />,
    iconTone: "bg-orange-50 text-orange-500",
    title: "Lunch",
    category: "Food",
    date: "September 9, 2026",
    amount: -250.0,
    positive: false,
  },
  {
    icon: <Car size={18} />,
    iconTone: "bg-sky-50 text-sky-600",
    title: "Grab",
    category: "Transportation",
    date: "September 8, 2026",
    amount: -180.0,
    positive: false,
  },
  {
    icon: <Banknote size={18} />,
    iconTone: "bg-emerald-50 text-emerald-600",
    title: "Monthly Salary",
    category: "Income",
    date: "September 1, 2026",
    amount: 25000.0,
    positive: true,
  },
  {
    icon: <ShoppingBag size={18} />,
    iconTone: "bg-violet-50 text-violet-500",
    title: "New Clothes",
    category: "Shopping",
    date: "September 3, 2026",
    amount: -1200.0,
    positive: false,
  },
  {
    icon: <Wifi size={18} />,
    iconTone: "bg-amber-50 text-amber-600",
    title: "Internet Bill",
    category: "Bills",
    date: "September 2, 2026",
    amount: -1500.0,
    positive: false,
  },
];

function TransactionList() {
  return (
    <div className="mt-2">
      {TransactionListData.map((transaction, index) => (
        <TransactionItem key={index} {...transaction} />
      ))}
    </div>
  );
}

export default TransactionList;
