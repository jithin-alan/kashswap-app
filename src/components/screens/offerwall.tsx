'use client';

import { useEffect, useState } from 'react';
import type { Offer } from '@/ai/flows/offers';
import { getOffers } from '@/ai/flows/offers';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import RewardedAdCard from '../ads/rewarded-ad-card';

function OfferCard({ offer }: { offer: Offer }) {
  const { toast } = useToast();
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={offer.imageUrl}
            alt={offer.title}
            fill
            className="object-cover"
            data-ai-hint={offer.dataAiHint}
          />
        </div>
        <div className="p-4">
          <Badge variant="secondary" className="mb-2">{offer.category}</Badge>
          <CardTitle className="font-headline text-lg">{offer.title}</CardTitle>
          <CardDescription className="mt-1">{offer.description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
        <div className="font-bold text-lg text-reward flex items-center gap-1">
          <span>{offer.coins}</span>
          <span className="text-sm">coins</span>
        </div>
        <Button 
          className="bg-cta hover:bg-cta/90 text-white"
          onClick={() => {
            toast({
              title: "Offer Accepted!",
              description: `You are now completing: "${offer.title}"`,
            });
          }}
        >
          Start Now
        </Button>
      </CardFooter>
    </Card>
  );
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
      <CardFooter className="bg-secondary/50 p-4 flex justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-1/3" />
      </CardFooter>
    </Card>
  );
}

export default function OfferwallScreen() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      try {
        // We will remove one mock offer to make space for the ad card
        const offersResult = await getOffers('user123').slice(1);
        setOffers(offersResult);
      } catch (error) {
        console.error('Failed to fetch offers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {isLoading && (
        <>
          <OfferSkeleton />
          <OfferSkeleton />
          <OfferSkeleton />
        </>
      )}
      {!isLoading && (
        <>
          <RewardedAdCard />
          {offers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        </>
      )}
    </div>
  );
}
