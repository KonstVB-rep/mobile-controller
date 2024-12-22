import {
  Client,
  Account,
  Databases,

} from "react-native-appwrite";

import * as SecureStore from "expo-secure-store";
import { IUser } from "@/context/AuthContext";
import { BackHandler, Platform } from "react-native";
import Toast from "react-native-toast-message";

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

const sessionClear = async () => {
  const jwtSecure = await SecureStore.getItemAsync("jwtToken");
  if (jwtSecure) {
    client.setJWT("");
    // Удаление сессии пользователя
    await account.deleteSession("current");

    // Удаление JWT из SecureStore
    await SecureStore.deleteItemAsync("jwtToken");
  }
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
    await sessionClear();
    await account.createEmailPasswordSession(email, password);

    const { jwt } = await account.createJWT();

    // Сохранение JWT в SecureStore
    await SecureStore.setItemAsync("jwtToken", jwt);

    // Установка JWT в клиенте Appwrite
    client.setJWT(jwt);

    // Получение текущего пользователя
    return await getCurrentUser();
  } catch (error) {
    console.error(
      "Не удалось выполнить вход в систему:",
      JSON.stringify(error)
    );
    // Генерация пользовательского сообщения об ошибке
    throw new Error(
      "Не удается войти в приложение. Проверьте свои учетные данные и повторите попытку."
    );
  }
};

export const signOut = async () => {
  try {
    await sessionClear();

    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  } catch (error) {
    console.error("Error signOut", JSON.stringify(error));

    Toast.show({
      type: "error",
      text2: "Не удается выйти из системы. Пожалуйста, попробуйте снова.",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 80,
      swipeable: true,
    });
  }
};
