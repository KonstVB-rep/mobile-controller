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
  const client = new Client();
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
      const session = await account.createEmailPasswordSession(email, password);
      const { jwt } = await account.createJWT();
      console.log("JWT created:", jwt);
      await SecureStore.setItemAsync("jwtToken", jwt);

      const currentUser = await getCurrentUser();
    //   setUser(currentUser);
        return currentUser
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    }
  };

  export const signOut = async () => {
    try {
      await account.deleteSession("current");
      await SecureStore.deleteItemAsync("jwtToken");
    //   setUser(null);
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };
