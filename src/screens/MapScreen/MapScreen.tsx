import React, { useEffect, useState, useRef } from "react";
// 1. Adicione 'Pressable' aqui
import { View, Text, TouchableOpacity, FlatList, Platform, Pressable } from "react-native";
import { BlurView } from 'expo-blur';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { pontosDeOnibus } from '../../constants/mapData';
import { calcularDistancia } from "../../utils/location";
import { useUserLocation } from "../../hooks/useUserLocation";
import { BusStop, Coordinates } from "../../types/map";
import { styles } from './MapScreen.styles';
import { StatusBar } from 'expo-status-bar';

export default function MapScreen() {
  const { location: userLocation, errorMsg } = useUserLocation();

  const [visibleRegion, setVisibleRegion] = useState<Region | null>(null);
  const [distancia, setDistancia] = useState<{ nome: string; valor: string } | null>(null);
  const [pontoSelecionado, setPontoSelecionado] = useState<BusStop | null>(null);
  const [showPontosList, setShowPontosList] = useState(false);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (userLocation && !visibleRegion) {
      centerMapOn(userLocation);
    }
  }, [userLocation]);

  const centerMapOn = (coords: Coordinates, zoom: boolean = true) => {
    mapRef.current?.animateToRegion({
      ...coords,
      latitudeDelta: zoom ? 0.01 : 0.02,
      longitudeDelta: zoom ? 0.01 : 0.02,
    }, 1000);
  }

  const handleSelecionarPonto = (ponto: BusStop) => {
    setPontoSelecionado(ponto);
    if (userLocation) {
      const dist = calcularDistancia(
        userLocation.latitude,
        userLocation.longitude,
        ponto.coordenadas.latitude,
        ponto.coordenadas.longitude
      );
      const distanciaFormatada = dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(2)} km`;
      setDistancia({ nome: ponto.nome, valor: distanciaFormatada });
    }
    centerMapOn(ponto.coordenadas);
    setShowPontosList(false);
  };

  const handleGoToCurrentLocation = () => {
    if (userLocation) {
      setPontoSelecionado(null);
      setDistancia(null);
      centerMapOn(userLocation);
    }
  };


  if (!userLocation && !errorMsg) {
    return <View style={styles.container}><Text>Carregando mapa...</Text></View>;
  }
  if (errorMsg) {
    return <View style={styles.container}><Text>{errorMsg}</Text></View>;
  }

  return (
    <View style={styles.container}>

      {showPontosList && (
        <Pressable
          style={styles.backdropContainer}
          onPress={() => setShowPontosList(false)}
        >
          <BlurView
            intensity={10}
            tint="dark"
            style={styles.blurView}
          />
        </Pressable>
      )}

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={() => setShowPontosList(!showPontosList)}>
          <Text style={styles.searchText}>Escolha o ponto de ônibus</Text>
        </TouchableOpacity>
        {showPontosList && (
          <FlatList
            data={pontosDeOnibus}
            keyExtractor={(item) => item.nome}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelecionarPonto(item)}>
                <Ionicons name="location-outline" size={20} color="#666" style={{ marginLeft: 10, marginRight: 10 }} />
                <Text style={styles.primaryText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || -13.86,
          longitude: userLocation?.longitude || -40.07,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => { setPontoSelecionado(null); setDistancia(null); }}
      >
        {userLocation && <Marker coordinate={userLocation} pinColor="blue" />}
        {pontosDeOnibus.map((ponto) => (
          <Marker
            key={ponto.nome}
            coordinate={ponto.coordenadas}
            onPress={() => handleSelecionarPonto(ponto)}
            pinColor={pontoSelecionado?.nome === ponto.nome ? 'green' : 'red'}
          />
        ))}
      </MapView>

      {pontoSelecionado && (
        <View style={styles.pontoBox}>
          <Text style={styles.pontoText}>{pontoSelecionado.nome}</Text>
        </View>
      )}

      {distancia && (
        <View style={styles.distanciaBox}>
          <Text style={styles.distanciaText}>Distância: {distancia.valor}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.gpsButton} onPress={handleGoToCurrentLocation}>
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}