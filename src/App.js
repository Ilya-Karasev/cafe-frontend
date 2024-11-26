import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import EditAccountPage from "./pages/EditAccountPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserAccountPage from "./pages/UserAccountPage";
//import AddDishPage from "./pages/AddDishPage";
//import EditMenuPage from "./pages/EditMenuPage";

//        <Route path="/add-dish" element={<AddDishPage />} />
//        <Route path="/edit-menu" element={<EditMenuPage />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/user-account" element={<UserAccountPage />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
