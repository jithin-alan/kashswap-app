/**
 * @fileOverview A flow for retrieving personalized offers for a user.
 *
 * - getOffers - A function that returns a list of offers for a given user.
 * - Offer - The type definition for an offer object.
 */
import {z} from 'zod';

const OfferSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  coins: z.number(),
  imageUrl: z.string(),
  category: z.string(),
  dataAiHint: z.string(),
});

export type Offer = z.infer<typeof OfferSchema>;

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Complete a Survey on Gaming Habits',
    description: 'Share your gaming preferences and earn coins.',
    coins: 500,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'gaming console',
    category: 'Surveys',
  },
  {
    id: '2',
    title: 'Watch a Short Video Ad',
    description: 'Watch a 30-second video to get instant rewards.',
    coins: 100,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'watching video',
    category: 'Videos',
  },
  {
    id: '3',
    title: 'Sign Up for a Free Trial',
    description: 'Try out a new streaming service for free.',
    coins: 1200,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'streaming service',
    category: 'Trials',
  },
  {
    id: '4',
    title: 'Download and Play a Mobile Game',
    description: 'Reach level 5 in the new "Galaxy Quest" game.',
    coins: 2000,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile game',
    category: 'Gaming',
  },
  {
    id: '5',
    title: 'Take a Poll on Shopping',
    description: 'Answer 5 quick questions about your shopping habits.',
    coins: 250,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'online shopping',
    category: 'Polls',
  },
  {
    id: '6',
    title: 'Refer a Friend to KashSwap',
    description: 'Invite your friends and earn coins when they sign up.',
    coins: 1500,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'referral bonus',
    category: 'Social',
  },
];

export function getOffers(userId: string): Offer[] {
  console.log(`Generating mock offers for user: ${userId}`);
  // In a real application, you would fetch this from a backend API.
  // For now, we simulate personalization by shuffling the offers.
  return [...mockOffers].sort(() => Math.random() - 0.5);
}
