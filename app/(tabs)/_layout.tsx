import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import { Platform, View, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  return (
    <>
      {/* Botão de GPS acima da tab bar */}


      {/* Tab Bar flutuante */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#127234',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: '50%',
            marginLeft: 35, // metade da largura da tab bar
            width: 350,
            backgroundColor: '#127234',
            borderRadius: 30,
            height: 70,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            paddingTop: 5,
            zIndex: 999,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
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
