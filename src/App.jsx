import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import TransactionHistory from "./pages/TransactionHistory";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes inside DashboardLayout */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="add-income" element={<AddIncome />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="transaction-history" element={<TransactionHistory />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
