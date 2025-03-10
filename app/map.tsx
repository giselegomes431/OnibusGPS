import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mapa</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Campo de busca */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Para onde deseja ir?" style={styles.searchInput} />
        <Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
      </View>

      {/* Mapa */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -13.8583,
          longitude: -40.0877,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      {/* Barra inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="map" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'green',
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    padding: 8,
  },
  searchIcon: {
    padding: 5,
  },
  map: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
  },
});
