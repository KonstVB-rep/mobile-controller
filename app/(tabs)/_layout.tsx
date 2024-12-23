import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

import TabBarBackground from "@/components/ui/TabBarBackground";
import TabIcon from "@/components/tabs-layout/TabIcon/TabIcon";
import { Colors } from "@/constants/styles-system";
import { useAuth } from "@/context/AuthContext";
export default function TabLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  // if (!isLoading && !isAuthenticated) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.black200,
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
          width: 170,
          marginHorizontal: "auto",
          backgroundColor: "silver",
          borderTopWidth: 0,
          borderTopColor: Colors.primary,
          height: 84,
          marginBottom: 10,
          borderRadius: 100,
        },
      }}
    >
      <Tabs.Screen
        name="services"
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
              <MaterialCommunityIcons name="exit-to-app"  size={24}
                color={color}
                className="w-full text-center " />
              {/* <AntDesign
                name="logout"
                size={24}
                color={color}
                className="w-full text-center "
              /> */}
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
