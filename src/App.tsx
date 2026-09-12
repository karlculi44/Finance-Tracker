import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnalyticsPage from "./pages/AnalyticsPage";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
