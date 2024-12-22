import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import ServiceItem from "@/components/service/ServiceItem/ServiceItem";

const DATA = [
  {
    id: 1,
    title: "Тюбинг",
    image:
      "https://cdn1.ozonusercontent.com/s3/club-storage/images/article_preview/757/c1200/04ff4117-a77a-4577-8324-9d5c77915b69.jpeg",
  },
];

const Services = () => {

  return (
    <SafeAreaView className="flex-1 my-5">
      <ScrollView className="flex-1 px-4">
        {DATA.map((item) => (
          <ServiceItem key={item?.title} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Services;
