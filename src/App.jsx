import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- Layout & Main Components ---
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

// --- Auth Components ---
import Login from "./Components/Login";
import Signup from "./Components/Signup";

// --- Trading Feature ---
import TradingDashboard from "./chart/TradingDashboard";

// --- Feature Pages ---
import IntegratedLearningTools from "./ReadMore/IntegratedLearningTools";
import PlatformDesigned from "./ReadMore/PlatformDesigned";
import SeamlessTrading from "./ReadMore/SeamlessTrading";
import SmartAccount from "./ReadMore/SmartAccount";

// --- Education & Tools ---
import Freedemo from "./Components/Freedemo";
import Quickstart from "./Components/Quickstart";
import Education from "./Components/Education";
import Tradinginstruments from "./WhyMax/Tradinginstruments";
import PromoBonuses from "./WhyMax/PromoBonuses";
import SocialTrading from "./WhyMax/SocialTrading";

// --- About & Legal Pages ---
import AbouttheCompany from "./Aboutus/AbouttheCompany";
import MaxtradingBlog from "./Aboutus/MaxtradingBlog";
import Contacts from "./Aboutus/Contacts";
import Reviews from "./Aboutus/Reviews";
import SupportService from "./Aboutus/SupportService";
import TermsConditions from "./Aboutus/TermsConditions";
import AMLKYCpolicy from "./Aboutus/AMLKYCpolicy";
import Privacypolicy from "./Aboutus/Privacypolicy";
import Paymentpolicy from "./Aboutus/Paymentpolicy";
import Informationdisclosure from "./Aboutus/Informationdisclosure";
import RiskStatement from "./Aboutus/RiskStatement";
import RefundPolicy from "./Aboutus/RefundPolicy";

function MainLayout() {
  const location = useLocation();

  // Logic to determine layout visibility
  const isHomePage = location.pathname === "/";
  const isTradingPage = location.pathname.toLowerCase().startsWith("/trading");

  return (
    <div className="flex h-screen w-full bg-[#1b1817] text-white overflow-hidden">
      
      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* 1. Navbar: Sirf tab dikhega jab trading page NA HO */}
        {!isTradingPage && (
          <div className="flex-shrink-0 z-40 relative">
            <Navbar />
          </div>
        )}

        {/* 2. Routes Container */}
        <div className={`flex-1 relative overflow-y-auto ${isTradingPage ? 'bg-[#1b1817]' : 'bg-black'}`}>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/trading" element={<TradingDashboard />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Features & Read More */}
            <Route path="/learning-tools" element={<IntegratedLearningTools />} />
            <Route path="/platform-designed" element={<PlatformDesigned />} />
            <Route path="/seamless-trading" element={<SeamlessTrading />} />
            <Route path="/smart-account" element={<SmartAccount />} />
            <Route path="/freedemo" element={<Freedemo />} />
            <Route path="/quickstart" element={<Quickstart/>} />
            <Route path="/education" element={<Education/>} /> 

            {/* Why Max */}
            <Route path="/tradinginstruments" element={<Tradinginstruments/>} />
            <Route path="/promobonuses" element={<PromoBonuses/>} />
            <Route path="/socialtrading" element={<SocialTrading />} />

            {/* About & Legal */}
            <Route path="/aboutthecompany" element={<AbouttheCompany />} />
            <Route path="/maxtradingblog" element={<MaxtradingBlog />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/supportservice" element={<SupportService />} />
            <Route path="/termsandconditions" element={<TermsConditions />} />
            <Route path="/amlkycpolicy" element={<AMLKYCpolicy />} />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route path="/paymentpolicy" element={<Paymentpolicy />} />
            <Route path="/informationdisclosure" element={<Informationdisclosure />} />
            <Route path="/riskstatement" element={<RiskStatement />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
          </Routes>

          {/* 3. Footer: Sirf tab dikhega jab trading page NA HO */}
          {!isTradingPage && <Footer />}
        </div>
      </div>

      {/* --- RIGHT SIDEBAR: Sirf Home page par dikhega --- */}
      {isHomePage && (
        <div className="hidden lg:flex w-80 h-full flex-shrink-0 z-50 border-l border-gray-800">
          <Sidebar />
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}