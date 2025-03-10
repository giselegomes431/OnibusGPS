import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#127234',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#127234', // Fundo da barra
          height: 70, // Altura da barra
          borderTopLeftRadius: 40, // Bordas arredondadas
          borderTopRightRadius: 40,
          paddingBottom: 10, // Espaço inferior
          paddingTop: 5,
          marginTop: -40,
          
        },
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho da fonte
          fontWeight: '600', // Peso da fonte
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={28}
              color={color}
              style={{
                backgroundColor: focused ? 'white' : 'transparent',
                borderRadius: 20,
                marginTop: 15,
                padding: 5,
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
        name="explore"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="home"
              size={28}
              color={color}
              style={{
                backgroundColor: focused ? 'white' : 'transparent', 
                borderRadius: 20,
                marginTop: 15,
                padding: 5,
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
        name="weather"
        options={{
          title: 'Clima',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="cloud"
              size={28}
              color={color}
              style={{
                backgroundColor: focused ? 'white' : 'transparent',
                borderRadius: 20,
                marginTop: 15,
                padding: 5,
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
  );
}