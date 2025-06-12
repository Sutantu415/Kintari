'use client';

import Image from "next/image";
import logo from '@/public/Logo.png';
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-screen bg-blue-radial">
      <div className="h-full flex flex-col items-center justify-center">
        <Image src={logo} alt="Logo" width={300} height={300}/>

        <h1 className="text-[80px] -mt-15 mb-5 font-bold text-[#1d2951] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] font-[\'Fredoka\',sans-serif]">Kintari</h1>
    
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white w-md px-6 py-3 rounded-full border-2 border-green-400 shadow-md text-gray-600 placeholder-gray-400 text-lg focus:outline-none"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white w-md px-6 py-3 rounded-full border-2 border-green-400 shadow-md text-gray-600 placeholder-gray-400 text-lg focus:outline-none"
          />
        </div>
    
        <div className="flex flex-col items-center justify-center mt-5 space-y-2">
          <button className="px-6 py-3 rounded-full border-2 border-gray-500 shadow-md text-[#1d2951] bg-gray-400 text-lg hover:bg-green-50 active:scale-95 transition">Login</button>
          <div className="flex items-center justify-center space-x-3 text-[#1d2951]">
            <a>Create Account</a>
            <text>|</text>
            <a>Forget Password</a>
          </div>
        </div>
      </div>
    </div>
  );
}
