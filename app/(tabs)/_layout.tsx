import { Tabs } from "expo-router";
import { Platform, View, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#127234",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: "50%",
            width: 250,
            marginLeft: 55,
            backgroundColor: "#127234",
            borderRadius: 30,
            height: 70,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
            paddingTop: 5,
            zIndex: 999,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: "Mapa",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name="map-marked-alt"
                size={24}
                color={color}
                style={{
                  backgroundColor: focused ? "white" : "transparent",
                  borderRadius: 20,
                  marginTop: 22,
                  padding: 2,
                  width: 80,
                  height: 50,
                  paddingLeft: 26,
                }}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Horarios",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name="access-time-filled"
                size={24}
                color={color}
                style={{
                  backgroundColor: focused ? "white" : "transparent",
                  borderRadius: 20,
                  marginTop: 22,
                  padding: 2,
                  width: 80,
                  height: 50,
                  paddingLeft: 26,
                }}
              />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}
