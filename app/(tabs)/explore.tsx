import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

// Pontos fixos de ônibus
const pontosDeOnibus = [
  {
    nome: "Ginásio de Esportes",
    coordenadas: { latitude: -13.8666252, longitude: -40.0732742 },
  },
  {
    nome: "Praça da Bandeira",
    coordenadas: { latitude: -13.8594096, longitude: -40.0796964 },
  },
  {
    nome: "Feirinha",
    coordenadas: { latitude: -13.8613995, longitude: -40.0788123 },
  },
];

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showPontos, setShowPontos] = useState(false);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const mapRef = useRef(null);
  const [mostrarTituloUsuario, setMostrarTituloUsuario] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);
      setCurrentLocation(coords);
      setMostrarTituloUsuario(true); // <-- Mostra "Você está aqui"
      setTimeout(() => setMostrarTituloUsuario(false), 3000); // Esconde após 3s
    })();
  }, []);

  const handleSelecionarPonto = (ponto) => {
    console.log("Selecionado: ", ponto.nome); // Log para verificar se o ponto foi selecionado corretamente

    if (currentLocation) {
      const dist = calcularDistancia(
        currentLocation.latitude,
        currentLocation.longitude,
        ponto.coordenadas.latitude,
        ponto.coordenadas.longitude
      );

      let distanciaFormatada =
        dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(2)} km`;

      setDistancia({ nome: ponto.nome, valor: distanciaFormatada });
    }

    setLocation(ponto.coordenadas);
    setPontoSelecionado(ponto.nome); // Atualiza o ponto selecionado

    mapRef.current?.animateToRegion(
      {
        ...ponto.coordenadas,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );

    setShowPontos(false); // Esconde a lista de pontos de ônibus após a seleção
  };

  const handleGoToCurrentLocation = () => {
    if (currentLocation) {
      setLocation(currentLocation);
      setPontoSelecionado(null);
      setDistancia(null);
      setMostrarTituloUsuario(true); // <-- Mostra "Você está aqui"
      setTimeout(() => setMostrarTituloUsuario(false), 3000); // Esconde após 3s

      mapRef.current?.animateToRegion(
        {
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  const handleMapPress = () => {
    setPontoSelecionado(null);
    setDistancia(null);
  };

  // Verifica a mudança no ponto selecionado
  useEffect(() => {
    console.log("Ponto Selecionado: ", pontoSelecionado); // Log para verificar mudanças no ponto selecionado
  }, [pontoSelecionado]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mapa</Text>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setShowPontos(!showPontos)}
        >
          <Text style={styles.searchText}>Escolha o ponto de ônibus</Text>
        </TouchableOpacity>

        {showPontos && (
          <FlatList
            data={pontosDeOnibus}
            keyExtractor={(item) => item.nome}
            style={styles.suggestionList}
            renderItem={({ item }) => {
              const isSelected = pontoSelecionado === item.nome;
              return (
                <TouchableOpacity
                  style={[
                    styles.suggestionItem,
                    isSelected && { backgroundColor: "#e0f7e9" },
                  ]}
                  onPress={() => handleSelecionarPonto(item)}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isSelected ? "green" : "#666"}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.primaryText,
                      isSelected && { color: "green", fontWeight: "bold" },
                    ]}
                  >
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      {location && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          {currentLocation && (
            <Marker coordinate={currentLocation}>
              <View
                style={{
                  height: -30,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Entypo
                  name="location-pin"
                  size={39}
                  color="#E53935" // cor fixa desejada
                  style={{ marginBottom: -6 }}
                />
              </View>
            </Marker>
          )}

          {pontosDeOnibus.map((ponto, index) => {
            const isSelected = pontoSelecionado === ponto.nome;
            return (
              <Marker
                key={index}
                coordinate={ponto.coordenadas}
                onPress={() => handleSelecionarPonto(ponto)}
              >
                <View
                  style={{
                    height: -30, // altura total garantida
                    width: 35,
                    alignItems: "center",
                    justifyContent: "flex-end", // garante que o ícone fique embaixo
                  }}
                >
                  <Entypo
                    name="location-pin"
                    size={39}
                    color={pontoSelecionado === ponto.nome ? "#127234" : "#666"}
                    style={{ marginBottom: -6 }}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
      )}

      {pontoSelecionado && (
        <View style={styles.pontoBox}>
          <Text style={styles.pontoText}>{pontoSelecionado}</Text>
        </View>
      )}

      {mostrarTituloUsuario && (
        <View style={styles.pontoBox}>
          <Text style={styles.pontoText}>Você está aqui</Text>
        </View>
      )}

      {distancia && (
        <View style={styles.distanciaBox}>
          <Text style={styles.distanciaText}>Distância: {distancia.valor}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.gpsButton}
        onPress={handleGoToCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#127234",
    padding: 15,
    height: 80,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    marginLeft: 140,
    marginTop: 20,
  },
  searchContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 80 : 70,
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    elevation: 5,
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: "#127234",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  searchText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionList: {
    marginTop: 5,
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  map: {
    flex: 1,
  },
  gpsButton: {
    position: "absolute",
    bottom: 100, // Acima da tab bar
    right: 20,
    zIndex: 1000,
    backgroundColor: "#127234",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  distanciaBox: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    justifyContent: "center",
  },
  distanciaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  pontoBox: {
    position: "absolute",
    bottom: 150, // acima do botão GPS
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    alignSelf: "center", // <- centraliza horizontalmente
    marginBottom: 30,
  },
  pontoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#127234",
  },
});
