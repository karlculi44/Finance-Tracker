import { useOutletContext } from "react-router-dom";
import FinancialOverview from "../components/FinancialOverview";
import QuickInsight from "../components/QuickInsight";
import RecentTransactions from "../components/RecentTransactions";
import SummaryCards from "../components/SummaryCards";
import type { AppOutletContext } from "../layout/MainLayout";

function Home() {
  const {
    balance,
    dateRange,
    filteredExpenses,
    filteredIncome,
    filteredTransactions,
    remainingBarWidth,
    remainingPercentage,
    transactions,
  } = useOutletContext<AppOutletContext>();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <SummaryCards
            balance={balance}
            totalIncome={filteredIncome}
            totalExpenses={filteredExpenses}
            dateRange={dateRange}
          />

          <FinancialOverview
            transactions={filteredTransactions}
            dateRange={dateRange}
          />
        </div>
        <QuickInsight
          remainingPercentage={remainingPercentage}
          remainingBarWidth={remainingBarWidth}
        />
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
}

export default Home;
