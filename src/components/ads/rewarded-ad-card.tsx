
'use client';

import { useEffect, useState } from 'react';
import { AdMob, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Capacitor } from '@capacitor/core';

interface RewardedAdCardProps {
  addCoins: (amount: number, description: string) => void;
}

const adUnitId = 'ca-app-pub-2164351463758055/5603368742';

export default function RewardedAdCard({ addCoins }: RewardedAdCardProps) {
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);
  const { toast } = useToast();

  const options: RewardAdOptions = {
    adId: adUnitId,
    isTesting: true, // Use test ads during development
  };

  const loadAd = async () => {
    if (!Capacitor.isNativePlatform() || isAdLoading || isAdReady) return;
    console.log('Preparing reward video ad...');
    setIsAdLoading(true);
    try {
      await AdMob.prepareRewardVideoAd(options);
    } catch (e) {
      console.error("Failed to prepare ad:", e);
      setIsAdLoading(false);
    }
  };

  const showAd = async () => {
    if (!Capacitor.isNativePlatform()) {
      toast({
        title: 'Ads Not Available',
        description: 'Ads can only be shown within the native mobile app.',
        variant: 'destructive',
      });
      return;
    }

    if (isAdReady) {
      console.log('Showing reward video ad...');
      await AdMob.showRewardVideoAd();
    } else if (!isAdLoading) {
      // If not ready and not currently loading, start loading.
      toast({
        title: 'Ad Not Ready',
        description: 'The ad is loading. Please try again in a moment.',
      });
      loadAd();
    } else {
       // If it is already loading, just let the user know.
       toast({
        title: 'Loading Ad',
        description: 'Please wait a moment...',
      });
    }
  };

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      console.log('AdMob not available on web.');
      return;
    }

    const initialize = async () => {
        await AdMob.initialize({});
        
        const listeners = [
            AdMob.addListener(RewardAdPluginEvents.Loaded, () => {
                console.log('Ad loaded successfully.');
                setIsAdReady(true);
                setIsAdLoading(false);
            }),
            AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (error) => {
                console.error('Ad failed to load:', error);
                setIsAdLoading(false);
                toast({
                    title: 'Ad Failed to Load',
                    description: 'Please try again later.',
                    variant: 'destructive',
                });
            }),
            AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
                console.log('Reward info:', reward);
                addCoins(reward.amount, 'Video Ad Watched');
                toast({
                    title: 'Reward Granted!',
                    description: `You earned ${reward.amount} ${reward.type}!`,
                });
            }),
            AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
                console.log('Ad dismissed. Pre-loading next ad.');
                setIsAdReady(false);
                // Pre-load the next ad
                loadAd();
            })
        ];
        
        // Initial ad load
        loadAd();

        return () => {
          listeners.forEach(listener => listener.remove());
        };
    }

    initialize();
  }, []); // Run only once on mount

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Watch an ad for a reward"
            fill
            className="object-cover"
            data-ai-hint="video reward"
          />
        </div>
        <div className="p-4">
          <Badge variant="secondary" className="mb-2">Video Ad</Badge>
          <CardTitle className="font-headline text-lg">Watch & Earn</CardTitle>
          <CardDescription className="mt-1">Watch a short video ad to earn bonus coins.</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
        <div className="font-bold text-lg text-reward flex items-center gap-1">
          <span>+500</span>
          <span className="text-sm">coins</span>
        </div>
        <Button 
          className="bg-cta hover:bg-cta/90 text-white"
          onClick={showAd}
          disabled={isAdLoading && !isAdReady}
        >
          {isAdLoading ? 'Loading Ad...' : (isAdReady ? 'Watch Now' : 'Try Again')}
        </Button>
      </CardFooter>
    </Card>
  );
}
