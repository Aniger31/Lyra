import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';


import React, {useState, useEffect} from 'react';
import * as SplashScreen from "expo-splash-screen";
import useAsyncStorage from './useAsyncStorage';


import SongForm from './components/SongForm';
import FilterBar from './components/FilterBar';
import SongList from './components/SongList';


function App() {
  //Hook para almacenar la lista de canciones

  const [songs, setSongs, isLoaded] = useAsyncStorage('mood-mixer-songs', []);

  useEffect(() => {
      SplashScreen.preventAutoHideAsync(); // evita que se oculte el splash screen de forma predeterminada
      setTimeout(() => {
        SplashScreen.hideAsync(); // oculta después de 2s
      }, 2000);
    }, []);
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

  //Calcular el mood mas dominante
  const getDominantMood = () => {
    if (songs.length === 0) return null;

    const moodCounts = songs.reduce((acc, song) => {
      acc[song.mood] = (acc[song.mood] || 0) + 1;
      return acc;
    } ,{});
    let dominantMood = null;
    let maxCount = 0;
    for(const mood in moodCounts){
      if(moodCounts[mood] > maxCount){
        maxCount = moodCounts[mood];
        dominantMood = mood;
      }
    }
    return dominantMood;
  };
  const dominantMood = getDominantMood();

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
      {dominantMood && (
        <View style = {styles.dominantMoodContainer}>
            <Text style = {styles.dominantMoodText}> Tu Mood Dominante es: </Text>
            <Text style = {styles.dominantMoodName}>{dominantMood}</Text>
        </View>
      )}

      <SongForm onAddSong={addSong} allSongs={songs} />
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
  header: {
  paddingHorizontal: 20,
  paddingVertical: 14,
  backgroundColor: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(12px)', // No siempre soportado, opcional
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 0,
},
title: {
  fontSize: 28,
  fontWeight: '700',
  textAlign: 'center',
  color: '#1D4ED8',
  letterSpacing: 0.5,
},
safeArea: {
  flex: 1,
  backgroundColor:'#fafafa',
},
dominantMoodContainer:{
  padding: 15,
  marginHorizontal:15,
  marginTop:10,
  borderRadius:12,
  backgroundColor:'#fff',
  borderLeftWidth:5,
  borderLeftColor:'#4F46E5',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  shadowColor:'#000',
  shadowOpacity:0.05,
  shadowRadius:3,
  elevation:1,
},

dominantMoodText:{
  fontSize:14,
  color:'#6B7280',
},
dominantMoodName:{
  fontSize:18,
  fontWeight:'bold',
  color:'#4F46E5',
},
});

export default App;