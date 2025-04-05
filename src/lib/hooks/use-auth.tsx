"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { userLogin, userRefreshToken } from "@/services/auth-services";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getCookie("accessToken") as string | null
  );
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = accessToken !== undefined;

  const login = async (email: string, password: string) => {
    try {
      const response = await userLogin(email, password);
      setAccessToken(response.access_token);
      setCookie("accessToken", response.access_token);
      setCookie("refreshToken", response.refresh_token);
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setAccessToken(null);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setError(null);
    window.location.href = "/auth/login";
  };

  const refreshAccessToken = async () => {
    if (!accessToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await userRefreshToken(accessToken);
      setAccessToken(response.access_token);
      setCookie("accessToken", response.access_token);
    } catch {
      setError("Unable to refresh access token");
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        refreshAccessToken();
      }
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, refreshAccessToken, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
