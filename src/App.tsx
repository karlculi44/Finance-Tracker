import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnalyticsPage from "./pages/AnalyticsPage";
import GettingStarted from "./pages/GettingStarted";
import Home from "./pages/Home";
import TransactionsPage from "./pages/TransactionsPage";
import MainLayout from "./layout/MainLayout";
import SettingsPage from "./pages/SettingsPage";
import { hasCompletedSetup } from "./utils/onboardingStorage";
import { useState } from "react";

function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(hasCompletedSetup);

  return (
    <BrowserRouter>
      {isSetupComplete ? (
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path="*"
            element={
              <GettingStarted onComplete={() => setIsSetupComplete(true)} />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
