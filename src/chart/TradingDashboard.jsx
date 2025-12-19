import React, { useState } from 'react';
import SidebarLeft from '../chart/SidebarLeft';
import SidebarRight from '../chart/SidebarRight';
import Header from '../chart/Header';
import ChartArea from '../chart/ChartArea';
import MobileControls from '../chart/MobileControls'; // Import new file
import { Menu, X } from 'lucide-react'; // Icons

const TradingDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // 'lg:flex-row' means desktop par row, mobile par column (default)
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#1b1817] text-gray-300 font-sans overflow-hidden fixed inset-0">
      
      {/* ---------------- MOBILE HEADER MENU OVERLAY ---------------- */}
      {/* Ye sirf mobile par dikhega jab menu open hoga */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 lg:hidden flex">
           <div className="w-64 h-full bg-[#161413] animate-slide-in">
              <div className="p-4 flex justify-between items-center border-b border-gray-800">
                 <span className="font-bold text-white">Menu</span>
                 <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
              </div>
              {/* Reuse SidebarLeft logic here or keep it simple */}
              <div className="h-full overflow-y-auto">
                 <SidebarLeft mobileMode={true} /> {/* Pass prop to adjust styling if needed */}
              </div>
           </div>
           {/* Click outside to close */}
           <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* ---------------- 1. LEFT SIDEBAR (Desktop Only) ---------------- */}
      <div className="hidden lg:block h-full">
        <SidebarLeft />
      </div>

      {/* ---------------- 2. CENTER AREA ---------------- */}
      <main className="flex-1 flex flex-col relative h-full w-full">
        
        {/* Header mein Mobile Menu Button add karein */}
        <div className="flex-shrink-0">
           {/* Hum existing header ko wrap kar rahe hain */}
           <div className="relative">
              {/* Mobile Menu Toggle (Absolute Left) */}
              <div className="lg:hidden absolute left-2 top-0 bottom-0 flex items-center z-20">
                 <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white">
                    <Menu size={24} />
                 </button>
              </div>
              
              {/* Adjust Header padding for mobile so menu button doesn't overlap logo */}
              <div className="pl-10 lg:pl-0">
                  <Header />
              </div>
           </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative w-full overflow-hidden pb-16 lg:pb-0"> 
          {/* pb-16 is padding bottom for Mobile Controls so content isn't hidden behind it */}
          <ChartArea />
        </div>
      </main>

      {/* ---------------- 3. RIGHT SIDEBAR (Desktop Only) ---------------- */}
      <div className="hidden lg:block h-full">
        <SidebarRight />
      </div>

      {/* ---------------- 4. MOBILE CONTROLS (Mobile Only) ---------------- */}
      <MobileControls />
      
    </div>
  );
};

export default TradingDashboard;