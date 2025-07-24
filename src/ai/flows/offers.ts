import { flow } from 'genkit/flow';
import { z } from 'zod';
import { ai } from '../genkit';

export const OfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  points: z.number(),
  imageUrl: z.string(),
  category: z.string(),
  dataAiHint: z.string(),
});

export type Offer = z.infer<typeof OfferSchema>;

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Complete a Survey on Gaming Habits',
    description: 'Share your gaming preferences and earn points.',
    points: 500,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'gaming console',
    category: 'Surveys',
  },
  {
    id: '2',
    title: 'Watch a Short Video Ad',
    description: 'Watch a 30-second video to get instant rewards.',
    points: 100,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'watching video',
    category: 'Videos',
  },
  {
    id: '3',
    title: 'Sign Up for a Free Trial',
    description: 'Try out a new streaming service for free.',
    points: 1200,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'streaming service',
    category: 'Trials',
  },
  {
    id: '4',
    title: 'Download and Play a Mobile Game',
    description: 'Reach level 5 in the new "Galaxy Quest" game.',
    points: 2000,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile game',
    category: 'Gaming',
  },
  {
    id: '5',
    title: 'Take a Poll on Shopping',
    description: 'Answer 5 quick questions about your shopping habits.',
    points: 250,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'online shopping',
    category: 'Polls',
  },
  {
    id: '6',
    title: 'Refer a Friend to KashFlow',
    description: 'Invite your friends and earn points when they sign up.',
    points: 1500,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'referral bonus',
    category: 'Social',
  },
];

export const getOffersFlow = flow(
  {
    name: 'getOffers',
    inputSchema: z.object({ userId: z.string() }),
    outputSchema: z.array(OfferSchema),
    authPolicy: (auth, input) => {},
  },
  async ({ userId }) => {
    // In a real application, you would use the AI to personalize offers
    // based on the userId and their interaction history.
    console.log(`Generating personalized offers for user: ${userId}`);
    
    // For this demonstration, we simulate personalization by simply shuffling the offers.
    return mockOffers.sort(() => Math.random() - 0.5);
  }
);
