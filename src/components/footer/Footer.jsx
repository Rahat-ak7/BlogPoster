import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {/* <h1 className="text-lg font-bold">Company Name</h1> */}
          <Logo />
          <p className="text-sm">© 2024 All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-gray-400 hover:text-white"
          >
            Terms of Service
          </Link>
          <Link to="/contact-us" className="text-gray-400 hover:text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
