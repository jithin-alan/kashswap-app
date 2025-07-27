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
  // Mock data has been cleared for production readiness.
  // In a real application, this would fetch from a backend API.
];

export function getOffers(userId: string): Offer[] {
  console.log(`Getting offers for user: ${userId}`);
  // This function is ready to be connected to a live offer-providing service.
  // Currently returns an empty array as placeholders are used in the UI.
  return [];
}
