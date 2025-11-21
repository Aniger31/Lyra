import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MOODS } from "../moods";

function SongForm({ onAddSong }) {
  // Estados de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para canción seleccionada y mood
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedMood, setSelectedMood] = useState(MOODS[1]);

  // --- LLAMADA A LA API DE ITUNES ---
  const searchiTunes = async (e) => {
    e.preventDefault?.(); 

    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchResults([]);
    setSelectedTrack(null);

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=song&limit=10`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("La búsqueda falló. Intenta de nuevo.");
      }

      const data = await response.json();
      const tracks = data.results.filter((track) => track.artworkUrl100);

      setSearchResults(tracks);
      if (tracks.length === 0) {
        setError(`No se encontraron resultados para "${searchTerm}".`);
      }
    } catch (err) {
      setError(err.message || "Error desconocido al buscar.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- AÑADIR CANCIÓN ---
  const handleAddSong = () => {
    if (selectedTrack && selectedMood) {
      const newSong = {
        id: selectedTrack.trackId,
        title: selectedTrack.trackName,
        artist: selectedTrack.artistName,
        artworkUrl: selectedTrack.artworkUrl100.replace("100x100bb", "300x300bb"), 
        mood: selectedMood,
      };

      onAddSong(newSong);

      setTimeout (()=>{
        setSearchTerm("");
        setSearchResults([]);
        setSelectedTrack(null);
        setSelectedMood(MOODS[1]);
      },0);
      
    }
  };

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar y Clasificar Canción</Text>

      {/* INPUT + BOTÓN */}
      <View style={styles.row}>
        <TextInput
          placeholder="Título o Artista..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
          editable={!isLoading}
        />

        <TouchableOpacity
          onPress={searchiTunes}
          disabled={isLoading}
          style={styles.searchBtn}
        >
          <Text style={styles.searchBtnText}>
            {isLoading ? "Buscando..." : "Buscar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ERROR */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* RESULTADOS */}
      {searchResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.subtitle}>Selecciona un resultado:</Text>

          <ScrollView style={styles.resultsList}>
            {searchResults.map((track) => (
              <TouchableOpacity
                key={track.trackId}
                onPress={() => setSelectedTrack(track)}
                style={[
                  styles.trackItem,
                  selectedTrack?.trackId === track.trackId &&
                    styles.trackItemSelected,
                ]}
              >
                <Image
                  source={{ uri: track.artworkUrl100 }}
                  style={styles.art}
                />

                <View>
                  <Text style={styles.trackTitle}>{track.trackName}</Text>
                  <Text style={styles.trackArtist}>{track.artistName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* MOOD + AÑADIR */}
          {selectedTrack && (
            <View style={styles.footerBox}>
              <Text style={styles.classifying}>
                Clasificando: {selectedTrack.trackName}
              </Text>

              <View style={styles.moodRow}>
                <Picker
                  selectedValue={selectedMood}
                  onValueChange={setSelectedMood}
                  style={styles.picker}
                >
                  {MOODS.filter((m) => m !== "All").map((mood) => (
                    <Picker.Item 
                        key={mood} 
                        label={mood} 
                        value={mood}>
                    </Picker.Item>
                  ))}
                </Picker>

                <TouchableOpacity onPress={handleAddSong} style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Añadir al Mood</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}



// -------------------- ESTILOS --------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  searchBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
  },
  searchBtnText: {
    color: "white",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  resultsContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  resultsList: {
    maxHeight: 250,
  },
  trackItem: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  trackItemSelected: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  art: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
  },
  trackTitle: {
    fontWeight: "500",
    fontSize: 14,
  },
  trackArtist: {
    fontSize: 12,
    color: "gray",
  },
  footerBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#fff7cc",
    borderRadius: 10,
  },
  classifying: {
    fontWeight: "600",
    marginBottom: 8,
  },
  moodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  addBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: {
    color: "white",
    fontWeight: "600",
  },
});


export default SongForm;