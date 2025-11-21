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
    card:{
        flexDirection:'row',
        backgroundColor: '#ffffff',
        padding:15,
        marginVertical:8,
        marginHorizontal:10,
        borderRadius:10,
        shadowColor:'#000',
        shadowOffset: {width:0,height:2},
        shadowOpacity:0.1,
        shadowRadius: 4,
        elevation: 3, //Shadow para android
        alignItems: 'center',
    },
    artwork: {
        width:60,
        height:60,
        borderRadius:5,
    },
    infoContainer:{
        flex:1,
        marginLeft:15,
        marginRight:10,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        color:'#333',
    },
    artist:{
        fontSize:14,
        color:'#666',
        marginTop:2,
    },
    mood:{
        fontSize: 12,
        color: '#2582E5',
        fontWeight: '600',
        marginTop:5,
    },
    deleteButton:{
        padding:8,
    },
    
});

export default SongCard;