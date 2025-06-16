'use client';

import { userAuth } from "context/AuthContext"
import MainBackground from "@/ui/MainBackground";
import Image from "next/image";
import logo from '@/public/Logo.png';
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Dashboard() {
    const router = useRouter();
    const { session, signOut } = userAuth();

    // Makeshift protection for now...
    useLayoutEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, []);
    
    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MainBackground>
            <div className="flex justify-center">
                <div className="flex-1" />
                <div className="p-4">
                    <p className="justify-self-center self-center text-[#1d2951] text-center">
                        {session?.user?.email ? "Logged in as: " + session.user.email : ""}
                    </p>
                </div>
            </div>
            
            <div className="h-full flex flex-col items-center justify-center">
                <Image src={logo} alt="Logo" width={300} height={300}/>    
                <h1 className="text-[80px] -mt-15 mb-5 font-bold text-[#1d2951] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] font-[\'Fredoka\',sans-serif]">Kintari</h1>
                
                <div className="flex justify-center">
                    <div className="flex-1" />
                    <div className="p-4">
                        <button onClick={handleSignOut} className="px-6 py-3 rounded-full border-2 border-gray-500 shadow-md text-[#1d2951] bg-gray-400 text-lg hover:bg-green-50 active:scale-95 transition">Log Out</button>
                    </div>
                </div>
            </div>
        </MainBackground>
    );
}