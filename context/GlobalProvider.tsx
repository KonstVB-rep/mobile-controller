import { getCurrentUser } from "@/lib/appwrite";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

export type IUser = {
  username: string;
  email: string;
  accountId: string;
} & Models.Document;

interface IGlobalContext {
  isLoggedIn: boolean;
  user: IUser | null;
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: IUser | null) => void;
}

const INITIAL_CONTEXT: IGlobalContext = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  setIsLoggedIn: () => {},
  setUser: () => {},
};

export const GlobalContext = createContext<IGlobalContext>(INITIAL_CONTEXT);

const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const initialize = async () => {
    //   const jwt = await SecureStoreJwt.getToken();
    //   if (jwt) {
    //     await setClientJwt(jwt);
    //   }
    // };

    // initialize();

    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res as IUser);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
