import {
  Client,
  Account,
  Databases,
  Query,
  AppwriteException,
} from "react-native-appwrite";


export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_ENDPOINT!,
  platform: process.env.EXPO_PUBLIC_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
};

// Init your React Native SDK
const client = new Client();
const database = new Databases(client);
const account = new Account(client);

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

// export const setClientJwt = async (jwt: string) => {
//   client.setJWT(jwt); //  метод  у Client
// };

export const signOut = async () => {
  try {

    const currentUser = await account.get();
    console.log("Текущий пользователь:", currentUser);

    // Проверяем, есть ли активная сессия
    const session = await account.getSession("current");
    console.log("Активная сессия:", session);

    // Удаляем текущую сессию
    await account.deleteSession("current");
    console.log("Сессия успешно удалена.");
  } catch (error) {
    if (error instanceof AppwriteException && error?.message.includes("missing scope (account)")) {
      console.warn("Пользователь уже не авторизован.");
    } else {
      console.error("Ошибка при удалении сессии:", error);
    }
  }
};

export const signIn = async (email: string, password: string) => {
  try {

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    if(error instanceof AppwriteException){
      if(error.code === 400){
        throw new Error("Пользователь с таким email уже существует.");
      }
      if(error.code === 401){
        throw new Error("Неверные учетные данные.");
      }
      if(error.code === 404){
        throw new Error("Пользователь с таким email не зарегистрирован.");
      }
      if(error.code === 500){
        throw new Error("Внутренняя ошибка сервера.");
      }
      if(error.code === 503){
        throw new Error("Сервер временно недоступен.");
      }
      throw new Error('Неверные учетные данные.');
    }
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

    console.log(currentUser, "currentUser");

    if (!currentUser) {
      throw new Error("Failed to get current user");
    }
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


// export const isAuthenticated = async (): Promise<boolean> => {
//   try {
//     const session = await account.get(); // Проверка текущей сессии пользователя
//     console.log("Authenticated user:", session);
//     return true;
//   } catch (error) {
//     console.log("User is not authenticated:", error);
//     return false;
//   }
// };