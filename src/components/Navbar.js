// components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Golden Bear English School</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 text-white">Home</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500">Cursos</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500">Materiais</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500">Sobre</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-500">Contato</a>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-white hover:text-gray-200 focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;