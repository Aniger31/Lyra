import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAsyncStorage from "./useAsyncStorage";

import SongForm from "./components/SongForm";
import FilterBar from "./components/FilterBar";
import SongList from "./components/SongList";
import { Audio } from "expo-av";

function App() {
  const [songs, setSongs, isLoaded] = useAsyncStorage("mood-mixer-songs", []);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1500);
  }, []);

  useEffect(() => {
    // Permitir audio por altavoz y en modo silencio (iOS)
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true, // Suena aunque el iPhone esté en silencio
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false, // Asegura altavoz en Android
    });
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");

  // Agregar canción — versión segura
  const addSong = (newSong) => {
    setSongs((prev) => [...prev, newSong]);
  };

  //Eliminar cancion
  const deleteSong = (idToDelete) => {
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== idToDelete));
  };

  // Filtro
  const filteredSongs = songs.filter((song) => {
    if (activeFilter === "All") return true;
    return song.mood === activeFilter;
  });

  // Mood dominante
  const getDominantMood = () => {
    if (songs.length === 0) return null;

    const moodCounts = songs.reduce((acc, song) => {
      acc[song.mood] = (acc[song.mood] || 0) + 1;
      return acc;
    }, {});

    let dominantMood = null;
    let maxCount = 0;

    for (const mood in moodCounts) {
      if (moodCounts[mood] > maxCount) {
        maxCount = moodCounts[mood];
        dominantMood = mood;
      }
    }

    return dominantMood;
  };

  const dominantMood = getDominantMood();

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2582E5" />
        <Text style={{ marginTop: 10 }}>Cargando canciones...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Lyra</Text>
      </View>

      {dominantMood && (
        <View style={styles.dominantMoodContainer}>
          <Text style={styles.dominantMoodText}>Tu Mood Dominante es:</Text>
          <Text style={styles.dominantMoodName}>{dominantMood}</Text>
        </View>
      )}

      <SongForm onAddSong={addSong} allSongs={songs} />

      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <SongList songs={filteredSongs} onDeleteSong={deleteSong} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1D4ED8",
  },
  dominantMoodContainer: {
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderLeftWidth: 5,
    borderLeftColor: "#4F46E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  dominantMoodText: {
    fontSize: 14,
    color: "#6B7280",
  },
  dominantMoodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
  },
});

export default App;
