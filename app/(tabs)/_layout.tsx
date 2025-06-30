import { Tabs } from "expo-router";
import { View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomTabBar } from '../../src/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="explore"
        options={{
          title: "Mapa",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome5
              name="map-marked-alt"
              size={size}
              color={color}

            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Horarios",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="access-time-filled"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}