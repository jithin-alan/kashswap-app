
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import RewardedAdCard from '../ads/rewarded-ad-card';

interface OfferwallScreenProps {
  addCoins: (amount: number, description: string) => void;
}

function OfferSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
      <CardContent className="bg-secondary/50 p-4 flex justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-1/3" />
      </CardContent>
    </Card>
  );
}

export default function OfferwallScreen({ addCoins }: OfferwallScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 space-y-4">
      {isLoading && (
        <>
          <OfferSkeleton />
          <OfferSkeleton />
        </>
      )}
      {!isLoading && (
        <>
          {/* Functional Rewarded Ad Card */}
          <RewardedAdCard addCoins={addCoins} />

          {/* Placeholder for other offers */}
          <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary/50 border-dashed">
            <Sparkles className="w-16 h-16 mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold font-headline">More Offers Coming Soon!</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                We're working hard to bring you new and exciting ways to earn. Check back later!
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
