import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, LocalStore } from '../lib/storage';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface SubscriptionInfo {
  status: 'active' | 'expired' | 'trial';
  validUntil: string; // ISO date
  isBlocked: boolean;
  daysRemaining: number;
}

interface AuthContextType {
  user: UserAccount | null;
  firebaseUser: FirebaseUser | null;
  subscription: SubscriptionInfo;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  checkSubscriptionStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(LocalStore.getUser());
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Subscription state: computes remaining days and blockage
  const calculateSubscription = (validUntilIso?: string): SubscriptionInfo => {
    // Default demo: 30 days of active trial if none set yet
    let targetDate: Date;
    if (validUntilIso) {
      targetDate = new Date(validUntilIso);
    } else {
      const stored = localStorage.getItem('mapa_subscription_valid_until');
      if (stored) {
        targetDate = new Date(stored);
      } else {
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30); // 30 initial days
        localStorage.setItem('mapa_subscription_valid_until', targetDate.toISOString());
      }
    }

    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const isBlocked = daysRemaining <= 0;

    return {
      status: isBlocked ? 'expired' : 'active',
      validUntil: targetDate.toISOString(),
      isBlocked,
      daysRemaining
    };
  };

  const [subscription, setSubscription] = useState<SubscriptionInfo>(calculateSubscription());

  // Listen to Firebase Auth state
  useEffect(() => {
    let isMounted = true;

    // Safety timeout: Never leave the user stuck on loading spinner for more than 1.5 seconds if Firebase Auth is slow or offline
    const timer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 1500);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!isMounted) return;
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);
          
          let latestValidUntil: string | undefined = undefined;

          if (userSnap.exists()) {
            const data = userSnap.data();
            latestValidUntil = data.subscriptionValidUntil;

            const activeUser: UserAccount = {
              id: fbUser.uid,
              email: fbUser.email || '',
              name: data.name || fbUser.displayName || 'Responsable',
              country: data.country || 'México',
              locale: 'es-MX',
              consentAt: data.consentAt || new Date().toISOString()
            };
            setUser(activeUser);
            LocalStore.setUser(activeUser);
          }

          // Check if Hotmart Webhook stored subscription by email: subscriptions/{email}
          if (fbUser.email) {
            try {
              const emailKey = fbUser.email.toLowerCase().trim();
              const subDocRef = doc(db, 'subscriptions', emailKey);
              const subSnap = await getDoc(subDocRef);
              if (subSnap.exists()) {
                const subData = subSnap.data();
                if (subData.validUntil) {
                  const hotmartDate = new Date(subData.validUntil);
                  const currentDate = latestValidUntil ? new Date(latestValidUntil) : new Date(0);
                  if (hotmartDate > currentDate) {
                    latestValidUntil = subData.validUntil;
                    // Sync to user profile
                    await setDoc(userDocRef, { 
                      subscriptionValidUntil: latestValidUntil,
                      subscriptionStatus: 'active' 
                    }, { merge: true });
                  }
                }
              }
            } catch (subErr) {
              console.log('Subscription lookup by email note:', subErr);
            }
          }

          if (latestValidUntil) {
            const sub = calculateSubscription(latestValidUntil);
            setSubscription(sub);
          } else {
            // First time in Firestore without prior payment: initialize with 30 days trial
            const initialValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            await setDoc(userDocRef, {
              email: fbUser.email,
              name: fbUser.displayName || 'Responsable',
              subscriptionStatus: 'active',
              subscriptionValidUntil: initialValidUntil,
              createdAt: new Date().toISOString(),
              locale: 'es-MX',
              country: 'México'
            }, { merge: true });
            const sub = calculateSubscription(initialValidUntil);
            setSubscription(sub);
          }
        } catch (err) {
          console.log('Firestore read note (offline fallback):', err);
        }
      } else {
        // If not logged in with Firebase, fallback to local user
        const local = LocalStore.getUser();
        setUser(local);
        setSubscription(calculateSubscription());
      }
      if (isMounted) {
        setLoading(false);
        clearTimeout(timer);
      }
    }, (err) => {
      console.warn('Firebase Auth state error:', err);
      if (isMounted) {
        const local = LocalStore.getUser();
        setUser(local);
        setSubscription(calculateSubscription());
        setLoading(false);
        clearTimeout(timer);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      if (password && password.length >= 6) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setFirebaseUser(userCredential.user);
      } else {
        // Mock fallback login for testing
        const localUser: UserAccount = {
          id: 'user-' + Math.random().toString(36).substring(2, 8),
          email,
          name: 'Mamá / Papá',
          country: 'México',
          locale: 'es-MX',
          consentAt: new Date().toISOString()
        };
        LocalStore.setUser(localUser);
        setUser(localUser);
      }
    } catch (err: any) {
      console.warn('Firebase login attempt, falling back to local session:', err?.message);
      const localUser: UserAccount = {
        id: 'user-' + Math.random().toString(36).substring(2, 8),
        email,
        name: 'Mamá / Papá',
        country: 'México',
        locale: 'es-MX',
        consentAt: new Date().toISOString()
      };
      LocalStore.setUser(localUser);
      setUser(localUser);
    }
  };

  const signup = async (email: string, password?: string, name?: string) => {
    const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    try {
      if (password && password.length >= 6) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUid = userCredential.user.uid;
        
        // Save initial 30 days subscription to Firestore
        await setDoc(doc(db, 'users', fbUid), {
          email,
          name: name || 'Responsable',
          subscriptionStatus: 'active',
          subscriptionValidUntil: validUntilDate,
          createdAt: new Date().toISOString(),
          country: 'México',
          locale: 'es-MX'
        });
      }
    } catch (err: any) {
      console.warn('Firebase signup notice, continuing with local store:', err?.message);
    }

    const newUser: UserAccount = {
      id: firebaseUser?.uid || 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      name: name || 'Responsable',
      country: 'México',
      locale: 'es-MX',
      consentAt: new Date().toISOString()
    };
    LocalStore.setUser(newUser);
    LocalStore.setOnboardingCompleted(false);
    setUser(newUser);
    setSubscription(calculateSubscription(validUntilDate));
  };

  const logout = () => {
    signOut(auth).catch(() => {});
    LocalStore.setUser(null);
    setUser(null);
    setFirebaseUser(null);
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        await auth.currentUser.delete();
      } catch (e) {
        console.warn('Firebase user delete note:', e);
      }
    }
    LocalStore.clearAllData();
    setUser(null);
    setFirebaseUser(null);
  };

  // Re-checks Firestore subscription to unlock after Hotmart payment webhook runs
  const checkSubscriptionStatus = async (): Promise<boolean> => {
    let latestValidUntil: string | undefined = undefined;

    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          latestValidUntil = snap.data().subscriptionValidUntil;
        }

        // Also check subscriptions/{email} written by Apps Script / Webhook
        if (auth.currentUser.email) {
          const emailKey = auth.currentUser.email.toLowerCase().trim();
          const subSnap = await getDoc(doc(db, 'subscriptions', emailKey));
          if (subSnap.exists()) {
            const subData = subSnap.data();
            if (subData.validUntil) {
              const hotmartDate = new Date(subData.validUntil);
              const currentDate = latestValidUntil ? new Date(latestValidUntil) : new Date(0);
              if (hotmartDate > currentDate) {
                latestValidUntil = subData.validUntil;
                await setDoc(userDocRef, {
                  subscriptionValidUntil: latestValidUntil,
                  subscriptionStatus: 'active'
                }, { merge: true });
              }
            }
          }
        }
      } catch (e) {
        console.warn('Check subscription status error:', e);
      }
    }

    const sub = calculateSubscription(latestValidUntil);
    setSubscription(sub);
    return !sub.isBlocked;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        firebaseUser,
        subscription, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        deleteAccount,
        checkSubscriptionStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
