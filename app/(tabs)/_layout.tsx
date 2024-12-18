import React from "react";
import { Redirect, Tabs } from "expo-router";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";

import TabBarBackground from "@/components/ui/TabBarBackground";
import TabIcon from "@/components/tabs-layout/TabIcon/TabIcon";
import { Colors } from "@/constants/styles-system";
import { useAuth } from "@/context/AuthContext";

export default function TabLayout() {

  const {isLoading, isAuthenticated } = useAuth()

  if (!isLoading && !isAuthenticated) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.gray,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: Colors.black100,
          borderColor: Colors.transparent,
          borderBottomColor: Colors.black200,
        },
        headerTitleStyle: { color: Colors.white },
        headerTitleAlign: "center",
        sceneStyle: { backgroundColor: Colors.primary },
        tabBarStyle: {
          backgroundColor: Colors.black100,
          borderTopWidth: 0,
          borderTopColor: Colors.primary,
          height: 80,
        },
        tabBarActiveBackgroundColor: Colors.secondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Услуги",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Услуги" color={color} focused={focused}>
              <FontAwesome6
                name="list"
                size={24}
                color={color}
                className="w-full text-center"
              />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Выйти из приложения",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="Выйти" color={color} focused={focused}>
              <SimpleLineIcons
                name="logout"
                size={24}
                color={color}
                className="w-full text-center"
              />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
