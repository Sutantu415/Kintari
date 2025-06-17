'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "SupabaseClient";
import MainBackground from '@/ui/MainBackground';
import Spinner from './Spinner';


export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.replace('/login');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        router.replace('/login');
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login');
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  if (isLoading) {
    return (
        <MainBackground>
            <div className="h-full w-full flex justify-center items-center"><Spinner /></div>
        </MainBackground>
    );
  }

  return <>{children}</>;
}