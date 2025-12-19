import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  Award,
  Users,
  BarChart3,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    aboutUs: [
      { label: "Terms and conditions", href: "/TermsandConditions" },
      { label: "Confidentiality Policy", href: "/Privacypolicy" },
      { label: "Bonus rules", href: "/PromoBonuses" },
      { label: "Risk statement", href: "/RiskStatement" },
      { label: "AML Policy", href: "/AMLKYCpolicy" },
      { label: "Refund Policy", href: "/RefundPolicy" },
      { label: "Blog", href: "/MaxtradingBlog" },
    ],
    accountTypes: [
      { label: "FAQ", href: "/" },
      { label: "Account types", href: "/" },
      { label: "Trading Platform", href: "/", icon: TrendingUp }, // New trading link
    ],
    advantages: [
      { label: "Contest", href: "/" },
      { label: "Giveaways", href: "/" },
      { label: "Referrals", href: "/" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/iqcentcom/", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/iqcentcom", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const stats = [
    { icon: Users, value: "2M+", label: "Active Traders" },
    { icon: Award, value: "12+", label: "Years Experience" },
    { icon: BarChart3, value: "50M+", label: "Trades Daily" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Stats Section */}
        <div className="py-8 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffae34] to-orange-600 flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#ffae34]">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-12 md:py-16">
          
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ffae34] to-orange-600 flex items-center justify-center">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ffae34] to-orange-500 bg-clip-text text-transparent">
                  ExpertOption
                </h1>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Professional trading platform with 12 years of experience launching
                successful trading careers worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:support@iqcent.com"
                className="flex items-center gap-3 text-white/60 hover:text-[#ffae34] transition-all text-sm group p-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ffae34]/20 transition-all">
                  <Mail size={16} className="group-hover:scale-110 transition-transform" />
                </div>
                <span>support@iqcent.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-white/60 hover:text-[#ffae34] transition-all text-sm group p-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ffae34]/20 transition-all">
                  <Phone size={16} className="group-hover:scale-110 transition-transform" />
                </div>
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          {/* Column 2 - About Us */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Shield size={20} className="text-[#ffae34]" />
              About Us
            </h3>
            <ul className="space-y-3">
              {footerLinks.aboutUs.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-all text-sm hover:translate-x-2 inline-block duration-200 relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffae34] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Account Types */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Account Types
            </h3>
            <ul className="space-y-3">
              {footerLinks.accountTypes.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-all text-sm hover:translate-x-2 inline-flex items-center gap-2 duration-200 relative group"
                  >
                    {link.icon && <link.icon size={16} className="text-[#ffae34]" />}
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffae34] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Advantages */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              Advantages
            </h3>
            <ul className="space-y-3">
              {footerLinks.advantages.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-all text-sm hover:translate-x-2 inline-block duration-200 relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffae34] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="text-white/50 text-sm text-center md:text-left">
            <p className="font-semibold text-white/70">© 2025 Wave Makers LTD</p>
            <p className="text-xs mt-1 max-w-md">
              Registration number: 103581, Trust Company Complex, Ajeltake Road,
              Ajeltake Island, Majuro, Marshall Islands MH96960
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-gradient-to-br hover:from-[#ffae34] hover:to-orange-600 border border-white/10 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Icon
                    size={18}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;