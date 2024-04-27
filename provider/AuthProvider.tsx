"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
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
export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return authContext;
};
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
  // Twitter Sign in
  const TwitterSignIn = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider);
  };
  // Facebook Sign in
  const FacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
  };
  // GitHub Sign in
  const GitHubSignIn = () => {
    const provider = new GithubAuthProvider();
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
    twitter: TwitterSignIn,
    "git-hub": GitHubSignIn,
    facebook: FacebookSignIn,
  };
  const value: AuthContextValue = { user, Logout, signFunctions };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
