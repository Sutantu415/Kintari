'use client';

import { useRouter } from "next/navigation";
import profile from '@/public/Profile.png';
import Image from "next/image";

export default function Header() {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push("/account");
    }

    return (
        <div className="w-full absolute top-0 flex justify-center">
                <div className="flex-1" />
                <div className="p-4">
                    <button onClick={handleProfileClick} className="items-center space-x-2 bg-white text-green-500 font-bold text-lg rounded-full pr-4 pl-2 py-[2px] border-2 border-green-400 shadow-md cursor-pointer hover:shadow-lg transition duration-200"><Image className="inline-block" src={profile} alt="profile" width={25} height={25}/>&nbsp;Profile</button>
                </div>
        </div>
    );
};