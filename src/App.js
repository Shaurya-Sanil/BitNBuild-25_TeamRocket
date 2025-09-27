import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ProjectMarketplace from './components/ProjectMarketplace';
import Chat from './components/Chat';
import Portfolio from './components/Portfolio';
import PaymentEscrow from './components/PaymentEscrow';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: 'Alex Chen',
    role: 'student',
    university: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    reputation: 4.8,
    completedProjects: 12,
    totalEarnings: 2450
  });

  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header user={user} />
        <main style={{ paddingTop: '80px', flex: '1' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/marketplace" element={<ProjectMarketplace user={user} />} />
            <Route path="/chat" element={<Chat user={user} />} />
            <Route path="/portfolio" element={<Portfolio user={user} />} />
            <Route path="/payments" element={<PaymentEscrow user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

