import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around">
        <li><Link className="text-white text-lg hover:text-yellow-400" to="/">Home</Link></li>
        <li><Link className="text-white text-lg hover:text-yellow-400" to="/build">Build</Link></li>
        <li><Link className="text-white text-lg hover:text-yellow-400" to="/Orders">Orders</Link></li>
        <li><Link className="text-white text-lg hover:text-yellow-400" to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;