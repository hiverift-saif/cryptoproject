import React from 'react';
import HeroSection from '../Homepage/HeroSection';
import FeaturesSection from '../Homepage/FeaturesSection';
import WhyUsSection from '../Homepage/WhyUsSection';
import HowItWorksAndTrusted from '../Homepage/HowItWorksAndTrusted';
import TradeMarkets from '../Homepage/TradeMarkets';
import ServicesSection from '../Homepage/ServicesSection';
import Chouseus from '../Homepage/Chouseus';
import DownloadAccessibility from '../Homepage/DownloadAccessibility';
import Work from '../Homepage/Work';
import Faq from '../Homepage/Faq';
// import Earnsection from '../Homepage/Earnsection'; // Filhal unused hai
// import TradingFeatures from '../Homepage/TradingFeatures'; // Filhal unused hai

const Home = () => {
  return (
    <div className="">
      
      <HeroSection />

      <Chouseus />
            <DownloadAccessibility />
            <Work />
      
      <TradeMarkets />
      <Faq />
      
      {/* <FeaturesSection /> */}
      
      {/* <WhyUsSection /> */}
      
      {/* <HowItWorksAndTrusted /> */}

      
      {/* <ServicesSection /> */}

      {/* --- Future Use --- */}
      {/* <Earnsection /> */}
      {/* <TradingFeatures /> */}
      
    </div>
  );
};

export default Home;