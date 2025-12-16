import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    aboutUs: [
      { label: "Terms and conditions", href: "/TermsandConditions" }, // Updated
      { label: "Confidentiality Policy", href: "/Privacypolicy" },    // Updated
      { label: "Bonus rules", href: "/PromoBonuses" },                  // Updated
      { label: "Risk statement", href: "/RiskStatement" },            // Updated
      { label: "AML Policy", href: "/AMLKYCpolicy" },                 // Updated
      { label: "Refund Policy", href: "/RefundPolicy" },              // Updated
      { label: "Blog", href: "/MaxtradingBlog" },                     // Updated
    ],
    accountTypes: [
      { label: "FAQ", href: "/" },                                 // Updated
      { label: "Account types", href: "/" },              // Updated
    ],
    advantages: [
      { label: "Contest", href: "/" },                         // Updated
      { label: "Giveaways", href: "/" },                     // Updated
      { label: "Referrals", href: "/" },                      // Updated
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/iqcentcom/", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/iqcentcom", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-black text-white">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Column 1 */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h1 className="text-xl font-bold mb-2">ExpertOption</h1>
              <p className="text-white/60 text-sm leading-relaxed">
                Professional trading platform with 12 years of experience launching
                successful trading careers worldwide.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:support@iqcent.com"
                className="flex items-center gap-2 text-white/60 hover:text-[#ffae34] transition-colors text-sm group"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                <span>support@iqcent.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-white/60 hover:text-[#ffae34] transition-colors text-sm group"
              >
                <Phone size={16} className="group-hover:scale-110 transition-transform" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[#ffae34] font-bold text-lg mb-6 flex items-center gap-2">
              <Shield size={20} />
              About Us
            </h3>
            <ul className="space-y-3">
              {footerLinks.aboutUs.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[#ffae34] font-bold text-lg mb-6">
              Account Types
            </h3>
            <ul className="space-y-3">
              {footerLinks.accountTypes.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-[#ffae34] font-bold text-lg mb-6">
              Advantages
            </h3>
            <ul className="space-y-3">
              {footerLinks.advantages.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#ffae34] transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/50 text-sm text-center md:text-left">
            <p>© 2025 Wave Makers LTD</p>
            <p className="text-xs mt-1">
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
                  className="group w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#ffae34] border border-white/10 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Icon
                    size={18}
                    className="text-white/70 group-hover:text-black transition-colors"
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