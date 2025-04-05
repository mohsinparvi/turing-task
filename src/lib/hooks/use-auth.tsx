import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCookie, setCookie } from "cookies-next";
import { userLogin } from "@/services/auth-services";

interface AuthContextType {
  user: string | null; // user data or null if not authenticated
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
  const [user, setUser] = useState("");
  const [error, setError] = useState<string | null>(null);
  const accessToken = getCookie("accessToken");
  useEffect(() => {
    if (accessToken) {
      setUser("");
    }
  }, [accessToken]);

  const login = async (email: string, password: string) => {
    try {
      const data = await userLogin(email, password);

      setCookie("accessToken", data.access_token);

      setUser(data);
      setError(null);
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    document.cookie = "accessToken=; path=/; max-age=0";
  };

  const isAuthenticated = !!user || !!accessToken;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
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
