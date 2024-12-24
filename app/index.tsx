import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  LogBox,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

import CustomButton from "@/components/ui/CustomButton";
import FormField from "@/components/ui/FormField";
import { IUser, useAuth } from "@/context/AuthContext";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { MotiView } from "moti";
import Toast from "react-native-toast-message";
import SplashScreen from "./splash-screen";

LogBox.ignoreAllLogs();

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { isLoading, isAuthenticated, setUser, setIsAuthenticated } =
    useAuth();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const isEmptyForm = form.email.trim() === "" || form.password.trim() === "";
  const submit = async () => {
    if (isEmptyForm) {
      return Toast.show({
        type: "info",
        text2: "Все поля обязательные для заполнения.",
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const user = await getCurrentUser();

      setUser(user as IUser);
      setIsAuthenticated(true);

      Toast.show({
        type: "success",
        text2: `Добро пожаловать, ${user?.username} 👋!`,
        visibilityTime: 1500,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });

      router.replace("/(tabs)/services");
    } catch (error) {
      console.log("SignIn", error);

      Toast.show({
        type: "errorSignIn",
        text2: `Не удается войти в приложение. Проверьте свои учетные данные и повторите попытку. Если проблема повторяется перезагрузите приложение.`,
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 80,
        swipeable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)/services");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <SplashScreen />;
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
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 300,
          }}
          className="flex-1 items-center justify-center"
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
              containerStyles="mt-5 rounded-xl bg-secondary"
              textStyles="text-xl text-white font-psemibold"
            />
          </View>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
