import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    // Check for existing user session
    const savedUser = localStorage.getItem('weatherwise_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate Firebase authentication
      const mockUser: User = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName: email.split('@')[0],
        photoURL: null,
      };
      
      setUser(mockUser);
      localStorage.setItem('weatherwise_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      // Simulate Firebase authentication
      const mockUser: User = {
        uid: 'mock-uid-' + Date.now(),
        email,
        displayName,
        photoURL: null,
      };
      
      setUser(mockUser);
      localStorage.setItem('weatherwise_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      // Simulate Google authentication
      const mockUser: User = {
        uid: 'google-uid-' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
      };
      
      setUser(mockUser);
      localStorage.setItem('weatherwise_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      // Simulate Facebook authentication
      const mockUser: User = {
        uid: 'facebook-uid-' + Date.now(),
        email: 'user@facebook.com',
        displayName: 'Facebook User',
        photoURL: 'https://via.placeholder.com/150',
      };
      
      setUser(mockUser);
      localStorage.setItem('weatherwise_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Failed to sign in with Facebook');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('weatherwise_user');
    } catch (error) {
      throw new Error('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      // Simulate password reset
      console.log('Password reset email sent to:', email);
    } catch (error) {
      throw new Error('Failed to reset password');
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
