import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import React, {useState} from 'react';
import useLocalStorage from './useAsyncStorage';
import { MOODS } from './moods';

import SongForm from './components/SongForm';
//import FilterBar from './components/FiterBar';
//import SongList from './components/SongList';


 export default function App() {
  //Hook para almacenar la lista de canciones

  const [songs, setSongs] = useLocalStorage('mood-mixer-songs', []);

  //Estado inicial de nuestros moods
  const [activeFilter, setActiveFilter] = useState('All');

  //Funcion CRUD 
  //Agregar cancion

  const addSong = (newSong) =>{
    setSongs(prevSongs => [...prevSongs, {...newSong, id: Date.now()}]);
  };

  //Logica para filtrar la lista antes de mostrarla
  const filteredSongs = songs.filter(song => {
    if(activeFilter === 'All') return true;
    return song.mood === activeFilter;
  });


  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lyra</Text>

      <SongForm onAddSong={addSong} />

      <View style={styles.listBox}>
        <Text>Lista de Canciones:</Text>
        <Text>{JSON.stringify(songs, null, 2)}</Text>
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  listBox: {
    marginTop: 32,
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  }
});