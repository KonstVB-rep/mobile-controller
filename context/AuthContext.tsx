import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { client, getCurrentUser } from "@/lib/appwrite";

export interface IUser {
  username: string;
  email: string;
  accountId: string;
}

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверка состояния пользователя при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Получение JWT из SecureStore
        const jwt = await SecureStore.getItemAsync("jwtToken");
        if (jwt) {
          // Установка JWT в клиент Appwrite
          client.setJWT(jwt);

          // Получение текущего пользователя
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Не удалось найти пользователя:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
