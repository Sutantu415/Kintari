'use client';

import { userAuth } from "context/AuthContext"
import MainBackground from "@/ui/MainBackground";
import Image from "next/image";
import logo from '@/public/Logo.png';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Searchbar from "@/ui/Searchbar";
import Header from "@/ui/Header";
import PrivateRoute from "@/components/PrivateRoute";

export default function Dashboard() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    

    const handleSearch = () => {
        router.push(`/search?term=${encodeURIComponent(search)}`);
    }

    return (
        <PrivateRoute>
            <MainBackground>
                <Header />
                
                <div className="h-full flex flex-col items-center justify-center">
                    <Image src={logo} alt="Logo" width={300} height={300}/>    
                    <h1 className="text-[80px] -mt-15 mb-5 font-bold text-[#1d2951] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] font-[\'Fredoka\',sans-serif]">Kintari</h1>
                    <Searchbar placeholder={"Search Story by Country or Moral"} value={search} onChange={(e) => setSearch(e.target.value)} onSubmit={handleSearch} />
                </div>
            </MainBackground>
        </PrivateRoute>
    );
}