import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

// --- Import All Pages ---
import IntegratedLearningTools from "./ReadMore/IntegratedLearningTools";
import PlatformDesigned from "./ReadMore/PlatformDesigned";
import SeamlessTrading from "./ReadMore/SeamlessTrading";
import SmartAccount from "./ReadMore/SmartAccount";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Freedemo from "./Components/Freedemo";
import Quickstart from "./Components/Quickstart";
import Education from "./Components/Education";
import PromoBonuses from "./WhyMax/PromoBonuses";
import SocialTrading from "./WhyMax/SocialTrading";
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

import Tradinginstruments from "./WhyMax/Tradinginstruments";
import RefundPolicy from "./Aboutus/RefundPolicy";

function MainLayout() {
  const location = useLocation();
  
  // Logic: Sidebar sirf tab dikhega jab hum Home path ("/") par honge
  const showSidebar = location.pathname === "/";

  return (
    // --- Main App Container (Fixed Height, No Window Scroll) ---
    <div className="flex h-screen w-full bg-[#1b1817] text-white overflow-hidden">
      
      {/* --- LEFT SIDE: Content Area --- */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* 1. Fixed Navbar */}
        <div className="flex-shrink-0 z-40 relative">
          <Navbar />
        </div>

        {/* 2. Scrollable Page Content */}
        <div className="flex-1 relative overflow-y-auto scrollbar-hide bg-black">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Read More Routes */}
            <Route path="/learning-tools" element={<IntegratedLearningTools />} />
            <Route path="/platform-designed" element={<PlatformDesigned />} />
            <Route path="/seamless-trading" element={<SeamlessTrading />} />
            <Route path="/smart-account" element={<SmartAccount />} />
            
            {/* Components Routes */}
            <Route path="/Freedemo" element={<Freedemo />} />
            <Route path="/Quickstart" element={<Quickstart/>} />
            <Route path="/Education" element={<Education/>} />   
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Why Max Routes */}
            <Route path="/tradinginstruments" element={<Tradinginstruments/>} />
            <Route path="/PromoBonuses" element={<PromoBonuses/>} />
            <Route path="/SocialTrading" element={<SocialTrading />} />

            {/* About Us Routes */}
            <Route path="/AbouttheCompany" element={<AbouttheCompany />} />
            <Route path="/MaxtradingBlog" element={<MaxtradingBlog />} />
            <Route path="/Contacts" element={<Contacts />} />
            <Route path="/Reviews" element={<Reviews />} />
            <Route path="/SupportService" element={<SupportService />} />
            <Route path="/TermsandConditions" element={<TermsConditions />} />
            <Route path="/AMLKYCpolicy" element={<AMLKYCpolicy />} />
            <Route path="/Privacypolicy" element={<Privacypolicy />} />
            <Route path="/Paymentpolicy" element={<Paymentpolicy />} />
            <Route path="/Informationdisclosure" element={<Informationdisclosure />} />
            <Route path="/RiskStatement" element={<RiskStatement />} />
            <Route path="/RefundPolicy" element={<RefundPolicy />} />
            


          </Routes>

          {/* Footer at the bottom of content */}
          <Footer />
        </div>
        
      </div>

      {/* --- RIGHT SIDE: Fixed Sidebar (Conditionally Rendered) --- */}
      {showSidebar && (
        <div className="hidden lg:flex w-80 h-full flex-shrink-0 z-50 border-l border-gray-800">
          <Sidebar />
        </div>
      )}

    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;