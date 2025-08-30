"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  token: string;
}

const dummyUser: User = {
  id: "12345",
  email: "akash@quickbeams.in",
  name: "Akash",
  role: "admin",
  permissions: ["read", "write", "delete"],
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiaWF0IjoxNzMyMTAxOTY5fQ.sSweEHcw-tR4rlJyhQKpEF0IigUVMANf1YsfT0cJPPo",
};

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if(email == "akash@quickbeams.in"){
      setUser(dummyUser);
      localStorage.setItem('user', JSON.stringify(dummyUser));
      router.push('/dashboard');
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signUp = async (email: string, name: string) => {
    // For demo, just create a user
    const newUser = { ...dummyUser, email, name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/dashboard');
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/signUp');
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};