import { signOut } from "@/lib/appwrite";
import { Link } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";

const Tab = () => {
  return (
    <View className="flex-1 items-center justify-center relative gap-12">
      <ImageBackground
        source={require("@/assets/images/doubt.png")}
        resizeMode="contain"
        className="absolute top-0 left-0 right-0 bottom-0 opacity-50 w-full h-full"
      />
      <Text className="text-2xl font-psemibold text-white text-center">
        Вы уверены,что хотите выйти?
      </Text>
      <View className="flex-row gap-5 justify-between w-full pb-5">
        <Pressable
          className="flex align-center justify-center rounded-3xl bg-confirm self-center"
          onPress={signOut}
        >
          <Link
            href={"/login"}
            onPress={signOut}
            className="w-full py-4 px-8 rounded-3xl фд"
          >
            <Text className="text-white text-lg font-psemibold">Да</Text>
          </Link>
        </Pressable>
        <Pressable
           className="flex align-center justify-center rounded-3xl bg-unConfirm self-center"
        >
           <Link
            href={"/"}

            className="w-full py-4 px-8 rounded-3xl"
          >
            <Text className="text-white text-lg font-psemibold">нет</Text>
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

export default Tab;