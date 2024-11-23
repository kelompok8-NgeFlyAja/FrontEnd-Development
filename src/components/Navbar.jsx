import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto py-4">
        <div>
          <img src="/logo.svg" alt="Tiketku Logo" className="h-8" />
        </div>
        {/* Search Input */}
        <div className="w-1/2 ml-8">
          <Input
            placeholder="Cari di sini ..."
            className="w-full rounded-lg border-gray-300"
          />
        </div>

        {/* Button Masuk */}
        <Button className="bg-purple-700 text-white hover:bg-purple-800">
          <span className="mr-2">🔑</span> Masuk
        </Button>
      </div>
    </nav>
  );
}
