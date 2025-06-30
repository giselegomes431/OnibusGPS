import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Pressable } from "react-native";
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SchedulesScreen.styles';
import { pontosDeOnibus } from '../../constants/mapData';
import { busLines } from '../../constants/scheduleData';
import { BusStop } from '../../types/map';
import { StatusBar } from 'expo-status-bar';

type Day = 'weekdays' | 'saturdays' | 'sundays';

export default function SchedulesScreen() {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [isListVisible, setListVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<Day>('weekdays');

  const relevantLines = useMemo(() => {
    if (!selectedStop) return [];
    return busLines.filter(line => line.stops.includes(selectedStop.nome));
  }, [selectedStop]);

  const handleSelectStop = (ponto: BusStop) => {
    setSelectedStop(ponto);
    setListVisible(false);
  };

  const dayPtBr = (day: Day) => {
    switch (day) {
      case 'weekdays': return 'Dias Úteis';
      case 'saturdays': return 'Sábados';
      case 'sundays': return 'Domingos e Feriados';
    }
  }

  return (
    <View style={styles.container}>
      {/* 2. Conteúdo Principal Rolável */}
      <ScrollView style={styles.resultsContainer}>
        {!selectedStop ? (
          <Text style={styles.placeholderText}>Selecione um ponto para ver as linhas e horários.</Text>
        ) : relevantLines.length === 0 ? (
          <Text style={styles.placeholderText}>Nenhuma linha encontrada para este ponto.</Text>
        ) : (
          <>
            <View style={styles.daySelector}>
              {(['weekdays', 'saturdays', 'sundays'] as Day[]).map(day => (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayButton, activeDay === day && styles.activeDayButton]}
                  onPress={() => setActiveDay(day)}
                >
                  <Text style={[styles.dayButtonText, activeDay === day && styles.activeDayButtonText]}>
                    {dayPtBr(day)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {relevantLines.map(line => (
              <View key={line.id} style={styles.lineContainer}>
                <Text style={styles.lineTitle}>{line.name}</Text>
                <View style={styles.timesContainer}>
                  {line.schedule[activeDay].length > 0 ? (
                    line.schedule[activeDay].map(time => (
                      <Text key={time} style={styles.timeText}>{time}</Text>
                    ))
                  ) : (
                    <Text style={styles.noTimeText}>Não há horários para este dia.</Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* 3. Camada de Blur (FLUTUANTE) - note a condição correta */}
      {isListVisible && (
        <Pressable
          style={styles.backdropContainer}
          onPress={() => setListVisible(false)}
        >
          <BlurView
            intensity={10}
            tint="dark" // 'light' costuma ficar melhor em fundos claros
            style={styles.blurView}
          />
        </Pressable>
      )}

      {/* 4. Barra de Busca (FLUTUANTE) */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={() => setListVisible(!isListVisible)}>
          <Text style={styles.searchText}>
            {selectedStop ? selectedStop.nome : 'Escolha um ponto de ônibus'}
          </Text>
        </TouchableOpacity>
        {isListVisible && (
          <FlatList
            data={pontosDeOnibus}
            keyExtractor={(item) => item.nome}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectStop(item)}>
                <Ionicons name="location-outline" size={20} color="#666" style={{ marginRight: 10 }} />
                <Text style={styles.primaryText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}