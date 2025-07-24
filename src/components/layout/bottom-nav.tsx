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
  { id: 'points', label: 'Points', icon: Coins },
] as const;

export default function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-lg border-t">
      <nav className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground w-1/4 h-full transition-colors duration-200 ease-in-out',
                'hover:text-primary',
                isActive && 'text-primary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
