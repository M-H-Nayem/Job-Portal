// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
