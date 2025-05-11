import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

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
      setPontoSelecionado(null); // Limpar seleção de ponto
      setDistancia(null);

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
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mapa</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={28} color="white" />
        </TouchableOpacity>
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
                  style={[styles.suggestionItem, isSelected && { backgroundColor: "#e0f7e9" }]}
                  onPress={() => handleSelecionarPonto(item)}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isSelected ? "green" : "#666"}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[styles.primaryText, isSelected && { color: "green", fontWeight: "bold" }]}
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
            <Marker
              coordinate={currentLocation}
              title="Você está aqui"
              pinColor="red"
            />
          )}

          {pontosDeOnibus.map((ponto, index) => {
            const isSelected = pontoSelecionado === ponto.nome; // Verificar se o ponto está selecionado
            return (
              <Marker
                key={index}
                coordinate={ponto.coordenadas}
                title={ponto.nome}
                pinColor={isSelected ? "green" : "blue"} // Coloca o pin verde se o ponto for selecionado
                onPress={() => handleSelecionarPonto(ponto)}
              />
            );
          })}
        </MapView>
      )}

      {distancia && (
        <View style={styles.distanciaBox}>
          <Text style={styles.distanciaText}>
            Distância até {distancia.nome}: {distancia.valor}
          </Text>
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
    backgroundColor: "green",
    padding: 15,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
  },
  searchButton: {
    backgroundColor: "green",
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
    bottom: 30,
    right: 20,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 50,
    elevation: 5,
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
  },
  distanciaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
