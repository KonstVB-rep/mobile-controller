import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import FormField from "@/components/ui/FormField";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const isEmptyForm = form.email.trim() === "" || form.password.trim() === "";

  const submit = async () => {
    if (isEmptyForm) {
      Alert.alert("All fields are required.Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      router.replace("/");
    } catch (error) {
      Alert.alert(error as string);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            title={"Войти"}
            onPress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-5"
            textStyles="text-xl text-white font-psemibold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
