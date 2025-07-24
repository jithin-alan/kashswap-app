
'use client';

import { useEffect, useState } from 'react';
import BottomNav from '@/components/layout/bottom-nav';
import Room1Screen from '@/components/screens/room1';
import Room2Screen from '@/components/screens/room2';
import OfferwallScreen from '@/components/screens/offerwall';
import CoinsScreen from '@/components/screens/coins';
import SettingsScreen from '@/components/screens/settings';
import { Coins, Settings } from 'lucide-react';
import { initPushNotifications } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

export type Screen = 'room1' | 'room2' | 'offerwall' | 'coins' | 'settings';

export default function AppShell() {
  const [activeScreen, setActiveScreen] = useState<Screen>('offerwall');
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);

  useEffect(() => {
    initPushNotifications().catch(err => console.error("Error initializing push notifications", err));
  }, []);

  const navigateTo = (screen: Screen) => {
    if (screen !== activeScreen) {
      setPreviousScreen(activeScreen);
      setActiveScreen(screen);
    }
  };

  const goBack = () => {
    if (previousScreen) {
      setActiveScreen(previousScreen);
      setPreviousScreen(null);
    } else {
      setActiveScreen('offerwall'); // Default fallback
    }
  };
  
  const toggleSettings = () => {
    if (activeScreen === 'settings') {
      goBack();
    } else {
      navigateTo('settings');
    }
  };

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
      case 'settings':
        return <SettingsScreen />;
      default:
        return <OfferwallScreen />;
    }
  };

  const isSettingsActive = activeScreen === 'settings';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-body text-foreground">
      <div className="relative mx-auto flex h-[100dvh] max-w-lg flex-col border-x border-neutral-200 dark:border-neutral-800 bg-background">
        <header className="flex items-center justify-between p-4 border-b shrink-0 bg-card/80 backdrop-blur-lg">
          <h1 className="text-2xl font-headline font-bold text-primary">KashSwap</h1>
          
          <div className="flex items-center gap-2">
            {!isSettingsActive && (
              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1">
                <span className="font-bold text-lg text-reward">1,000,000</span>
                <Coins className="h-6 w-6 text-reward" />
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={toggleSettings}>
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </header>
        
        <main key={activeScreen} className="flex-1 overflow-y-auto pb-24 bg-secondary/30">
          {renderScreen()}
        </main>

        {!isSettingsActive && <BottomNav activeScreen={activeScreen} setActiveScreen={navigateTo} />}
      </div>
    </div>
  );
}
