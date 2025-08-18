import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Features from "./pages/Features";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </header>

        {/* Main content with top & bottom padding to prevent overlap */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Features/>} />

            {/* <Route path="/auth" element={<AuthPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            {/* <Route path="/mentorship" element={<MentorshipPage />} /> */}
            {/* <Route path="/journal" element={<JournalPage />} /> */}
          </Routes>
        </main>
        <Chatbot />
 
          <Footer/>
       

      </div>
    </Router>
  );
}

export default App;
