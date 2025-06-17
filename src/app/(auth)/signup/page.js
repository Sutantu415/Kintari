'use client';

import Image from "next/image";
import Link from "next/link";
import logo from '@/public/Logo.png';
import { useState } from "react";
import { userAuth } from "context/AuthContext";
import Spinner from "@/components/Spinner";
import MainBackground from "@/ui/MainBackground";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const { signUp } = userAuth();

  const validateParams = () => {
    if (email == "" || password == "") {
        return  {valid: false, reason: "Missing fields" };
    } else if (password !== confirmPassword) {
        return { valid: false, reason: "Passwords are different" };
    }

    return { valid: true, reason: null }
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const { valid, reason } = validateParams();
        if (!valid) {
            throw new Error(reason);
        }

        const result = await signUp(email, password);
        if (!result.success) {
            throw result.error;
        }
        setError("");
        setSuccess(true);
    } catch (err) {
        setError(err.message);
        console.log("error log");
    } finally {
        setLoading(false);
    }
  }
  
  return (
    <MainBackground>
        <div className="h-full flex flex-col items-center justify-center">
            <Image src={logo} alt="Logo" width={300} height={300}/>

            <h1 className="text-[80px] -mt-15 mb-5 font-bold text-[#1d2951] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] font-[\'Fredoka\',sans-serif]">Kintari</h1>

            {loading ? <Spinner /> : success ? <p className="text-[#1d2951] text-center pt-4">If this email is not already registered, you will receive a confirmation email.</p> :
                <form onSubmit={handleSignUp}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white w-md px-6 py-3 rounded-full border-2 border-green-400 shadow-md text-gray-600 placeholder-gray-400 text-lg focus:outline-none"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white w-md px-6 py-3 rounded-full border-2 border-green-400 shadow-md text-gray-600 placeholder-gray-400 text-lg focus:outline-none"
                    />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white w-md px-6 py-3 rounded-full border-2 border-green-400 shadow-md text-gray-600 placeholder-gray-400 text-lg focus:outline-none"
                    />
                </div>
            
                <div className="flex flex-col items-center justify-center mt-5 space-y-2">
                    <button type="submit" disabled={loading} className="px-6 py-3 rounded-full border-2 border-gray-500 shadow-md text-[#1d2951] bg-gray-400 text-lg hover:bg-green-50 active:scale-95 transition">Sign Up</button>
                    <div className="flex items-center justify-center space-x-3 text-[#1d2951]">
                    <Link href={"/login"}>Log In</Link>
                    <p>|</p>
                    <a>Forget Password</a>
                    </div>
                </div>
                </form>
            }
            
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
    </MainBackground>
  );
}
