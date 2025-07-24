
'use client';

import { useEffect, useState } from 'react';
import BottomNav from '@/components/layout/bottom-nav';
import Room1Screen from '@/components/screens/room1';
import Room2Screen from '@/components/screens/room2';
import OfferwallScreen from '@/components/screens/offerwall';
import CoinsScreen from '@/components/screens/coins';
import { Coins } from 'lucide-react';
import { initPushNotifications } from '@/lib/firebase';

export type Screen = 'room1' | 'room2' | 'offerwall' | 'coins';

export default function AppShell() {
  const [activeScreen, setActiveScreen] = useState<Screen>('offerwall');

  useEffect(() => {
    initPushNotifications().catch(err => console.error("Error initializing push notifications", err));
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'room1':
        return <Room1Screen />;
      case 'room2':
        return <Room2Screen />;
      case 'offerwall':
        return <OfferwallScreen />;
      case 'coins':
        return <CoinsScreen />;
      default:
        return <OfferwallScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-body text-foreground">
      <div className="relative mx-auto flex h-[100dvh] max-w-lg flex-col border-x border-neutral-200 dark:border-neutral-800 bg-background">
        <header className="flex items-center justify-between p-4 border-b shrink-0 bg-card/80 backdrop-blur-lg">
          <h1 className="text-2xl font-headline font-bold text-primary">KashSwap</h1>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1">
            <span className="font-bold text-lg text-reward">1,000,000</span>
            <Coins className="h-6 w-6 text-reward" />
          </div>
        </header>
        
        <main key={activeScreen} className="flex-1 overflow-y-auto pb-24 bg-secondary/30">
          {renderScreen()}
        </main>

        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
}

    