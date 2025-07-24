'use client';

import { useState } from 'react';
import BottomNav from '@/components/layout/bottom-nav';
import Room1Screen from '@/components/screens/room1';
import Room2Screen from '@/components/screens/room2';
import OfferwallScreen from '@/components/screens/offerwall';
import PointsScreen from '@/components/screens/points';

export type Screen = 'room1' | 'room2' | 'offerwall' | 'points';

export default function AppShell() {
  const [activeScreen, setActiveScreen] = useState<Screen>('offerwall');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'room1':
        return <Room1Screen />;
      case 'room2':
        return <Room2Screen />;
      case 'offerwall':
        return <OfferwallScreen />;
      case 'points':
        return <PointsScreen />;
      default:
        return <OfferwallScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-body text-foreground">
      <div className="relative mx-auto flex h-[100dvh] max-w-lg flex-col border-x border-neutral-200 dark:border-neutral-800 bg-background">
        <header className="flex items-center justify-between p-4 border-b shrink-0">
          <h1 className="text-xl font-headline font-bold text-primary">KashFlow</h1>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-reward">1,250</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-reward"><path d="M12 2L9.1 8.5 2 9.3l5.5 5-1.3 7.2L12 18l5.8 3.5-1.3-7.2L22 9.3l-7.1-.8L12 2z"/></svg>
          </div>
        </header>
        
        <main key={activeScreen} className="flex-1 overflow-y-auto pb-20 animate-in fade-in-25 duration-300">
          {renderScreen()}
        </main>

        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
}
