import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MOODS } from "../moods";

function SongForm({ onAddSong , allSongs}) {
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

    //Ocultar el teclado al inicial la busqueda
    Keyboard.dismiss();

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
      //Logica para la validacion de duplicados
      const isDuplicate = allSongs.some(song =>
        song.id === selectedTrack.trackId
      );

      if(isDuplicate){
        //Se notifica al usuario y detiene la ejecucion
        Alert.alert(
          "Canción Duplicada",
          `${selectedTrack.trackName} ya está en tu lista.`,
          [{text:"OK"}]
        );
        return; //se detiene la funcion
      }


      //Construccion de la nueva cancion
      const newSong = {
        id: selectedTrack.trackId,
        title: selectedTrack.trackName,
        artist: selectedTrack.artistName,
        artworkUrl: selectedTrack.artworkUrl100.replace("100x100bb", "300x300bb"), 
        mood: selectedMood,
      };

      onAddSong(newSong);

      //Ocultar el teclado antes de limpiar
      Keyboard.dismiss();

      
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
            
            <View style={styles.resultsContainer}>
              <View style={styles.selectionBar}>
              <Text style={styles.selectionText}>
                Clasificando: {selectedTrack.trackName}
              </Text>
              </View>

              <View style={styles.selectionRow}>
                <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMood}
                  onValueChange={setSelectedMood}
                >
                  {MOODS.filter((m) => m !== "All").map((mood) => (
                    <Picker.Item 
                        key={mood} 
                        label={mood} 
                        value={mood}>
                    </Picker.Item>
                  ))}
                </Picker>
                </View>

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
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 18,
    marginHorizontal: 12,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
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
  padding: 12,
  borderWidth: 1,
  borderColor: '#d1d1d6',
  borderRadius: 12,
  backgroundColor: '#fafafa',
  fontSize: 15,
},
  searchBtn: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 12,
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
  flexDirection: 'row',
  padding: 12,
  borderRadius: 12,
  backgroundColor: '#f2f2f7',
  marginBottom: 10,
},
trackItemSelected: {
  backgroundColor: '#dbeafe',
  borderColor: '#3b82f6',
  borderWidth: 1,
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
  backgroundColor: '#16a34a',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 12,
},
  addBtnText: {
    color: "white",
    fontWeight: "600",
  },
  selectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'space-between', // Para distribuir bien el Mood y el botón
},
pickerContainer: {
    // Esto simula una caja de formulario para el Picker
    flex: 1, // Ocupa el espacio disponible
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, // Bordes redondeados
    marginRight: 15,
    overflow: 'hidden', // Importante para el Picker en iOS
},

selectionBar: {
    backgroundColor: '#EBF4FF', // Fondo azul muy claro
    padding: 12,
    borderRadius: 12,
    marginBottom: 15, // Espacio antes de la fila del Picker
    borderWidth: 1,
    borderColor: '#3B82F6', // Borde azul claro
},
selectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D4ED8', // Texto azul oscuro
},
});


export default SongForm;