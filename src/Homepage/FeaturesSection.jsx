import React from "react";
import { Sparkles, TrendingUp, Shield, Zap, DollarSign, Layers } from "lucide-react";

const FeaturesSection = () => {
  return (
    // Only bg-black, no other patterns
    <section className="w-full bg-black py-10 px-4 relative overflow-hidden">
      
      {/* --- Content Container --- */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
        <div className="py-5">
            <span className="text-[#ff8516] font-semibold tracking-wider text-sm md:text-6xl uppercase ">Why Choose Us </span>
        </div>

          <div className="">
          <h2 className="text-4xl md:text-5xl font-bold text-[#eceae9] mt-3 mb-4 font-nunito-custom">
            Trading conditions <br />
            <span className="text-gray-500 font-nunito-custom">you can't refuse.</span>
          </h2>
          </div>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

          {/* 1. BIG CARD */}
          <div className="col-span-1 md:col-span-4 bg-[#1b1817] border border-[#2e2724] rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#ff8516]/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#ff8516]/20 p-2 rounded-lg text-[#ff8516]">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl text-[#a1a1aa] font-medium">Practice for Free</h3>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-7xl font-bold text-white group-hover:text-[#ff8516] transition-colors duration-300">
                  $50,000
                </span>
              </div>
              <p className="text-[#a1a1aa] mt-4 max-w-md text-lg">
                Refillable demo currency. Test your strategies risk-free before entering the real market.
              </p>
            </div>
          </div>

          {/* 2. TALL CARD */}
          <div className="col-span-1 md:col-span-2 bg-[#1b1817] border border-[#2e2724] rounded-3xl p-8 flex flex-col justify-between group hover:border-[#ff8516]/50 transition-all duration-300">
             <div>
                <div className="bg-green-500/10 w-fit p-3 rounded-xl mb-6">
                   <DollarSign className="text-green-500" size={28} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">$5</h3>
                <p className="text-[#a1a1aa] font-medium">Minimum Deposit</p>
             </div>
             <p className="text-sm text-gray-500 mt-4">Start small and grow your portfolio at your own pace.</p>
          </div>

          {/* 3. SQUARE CARD */}
          <div className="col-span-1 md:col-span-2 bg-[#1b1817] border border-[#2e2724] rounded-3xl p-8 group hover:border-[#ff8516]/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
               <TrendingUp className="text-blue-500" size={32} />
               <span className="bg-[#26211f] text-xs text-white px-3 py-1 rounded-full border border-[#38312e]">Low Entry</span>
            </div>
            <h3 className="text-5xl font-bold text-white mb-2">$1</h3>
            <p className="text-[#a1a1aa]">Minimum Trade Size</p>
          </div>

          {/* 4. SQUARE CARD */}
          <div className="col-span-1 md:col-span-2 bg-[#1b1817] border border-[#2e2724] rounded-3xl p-8 group hover:border-[#ff8516]/50 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
               <Layers className="text-purple-500" size={32} />
               <span className="bg-[#26211f] text-xs text-white px-3 py-1 rounded-full border border-[#38312e]">Diversity</span>
            </div>
            <h3 className="text-5xl font-bold text-white mb-2">100+</h3>
            <p className="text-[#a1a1aa]">Trading Assets</p>
          </div>

          {/* 5. WIDE CARD */}
          <div className="col-span-1 md:col-span-2 bg-[#1b1817] border border-[#2e2724] rounded-3xl p-8 flex flex-col justify-center group hover:border-[#ff8516]/50 transition-all duration-300 relative overflow-hidden">
             <div className="flex items-center gap-4 mb-4">
               <Shield className="text-[#ff8516]" size={28} />
               <h3 className="text-xl text-white font-bold">0% Commission</h3>
             </div>
             <div className="h-px w-full bg-[#2e2724] my-4"></div>
             <div className="flex items-center gap-4">
               <Zap className="text-[#ff8516]" size={28} />
               <h3 className="text-xl text-white font-bold">Instant Withdrawals</h3>
             </div>
          </div>

        </div>
        
        {/* Bottom Tagline */}
        <div className="text-center mt-12">
            <p className="text-sm text-[#555] font-mono">
                *Trading involves risk. Read full terms & conditions.
            </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;