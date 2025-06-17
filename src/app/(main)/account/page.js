'use client'

import MainBackground from "@/ui/MainBackground";
import { userAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '@/public/Logo.png';

export default function Account() {
    const router = useRouter();
    const { session, signOut } = userAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const handleBack = () => {
        router.push("/dashboard");
    };

    return (
        <MainBackground>
            <div className="relative h-full flex flex-col items-center justify-center">
                {/* Back Button in Top Left */}
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 px-4 py-2 text-green-500 border-2 border-green-400 rounded-full bg-white cursor-pointer hover:bg-green-50 shadow-md text-sm font-medium transition active:scale-95"
                >
                    ← Back
                </button>

                {/* Logo */}
                <Image src={logo} alt="Logo" width={300} height={300} />

                {/* Title */}
                <h1 className="text-[80px] -mt-15 font-bold text-[#1d2951] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] font-[\'Fredoka\',sans-serif]">
                    Account
                </h1>

                {/* Email Display */}
                <div className="text-[#1d2951] text-center pt-4">
                    {session?.user?.email ? `Logged in as: ${session.user.email}` : "You are not logged in."}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleSignOut}
                    className="mt-6 px-6 py-2 rounded-full border-2 border-green-400 bg-white text-green-500 text-lg font-medium shadow-md hover:shadow-lg cursor-pointer hover:bg-green-50 active:scale-95 transition"
                >
                    Log Out
                </button>
            </div>
        </MainBackground>
    );
}
