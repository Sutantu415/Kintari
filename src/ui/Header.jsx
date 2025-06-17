'use client';

import { userAuth } from "context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
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

    return (
        <div className="w-full absolute top-0 flex justify-center">
                <div className="flex-1" />

                <div className="flex justify-center">
                    <div className="flex-1" />
                    <div className="p-4">
                        <button onClick={handleSignOut} className="px-6 py-3 rounded-full border-2 border-gray-500 shadow-md text-[#1d2951] bg-gray-400 text-lg hover:bg-green-50 active:scale-95 transition">Log Out</button>
                    </div>
                </div>

                <div className="p-4">
                    <p className="justify-self-center self-center text-[#1d2951] text-center">
                        {session?.user?.email ? "Logged in as: " + session.user.email : ""}
                    </p>
                </div>
        </div>
    );
};