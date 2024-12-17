import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { account, getCurrentUser } from "@/lib/appwrite";
import { AppState } from "react-native";

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

  console.log(AppState);

  // Проверка состояния пользователя при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const jwt = await SecureStore.getItemAsync("jwtToken");
        if (jwt) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const handleLogout = async (nextAppState : string) => {
      try {
        console.log(nextAppState === "background")
        if (nextAppState === "background") {
          await SecureStore.deleteItemAsync("jwtToken"); // Удаление JWT из хранилища
          await account.deleteSession("current");
          setUser(null); // Сброс состояния пользователя
          setIsAuthenticated(false); // Обновление состояния авторизации
          console.log("User logged out and data cleared.");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const subscription = AppState.addEventListener("change", handleLogout);

    return () => {
      subscription.remove(); // Очистка слушателя при размонтировании
    };
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
