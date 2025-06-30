// Este é o conteúdo do seu antigo 'app/(tabs)/_layout.tsx'
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta o header padrão das abas
        tabBarActiveTintColor: "#127234",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: '15%', // Ajustado para centralizar melhor com a largura
          right: '15%',
          width: '70%',
          backgroundColor: "#127234",
          borderRadius: 30,
          height: 70,
          paddingBottom: Platform.OS === "ios" ? 5 : 10,
          paddingTop: 5,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -5, // Sobe o texto
        },
        tabBarIconStyle: {
          marginTop: 5, // Sobe o icone
        }
      }}
    >
      <Tabs.Screen
        name="explore" // O nome do ARQUIVO na pasta app
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color={focused ? "#127234" : color} style={{
              backgroundColor: focused ? "white" : "transparent",
              padding: 8,
              borderRadius: 20,
            }} />
          ),
        }}
      />
      <Tabs.Screen
        name="index" // O nome do ARQUIVO na pasta app
        options={{
          title: "Horarios",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="access-time-filled" size={24} color={focused ? "#127234" : color} style={{
              backgroundColor: focused ? "white" : "transparent",
              padding: 8,
              borderRadius: 20,
            }} />
          ),
        }}
      />
    </Tabs>
  );
}