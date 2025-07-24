'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Gift, LayoutGrid, Layers, Coins } from 'lucide-react';
import type { Screen } from './app-shell';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: Dispatch<SetStateAction<Screen>>;
}

const navItems = [
  { id: 'room1', label: 'Room 1', icon: LayoutGrid },
  { id: 'room2', label: 'Room 2', icon: Layers },
  { id: 'offerwall', label: 'Offers', icon: Gift },
  { id: 'coins', label: 'Coins', icon: Coins },
] as const;

export default function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-lg border-t shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <nav className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground w-20 h-16 rounded-lg transition-all duration-300 ease-in-out transform',
                'hover:bg-primary/10 hover:text-primary',
                isActive && 'bg-primary/10 text-primary scale-105'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={cn("p-2 rounded-full transition-colors", isActive ? 'bg-primary/20' : 'bg-transparent')}>
                <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
