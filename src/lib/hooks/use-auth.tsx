"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { userLogin } from "@/services/auth-services";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [error, setError] = useState<string | null>(null);
  const accessToken = getCookie("accessToken");

  const login = async (email: string, password: string) => {
    try {
      const data = await userLogin(email, password);

      setCookie("accessToken", data.access_token);

      setError(null);
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    window.location.href = "/auth/login";
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
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
