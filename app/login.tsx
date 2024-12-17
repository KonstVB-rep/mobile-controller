import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import FormField from "@/components/ui/FormField";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/useGlobalContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { IUser } from "@/context/GlobalProvider";
import { AppwriteException } from "react-native-appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading, isLoggedIn, setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const isEmptyForm = form.email.trim() === "" || form.password.trim() === "";

  const submit = async () => {
    if (isEmptyForm) {
      return Alert.alert("Все поля обязательные.Пожалуйста,заполните их.");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result as IUser);
      setIsLoggedIn(true);

      Alert.alert(`Добро пожаловать, ${result?.username}!`);

      router.replace("/(tabs)");
    } catch (error) {
      if (error instanceof Error || error instanceof AppwriteException) {
        Alert.alert(error.message);
      } else Alert.alert(error as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full grow">
      <ScrollView
        contentContainerStyle={{
          maxHeight: "100%",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View className="w-full gap-8 justify-center px-8 my-6">
          <View className="flex flex-cols justify-center items-center">
            <Image
              source={require("@/assets/images/logo.png")}
              resizeMode="contain"
              className="w-32 h-32"
            />
            <Text className=" text-2xl text-center text-white mt-5 font-psemibold">
              Мобильный котроллер
            </Text>
          </View>

          <FormField
            title="Адрес электронной почты"
            placeholder="example@example.com"
            handleChange={(value) => setForm({ ...form, email: value })}
            value={form.email}
            keyboardType="email-address"
          />

          <FormField
            title="Пароль"
            placeholder="**********"
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Войти"
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-5 rounded-xl"
            textStyles="text-xl text-white font-psemibold"
          />
          <Link href="/(tabs)" className="text-white text-xl font-psemibold">
            Tabs
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
