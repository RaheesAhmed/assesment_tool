"use client"
import { useState } from 'react';
import { FaBars, FaTimes,FaLock } from 'react-icons/fa';

const Header = ({ toolName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-slate-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-2xl font-bold">{toolName}</a>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </div>
        <nav className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'} absolute md:relative  left-0 w-full md:w-auto bg-slate-950 md:bg-transparent`}>
          <a href="#features" className="block px-3 py-2 md:inline md:py-0">Features</a>
          <a href="#framework" className="block px-3 py-2 md:inline md:py-0">Framework</a>
          <a href="/plan" className="block px-3 py-2 md:inline md:py-0">Assesment</a>
          {/* <button className='flex items-center p-1 space-x-2 bg-white text-black py-2 px-3  text-lg font-semibold shadow-lg hover:bg-gray-100 transition duration-300'>
  <FaLock className="text-xl" />
  <span>Login</span>
</button> */}



        </nav>
      </div>
    </header>
  );
}

export default Header;
