import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

const SongCard = ({song, onDeleteSong}) => {

    //Funcion de confirmacion para eliminar
    const handleDelete = () => {
        Alert.alert(
            "Eliminar Canción",
            `Estas seguro de que quieres eliminar "${song.title}" ?`,
            [
                {text: "Cancelar", style:"cancel"},
                {text: "Eliminar", onPress: () => onDeleteSong(song.id)}
            ]
        );
    };

    return (
        <View style ={styles.card}>
            <Image
                source={{uri: song.artworkUrl}}
                style={styles.artwork}
            ></Image>
            <View style={styles.infoContainer}> 
                <Text style={styles.title} numberOfLines={1}>
                    {song.title}
                </Text>
                <Text style={styles.artist} numberOfLines={1}>
                    {song.artist}
                </Text>
                <Text style={styles.mood}>
                    {song.mood}
                </Text>
            </View>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Icon name="trash-2" size={20} color="#FF5733"></Icon>
            </TouchableOpacity>
        </View>
    );
};

const styles =StyleSheet.create({
card: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  padding: 16,
  marginVertical: 10,
  marginHorizontal: 14,
  borderRadius: 16,
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
  alignItems: 'center',
},
artwork: {
  width: 70,
  height: 70,
  borderRadius: 10,
},
title: {
  fontSize: 17,
  fontWeight: '600',
  color: '#111',
},
artist: {
  fontSize: 14,
  color: '#555',
  marginTop: 2,
},
mood: {
  marginTop: 6,
  fontSize: 13,
  fontWeight: '600',
  color: '#1D4ED8',
},
deleteButton: {
  padding: 8,
  borderRadius: 10,
  backgroundColor: '#ffecec',
},

    
});

export default SongCard;