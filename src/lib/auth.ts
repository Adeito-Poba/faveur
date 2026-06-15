import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';

const SUPER_ADMIN_EMAIL = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'maviedechant@gmail.com';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'user';
  subscriptionStatus: 'free' | 'premium_monthly' | 'premium_annual';
  subscriptionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  isActive: boolean;
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  await updateProfile(user, { displayName });

  // Send email verification
  await sendEmailVerification(user);

  // Create user profile in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: displayName,
    role: email === SUPER_ADMIN_EMAIL ? 'admin' : 'user',
    subscriptionStatus: 'free',
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerified: false,
    isActive: true,
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);

  return user;
}

/**
 * Sign in with email and password
 */
export async function loginUser(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign out
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Confirm password reset with code
 */
export async function resetPassword(code: string, newPassword: string): Promise<void> {
  await confirmPasswordReset(auth, code, newPassword);
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(user: User): Promise<void> {
  await sendEmailVerification(user);
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  });
}

/**
 * Update user subscription
 */
export async function updateUserSubscription(
  uid: string,
  subscriptionStatus: UserProfile['subscriptionStatus'],
  subscriptionEndDate?: Date
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    subscriptionStatus,
    subscriptionEndDate: subscriptionEndDate ? Timestamp.fromDate(subscriptionEndDate) : null,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Delete user account
 */
export async function deleteUserAccount(uid: string): Promise<void> {
  // Delete user profile from Firestore
  await deleteDoc(doc(db, 'users', uid));
  // Note: The Firebase Auth account deletion must be done from the client side
  // using deleteUser(currentUser) from firebase/auth
}

/**
 * Check if user is admin
 */
export async function isUserAdmin(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile?.role === 'admin' || false;
}

/**
 * Check if user has active premium subscription
 */
export async function hasActivePremium(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  if (!profile) return false;
  
  if (profile.subscriptionStatus === 'free') return false;
  
  if (profile.subscriptionEndDate) {
    return new Date() < new Date(profile.subscriptionEndDate);
  }
  
  return profile.subscriptionStatus !== 'free';
}