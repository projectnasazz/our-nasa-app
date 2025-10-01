import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';

// Conditionally import Firebase functions only if auth is available
let signInWithEmailAndPassword: any = null;
let createUserWithEmailAndPassword: any = null;
let signInWithPopup: any = null;
let GoogleAuthProvider: any = null;
let FacebookAuthProvider: any = null;
let firebaseSignOut: any = null;
let onAuthStateChanged: any = null;
let sendPasswordResetEmail: any = null;

if (auth) {
  import('firebase/auth').then((firebaseAuth) => {
    signInWithEmailAndPassword = firebaseAuth.signInWithEmailAndPassword;
    createUserWithEmailAndPassword = firebaseAuth.createUserWithEmailAndPassword;
    signInWithPopup = firebaseAuth.signInWithPopup;
    GoogleAuthProvider = firebaseAuth.GoogleAuthProvider;
    FacebookAuthProvider = firebaseAuth.FacebookAuthProvider;
    firebaseSignOut = firebaseAuth.signOut;
    onAuthStateChanged = firebaseAuth.onAuthStateChanged;
    sendPasswordResetEmail = firebaseAuth.sendPasswordResetEmail;
  });
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && onAuthStateChanged) {
      // Use Firebase authentication
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return unsubscribe;
    } else {
      // Use mock authentication
      const savedUser = localStorage.getItem('aeroclime_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      if (auth && signInWithEmailAndPassword) {
        // Use Firebase authentication
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result;
      } else {
        // Use mock authentication
        const mockUser: User = {
          uid: 'mock-uid-' + Date.now(),
          email,
          displayName: email.split('@')[0],
          photoURL: null,
        };
        
        setUser(mockUser);
        localStorage.setItem('aeroclime_user', JSON.stringify(mockUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      
      if (auth && createUserWithEmailAndPassword) {
        // Use Firebase authentication
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result;
      } else {
        // Use mock authentication
        const mockUser: User = {
          uid: 'mock-uid-' + Date.now(),
          email,
          displayName,
          photoURL: null,
        };
        
        setUser(mockUser);
        localStorage.setItem('aeroclime_user', JSON.stringify(mockUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      if (auth && signInWithPopup && GoogleAuthProvider) {
        // Use Firebase authentication
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result;
      } else {
        // Use mock authentication
        const mockUser: User = {
          uid: 'google-uid-' + Date.now(),
          email: 'user@gmail.com',
          displayName: 'Google User',
          photoURL: 'https://via.placeholder.com/150',
        };
        
        setUser(mockUser);
        localStorage.setItem('aeroclime_user', JSON.stringify(mockUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      
      if (auth && signInWithPopup && FacebookAuthProvider) {
        // Use Firebase authentication
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result;
      } else {
        // Use mock authentication
        const mockUser: User = {
          uid: 'facebook-uid-' + Date.now(),
          email: 'user@facebook.com',
          displayName: 'Facebook User',
          photoURL: 'https://via.placeholder.com/150',
        };
        
        setUser(mockUser);
        localStorage.setItem('aeroclime_user', JSON.stringify(mockUser));
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      if (auth && firebaseSignOut) {
        // Use Firebase authentication
        await firebaseSignOut(auth);
      } else {
        // Use mock authentication
        setUser(null);
        localStorage.removeItem('aeroclime_user');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      
      if (auth && sendPasswordResetEmail) {
        // Use Firebase authentication
        await sendPasswordResetEmail(auth, email);
      } else {
        // Use mock authentication
        console.log('Password reset email sent to:', email);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
