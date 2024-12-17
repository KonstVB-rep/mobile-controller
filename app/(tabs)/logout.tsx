import CustomButton from "@/components/ui/CustomButton";
import { useGlobalContext } from "@/context/useGlobalContext";
import { signOut } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";

const Tab = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center relative gap-12">
      <ImageBackground
        source={require("@/assets/images/doubt.png")}
        resizeMode="contain"
        className="absolute top-0 left-0 right-0 bottom-0 opacity-50 w-full"
      />
      <Text className="text-2xl font-psemibold text-white text-center">
        Вы уверены,что хотите выйти?
      </Text>
      <View className="flex-row gap-20 w-full pb-5 align-center justify-center">
        <Pressable className="flex w-[100px] align-center justify-center rounded-[30px] bg-confirm self-center">
          <CustomButton
            title="Да"
            onPress={logout}
            containerStyles="w-full py-4 px-8 rounded-[30px] text-center"
            textStyles="text-white capitalize text-xl font-psemibold"
          />
        </Pressable>
        <Pressable className="flex w-[100px] align-center justify-center rounded-[30px] bg-unConfirm self-center">
          <Link
            href={"/"}
            className="w-full py-4 px-8 rounded-[30px] text-center"
          >
            <Text className="text-white capitalize text-xl font-psemibold">
              нет
            </Text>
          </Link>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Tab;
