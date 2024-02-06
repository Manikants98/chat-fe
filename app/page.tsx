'use client';
import { useRouter } from 'next/navigation';
import { Construction } from '@mui/icons-material';
import { useEffect } from 'react';

export default function Home() {
  const navigator = useRouter();

  useEffect(() => {
    setTimeout(() => {
      navigator.push('/auth/signup');
    }, 5000);
  }, []);
  return (
    <div className="flex w-full dark:bg-black text-yellow-500 pb-8 dark:text-yellow-700 flex-col min-h-screen justify-between items-center">
      <div className="flex flex-col items-center justify-center h-96">
        <Construction className="text-7xl animate-pulse duration-1000" />
        <p className="text-4xl font-bold animate-pulse duration-1000">
          Contruction
        </p>
      </div>
      <p className="text-xs animate-pulse duration-1000">Powerd by MKX</p>
    </div>
  );
}
