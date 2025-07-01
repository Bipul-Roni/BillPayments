import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 p-6 md:p-10 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-1">BillEase Hub</h2>
          <p className="text-sm text-gray-400">
            Making bill payments smoother since 2025.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © {new Date().getFullYear()} BillEase Hub. All rights reserved.
          </p>
        </div>

        {/* Links or Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
