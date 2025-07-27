
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  totalCoins: number;
  fcmToken?: string;
  createdAt: any;
  lastUpdated: any;
}

export interface WithdrawalRequest {
  userId: string;
  name: string;
  email: string;
  amount: number;
  paymentMethod: 'upi' | 'paypal';
  paymentId: string;
  status: 'pending' | 'processing' | 'completed';
  requestedAt: any;
}

/**
 * Gets a user's profile from Firestore, creating it if it doesn't exist.
 * @param userId The user's unique ID.
 * @returns The user's profile data.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data() as UserProfile;
  } else {
    // Document doesn't exist, create it with default values
    const newUser: UserProfile = {
      uid: userId,
      totalCoins: 0, // Starting coins
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    };
    await setDoc(userDocRef, newUser);
    return newUser;
  }
};

/**
 * Updates a user's total coins in Firestore.
 * @param userId The user's unique ID.
 * @param coins The new coin total.
 */
export const updateUserCoins = async (userId: string, coins: number): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    totalCoins: coins,
    lastUpdated: serverTimestamp()
  });
};

/**
 * Updates any part of a user's profile.
 * @param userId The user's unique ID.
 * @param data The data to update.
 */
export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      ...data,
      lastUpdated: serverTimestamp()
    });
};


/**
 * Creates a new withdrawal request in Firestore.
 * @param requestData The withdrawal request data.
 */
export const createWithdrawalRequest = async (requestData: Omit<WithdrawalRequest, 'status' | 'requestedAt'>): Promise<void> => {
  const withdrawalCollectionRef = collection(db, "withdrawalRequests");
  const newRequest: Omit<WithdrawalRequest, 'requestedAt'> & { requestedAt: any } = {
    ...requestData,
    status: 'pending',
    requestedAt: serverTimestamp(),
  };
  await addDoc(withdrawalCollectionRef, newRequest);
};
