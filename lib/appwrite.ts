import {
    Client,
    Account,
    Databases,
  } from "react-native-appwrite";
  
  import * as SecureStore from "expo-secure-store";
import { IUser } from "@/context/AuthContext";
  
  
  export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_ENDPOINT!,
    platform: process.env.EXPO_PUBLIC_PLATFORM!,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
  };
  
  // Init your React Native SDK
  export const client = new Client();
  export const database = new Databases(client);
  export const account = new Account(client);
  
  client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform);

export const setClientJwt = async (jwt: string) => {
  client.setJWT(jwt); //  метод  у Client
};

export const getCurrentUser = async (): Promise<IUser> => {
    const response = await account.get(); // Получение текущего пользователя из Appwrite
    return {
      username: response.name,
      email: response.email,
      accountId: response.$id,
    };
  };

  export const signIn = async (email: string, password: string) => {
    try {
      // Создание сессии пользователя
      const session = await account.createEmailPasswordSession(email, password);
  
      // Создание JWT для авторизации запросов
      const { jwt } = await account.createJWT();
  
      // Сохранение JWT в SecureStore
      await SecureStore.setItemAsync("jwtToken", jwt);
  
      // Установка JWT в клиенте Appwrite
      client.setJWT(jwt);
  
      // Получение текущего пользователя
      const currentUser = await getCurrentUser();
  
      return currentUser;
    } catch (error) {
      console.error("Не удалось выполнить вход в систему:", error);
  
      // Генерация пользовательского сообщения об ошибке
      throw new Error("Не удается войти в систему. Пожалуйста, проверьте свои учетные данные и повторите попытку.");
    }
  };

  export const signOut = async () => {
    try {
      // Удаление сессии пользователя
      await account.deleteSession("current");
  
      // Удаление JWT из SecureStore
      await SecureStore.deleteItemAsync("jwtToken");
  
      // Очистка JWT на стороне клиента
      client.setJWT("");
  
      console.log("Пользователь успешно вышел из системы.");
    } catch (error) {
      console.error("Не удалось выйти из системы:", error);
  
      // Можно уведомить об ошибке
      throw new Error("Не удается выйти из системы. Пожалуйста, попробуйте снова.");
    }
  };

