import {
  Client,
  Account,
  Databases,
  Query,
} from "react-native-appwrite";
import {
  REACT_APP_ENDPOINT,
  REACT_APP_PLATFORM,
  REACT_APP_PROJECT_ID,
  REACT_APP_DATABASE_ID,
  REACT_APP_USER_COLLECTION_ID,
} from "@env";

export const appWriteConfig = {
  endpoint: REACT_APP_ENDPOINT,
  platform: REACT_APP_PLATFORM,
  projectId: REACT_APP_PROJECT_ID,
  databaseId: REACT_APP_DATABASE_ID,
  userCollectionId: REACT_APP_USER_COLLECTION_ID,
};

// Init your React Native SDK
const client = new Client();
const database = new Databases(client);

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);

// export const setClientJwt = async (jwt: string) => {
//   client.setJWT(jwt); //  метод  у Client
// };

export const signOut = async () => {
  try {
    await account.deleteSession("current");
    // await SecureStoreJwt.deleteToken();
  } catch (error) {
    console.log(error, "error");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signOut();

    const session = await account.createEmailPasswordSession(email, password);

    // const { jwt } = await account.createJWT();

    // await SecureStoreJwt.saveToken(jwt);

    // await setClientJwt(jwt);

    return session;
  } catch (error) {
    console.log(error, "error");
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error("Failed to get current account");
    }

    const currentUser = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error("Failed to get current user");
    }

    console.log(currentUser, "currentUser");
    return currentUser.documents[0];
  } catch (error) {
    console.log(error, "error");
  }
};

// export const initializeAndGetUser = async () => {
//   try {
//     // Загружаем JWT из хранилища
//     const jwt = await SecureStoreJwt.getToken();
//     if (!jwt) {
//       console.log("JWT не найден. Пользователь не авторизован.");
//       return null; // JWT отсутствует
//     }

//     // Устанавливаем JWT в клиент
//     await setClientJwt(jwt);

//     // Получаем текущего пользователя
//     return await getCurrentUser();
//   } catch (error) {
//     if (error instanceof AppwriteException) {
//       if (error.code === 401) {
//         console.log("JWT недействителен. Пользователь не авторизован.");
//       } else {
//         console.error(`Ошибка Appwrite: ${error.message}`);
//       }
//     } else {
//       console.error("Неизвестная ошибка:", error);
//     }
//   }
// };
