import React from "react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-5 shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-wide">MyStore</h1>
      </div>

      <div className="text-sm text-gray-300 font-light tracking-wide">
        Welcome back, Admin
      </div>
    </header>
  );
}

export default Header;
