"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextValue {
  user: any | null;
  signFunctions: any;
  Logout: () => void;
}
// interface UserData {
//   id: string;
//   name: string;
//   email: string;
// }

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export const useAuthContext = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  // Google Sign in
  const GoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  // LogOut
  const Logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
  const signFunctions = {
    google: GoogleSignIn,
  };
  const value: AuthContextValue = { user, Logout, signFunctions };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};