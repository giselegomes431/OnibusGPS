import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  // Pega localização inicial
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

  // Função de busca ao apertar o botão de lupa
  const handleSearch = async () => {
    if (!search) return;
  
    const viewbox = "-40.0,-15.0,-38.0,-14.0"; // exemplo
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      search
    )}&format=json&addressdetails=1&limit=10&viewbox=${viewbox}&bounded=1`;
  
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "MeuAppGPS/1.0 (contato@exemplo.com)",
          "Accept-Language": "pt-BR",
        },
      });
  
      if (!res.ok) {
        console.log("Erro na resposta da API:", res.status);
        return;
      }
  
      const data = await res.json();
  
      if (data.length === 0) {
        console.log("Nenhum resultado encontrado");
      }
  
      setSuggestions(data);
    } catch (error) {
      console.error("Erro na busca:", error.message);
    }
  };
  

  // Seleciona sugestão
  const handleSelectLocation = (item) => {
    const newLocation = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    };
    setLocation(newLocation);
    setSearch(item.display_name);
    setSuggestions([]);

    mapRef.current?.animateToRegion(
      {
        ...newLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  // Voltar para localização atual
  const handleGoToCurrentLocation = () => {
    if (currentLocation) {
      setLocation(currentLocation);
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

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
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
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Para onde deseja ir?"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Sugestões */}
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id.toString()}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectLocation(item)}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text style={styles.primaryText}>
                    {item.address?.road || item.display_name.split(",")[0]}
                  </Text>
                  <Text style={styles.secondaryText}>
                    {item.address?.city ||
                      item.address?.town ||
                      item.display_name.split(",").slice(1).join(",")}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Mapa */}
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
        >
          <Marker coordinate={location} title="Local Atual ou Selecionado" />
        </MapView>
      )}

      {/* Botão voltar para localização atual */}
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  searchButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
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
  secondaryText: {
    fontSize: 12,
    color: "#777",
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
});
