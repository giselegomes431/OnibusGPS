import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Definindo as cores para facilitar
          const activeColor = '#127234';
          const inactiveColor = '#FFFFFF';

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              {/* Container do ícone com o fundo que muda de cor */}
              <View style={[styles.iconContainer, { backgroundColor: isFocused ? inactiveColor : 'transparent' }]}>
                {options.tabBarIcon({ focused: isFocused, color: isFocused ? activeColor : inactiveColor, size: 24 })}
              </View>

              {/* AQUI ESTÁ A MUDANÇA: Adicionamos o Text para o label */}
              <Text style={[styles.labelText, { color: inactiveColor, fontWeight: isFocused ? 'bold' : 'normal' }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const tabBarWidth = screenWidth * 0.8;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start', // Alinha os itens ao topo para dar espaço para o texto
    paddingTop: 5, // Adiciona um espaço no topo
    width: tabBarWidth,
    height: 70,
    backgroundColor: '#127234',
    borderRadius: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 30,
  },
  // NOVO ESTILO PARA O TEXTO
  labelText: {
    fontSize: 12,
    marginTop: 2, // Espaço entre o ícone e o texto
  },
});