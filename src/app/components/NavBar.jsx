import Link from "next/link";
import React from "react";

function NavBar(props) {
  return (
    <nav className=" p-4 bg-gray-100">
      <ul className=" max-w-6xl mx-auto flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/services" className="text-blue-500 hover:underline">
            Services
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-blue-500 hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-blue-500 hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
