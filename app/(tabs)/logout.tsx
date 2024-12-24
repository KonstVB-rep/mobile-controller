import { router } from "expo-router";
import { View, Text } from "react-native";

import CustomButton from "@/components/ui/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/appwrite";

const Tab = () => {
  const { setUser, setIsAuthenticated } = useAuth();

  const logout = async () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      await signOut();
    } catch (error) {
      console.log("logout", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-start pt-20 relative gap-5">
      <View>
        <Text className="text-lg font-psemibold leading-10 text-white text-center px-4">
          Сессия будет прекращена.
        </Text>
        <Text className="text-lg font-psemibold leading-10 text-white text-center px-4">
          Для возобновления работы в приложении необходимо будет снова выполнить
          вход.
        </Text>
      </View>
      <View className="flex-1 flex-col w-full pb-5 align-center justify-center gap-20 pb-20">
        <Text className="text-2xl font-psemibold leading-10 text-white text-center">
          Вы уверены, что хотите выйти?
        </Text>
        <View className="flex-row gap-20 w-full pb-5 align-center justify-center">
          <CustomButton
            title="Да"
            onPress={logout}
            containerStyles="w-full py-4 px-8 rounded-[30px] text-center max-w-[100px] rounded-[30px] bg-red-600 self-center"
            textStyles="text-white capitalize text-xl font-psemibold"
          />
          <CustomButton
            title="Нет"
            onPress={() => router.back()}
            containerStyles="w-full py-4 px-8 rounded-[30px] text-center max-w-[100px] rounded-[30px] bg-darkBlue self-center"
            textStyles="text-white capitalize text-xl font-psemibold"
          />
        </View>
      </View>
    </View>
  );
};

export default Tab;
