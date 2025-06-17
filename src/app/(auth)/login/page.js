'use client';

import Image from "next/image";
import Link from "next/link";
import logo from '@/public/Logo.png';
import { useState } from "react";
import { userAuth } from "context/AuthContext";
import MainBackground from "@/ui/MainBackground";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const { signIn } = userAuth();

  const validateParams = () => {
    if (email == "" || password == "") {
        return  {valid: false, reason: "Missing fields" };
    }

    return { valid: true, reason: null }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
        const { valid, reason } = validateParams();
        if (!valid) {
            throw new Error(reason);
        }
        
        const result = await signIn(email, password);
        if (!result.success) {
            throw result.error;
        }
        router.push("/dashboard");
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
            
            {loading ? <Spinner /> : 
                <form onSubmit={handleSignIn}>
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
                    </div>
                
                    <div className="flex flex-col items-center justify-center mt-5 space-y-2">
                        <button type="submit" disabled={loading} className="px-6 py-3 rounded-full border-2 border-gray-500 shadow-md text-[#1d2951] bg-gray-400 text-lg hover:bg-green-50 cursor-pointer active:scale-95 transition">Login</button>
                        <div className="flex items-center justify-center space-x-3 text-[#1d2951]">
                        <Link href={"/signup"}>Create Account</Link>
                        <p>|</p>
                        <a>Forget Password</a>
                        </div>
                    </div>

                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </form>
            }
        </div>
    </MainBackground>
  );
}
