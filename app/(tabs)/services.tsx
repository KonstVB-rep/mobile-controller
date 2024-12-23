import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import ServiceItem from "@/components/service/ServiceItem/ServiceItem";
import CustomButton from "@/components/ui/CustomButton";
import { SheetManager } from "react-native-actions-sheet";
import { useAuth } from "@/context/AuthContext";


const DATA = [
  {
    id: 1,
    title: "Тюбинг",
    image:
      "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_preview/757/c1200/04ff4117-a77a-4577-8324-9d5c77915b69.jpeg",
  },
];

const Services = () => {
 

  const { isLoading, isAuthenticated, setUser, setIsAuthenticated } = useAuth();

  console.log(isAuthenticated, "isAuthenticated")
  return (
    <SafeAreaView className="flex-1 my-5">
      <ScrollView className="flex-1 px-4">
        {DATA.map((item) => (
          <ServiceItem key={item?.title} {...item} />
        ))}
        <CustomButton
          title="Добавить услугу"
          onPress={() =>
          {
            try {
              SheetManager.show("gestures", {
                payload: {
                  title: "Добавить услугу",
                },
              })
            } catch (error) {
              console.log(error, "error SheetManager" )
            }
          }
          }
          containerStyles="w-full py-4 px-8 rounded-[30px] text-center max-w-[200px] rounded-[30px] bg-zinc-600 self-center"
          textStyles="text-white capitalize text-xl font-psemibold"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Services;
