'use client';

import { useEffect, useState } from 'react';
import { AdMob, AdOptions, RewardAdOptions, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Capacitor } from '@capacitor/core';

const adUnitId = 'ca-app-pub-2164351463758055/5603368742';

export default function RewardedAdCard() {
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);
  const { toast } = useToast();

  const options: RewardAdOptions = {
    adId: adUnitId,
  };

  const initializeAds = async () => {
    if (!Capacitor.isNativePlatform()) {
      console.log('AdMob not available on web.');
      return;
    }
    await AdMob.initialize({});
    AdMob.addListener(RewardAdPluginEvents.Loaded, () => {
      setIsAdReady(true);
      setIsAdLoading(false);
    });
    AdMob.addListener(RewardAdPluginEvents.FailedToLoad, () => {
      setIsAdLoading(false);
       toast({
        title: 'Ad Failed to Load',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    });
     AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
      console.log('Reward info:', reward);
      toast({
        title: 'Reward Granted!',
        description: `You earned ${reward.amount} ${reward.type}!`,
      });
    });
  };

  const loadAd = async () => {
    if (!Capacitor.isNativePlatform()) return;
    setIsAdLoading(true);
    await AdMob.prepareRewardVideoAd(options);
  };

  const showAd = async () => {
     if (!Capacitor.isNativePlatform()) return;
    if (isAdReady) {
      await AdMob.showRewardVideoAd();
      setIsAdReady(false); // Ad must be reloaded
    } else {
      loadAd(); // Preload if not ready
       toast({
        title: 'Ad Not Ready',
        description: 'The ad is still loading, please wait a moment.',
      });
    }
  };
  
  // Initialize on component mount
  useEffect(() => {
    initializeAds();
  }, []);

  // Pre-load an ad when the component mounts
  useEffect(() => {
    loadAd();
  }, []);

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
          disabled={isAdLoading}
        >
          {isAdLoading ? 'Loading Ad...' : 'Watch Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
