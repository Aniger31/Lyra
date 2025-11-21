import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';


import React, {useState} from 'react';
import useAsyncStorage from './useAsyncStorage';


import SongForm from './components/SongForm';
import FilterBar from './components/FilterBar';
import SongList from './components/SongList';


function App() {
  //Hook para almacenar la lista de canciones

  const [songs, setSongs, isLoaded] = useAsyncStorage('mood-mixer-songs', []);

  //Estado inicial de nuestros moods
  const [activeFilter, setActiveFilter] = useState('All');

  //Funcion CRUD 
  //Agregar cancion

  const addSong = (newSong) =>{
    setSongs(prevSongs => [...prevSongs, {...newSong, id: Date.now()}]);
  };

  const deleteSong =(idToDelete) =>{
    setSongs(prevSongs => prevSongs.filter(song => song.id !== idToDelete));
  }

  //Logica para filtrar la lista antes de mostrarla
  const filteredSongs = songs.filter(song => {
    if(activeFilter === 'All') return true;
    return song.mood === activeFilter;
  });

  if(!isLoaded){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color= "#2582E5"/>
        <Text style={{marginTop:10}}>Cargando canciones...</Text>
      </View>
    );
  }

  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Lyra</Text>
      </View>

      <SongForm onAddSong={addSong} />
      {/* Barra de filtros */ }
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/**Lista de Canciones filtradas */}
      <SongList
        songs={filteredSongs}
        onDeleteSong={deleteSong}
      />
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor:'#f5f5f5',
  },
  header:{
    paddingHorizontal:15,
    paddingTop:10,
    paddingBottom:5,
    backgroundColor:'#fff',
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    color:'#2582E5',
  },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default App;