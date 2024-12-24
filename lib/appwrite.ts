import {
  Client,
  Account,
  Databases,
} from "react-native-appwrite";

import * as SecureStore from "expo-secure-store";
import { IUser } from "@/context/AuthContext";
import { BackHandler, Platform } from "react-native";

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

  export const sessionClear = async () => {
    client.setJWT("");
    // Удаление сессии пользователя
  const timeout = setTimeout(async () => {
    await account.deleteSession("current");

    // Удаление JWT из SecureStore
    await SecureStore.deleteItemAsync("jwtToken");
    clearTimeout(timeout);
  },100)
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
  console.log('signIn', email, password)
  try {
    // Создание сессии пользователя
    await sessionClear();

    // Создание сессии пользователя
    const session = await account.createEmailPasswordSession(email, password);

    if(session){
      const { jwt } = await account.createJWT();

    // Сохранение JWT в SecureStore
    await SecureStore.setItemAsync("jwtToken", jwt);

    // Установка JWT в клиенте Appwrite
    client.setJWT(jwt);

    // Получение текущего пользователя
    return await getCurrentUser();
  }
  } catch (error) {
    console.error(
      "Не удалось выполнить вход в систему:",
      JSON.stringify(error)
    );
  }
};

export const signOut = async () => {

  try {
    const jwt = await SecureStore.getItemAsync("jwtToken");
    if(jwt){
      await sessionClear();
    }
    console.log("signOut");
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  } catch (error) {
    console.error("Error signOut", JSON.stringify(error));
  }
};