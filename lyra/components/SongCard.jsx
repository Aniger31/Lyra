import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";

const SongCard = ({ song, onDeleteSong }) => {
  const [sound, setSound] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlayPause = async () => {
    if (!song.previewUrl) {
      Alert.alert("Error", "No hay vista previa disponible para esta canción.");
      return;
    }

    try {
      if (!sound) {
        setIsLoading(true);
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: song.previewUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        setIsLoading(false);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      Alert.alert("Error", "No se pudo reproducir el audio.");
      console.error(err);
    }
  };

  // cleanup
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Canción",
      `¿Seguro que quieres eliminar "${song.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => onDeleteSong(song.id) },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: song.artworkUrl }} style={styles.artwork} />

      <TouchableOpacity
        onPress={handlePlayPause}
        style={styles.playButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Icon name={isPlaying ? "pause" : "play"} size={18} color="#fff" />
        )}
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
        <Text style={styles.mood}>{song.mood}</Text>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Icon name="trash-2" size={20} color="#FF5733" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    alignItems: "center",
    position: "relative",
  },
  artwork: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },
  artist: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  mood: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#ffecec",
  },
  playButton: {
    position: "absolute",
    top: 22,
    left: 42,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default SongCard;
