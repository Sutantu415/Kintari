import { Suspense } from 'react';
import SearchClient from './SearchClient';
import Header from '@/ui/Header';
import MainBackground from '@/ui/MainBackground';

export default function SearchPage() {
  return (
    <MainBackground>
      <Header />
      <Suspense fallback={<div className="flex-1" />}>
        <SearchClient />
      </Suspense>
    </MainBackground>
  );
}
