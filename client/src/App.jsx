import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Features from "./pages/Features";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SignUpPage";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </header>
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth" || location.pathname === "/signup";

  return (
    <Routes>
      {isAuthPage ? (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          {/* Add other routes inside Layout as needed */}
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
