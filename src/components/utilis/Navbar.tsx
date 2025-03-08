import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            Qr<span className="text-white">Z</span>en
          </a>

          <a
            href="/qrgeneration"
            className="hidden md:block bg-purple-600 dark:bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-400 transition"
          >
            Generate
          </a>

          <button
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/70 dark:bg-gray-900/50 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="flex flex-col items-center">
            <a
              href="#"
              className="bg-purple-600 dark:bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-400 transition"
            >
              Generate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
