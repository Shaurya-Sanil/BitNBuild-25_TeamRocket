import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ProjectMarketplace from './components/ProjectMarketplace';
import Chat from './components/Chat';
import ProjectProcess from './components/ProjectProcess';
import BrowseFreelancers from './components/BrowseFreelancers';
import ClientChat from './components/ClientChat';
import Portfolio from './components/Portfolio';
import PaymentEscrow from './components/PaymentEscrow';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
// Client components
import ClientDashboard from './components/ClientDashboard';
import PostProject from './components/PostProject';
import MyProjects from './components/MyProjects';
import BidReview from './components/BidReview';
import ProjectProgress from './components/ProjectProgress';
import PaymentApproval from './components/PaymentApproval';
import ReviewRating from './components/ReviewRating';
import ClientProfile from './components/ClientProfile';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header user={user} />
        <main style={{ paddingTop: '80px', flex: '1' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
            {/* Freelancer routes */}
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/marketplace" element={<ProjectMarketplace user={user} />} />
            <Route path="/chat" element={<Chat user={user} />} />
            <Route path="/project/process" element={<ProjectProcess user={user} />} />
            <Route path="/client/chat" element={<ClientChat user={user} />} />
            <Route path="/client/browse-freelancers" element={<BrowseFreelancers user={user} />} />
            <Route path="/portfolio" element={<Portfolio user={user} />} />
            <Route path="/payments" element={<PaymentEscrow user={user} />} />
            {/* Client routes */}
            <Route path="/client/dashboard" element={<ClientDashboard user={user} />} />
            <Route path="/client/post-project" element={<PostProject user={user} />} />
            <Route path="/client/my-projects" element={<MyProjects user={user} />} />
            <Route path="/client/project/:id/bids" element={<BidReview user={user} />} />
            <Route path="/client/project/:id/progress" element={<ProjectProgress user={user} />} />
            <Route path="/client/project/:id/payment" element={<PaymentApproval user={user} />} />
            <Route path="/client/project/:id/review" element={<ReviewRating user={user} />} />
            <Route path="/client/profile" element={<ClientProfile user={user} />} />
            <Route path="/client/browse-freelancers" element={<ProjectMarketplace user={user} />} />
            <Route path="/client/view-bids" element={<BidReview user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;