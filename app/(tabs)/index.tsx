import { SafeAreaView, ScrollView, View } from "react-native";
import React from "react";

import ServiceItem from "@/components/service/ServiceItem/ServiceItem";
import { Link } from "expo-router";

const DATA = [
  {
    id: 1,
    title: "Тюбинг",
    image:
      "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_preview/757/c1200/04ff4117-a77a-4577-8324-9d5c77915b69.jpeg",
  },
];
const ServicesList = () => {
  return (
    <SafeAreaView className="flex-1 my-5">
      <ScrollView className="flex-1 px-5">
        <Link href="/login" className="flex flex-row items-center gap-2 mb-5">Login</Link>
        {DATA.map((item) => (
          <ServiceItem key={item?.title} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesList;
