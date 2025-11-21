import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import SongCard from "./SongCard";

const SongList = ({songs, onDeleteSong}) => {

    //Funcion para renderizar cada item en la FlatList
    const renderSong = ({item}) => (
        <SongCard song={item} onDeleteSong={onDeleteSong}/>
    );

    return (
        <View style={styles.container}>
            {songs.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        ¡Aun no hay canciones en este estado de ánimo!
                    </Text>
                    <Text style={styles.emptyTextSecondary}>
                        Usa el formulario de arriba para añadir una.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={songs}
                    renderItem={renderSong}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                ></FlatList>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    listContent:{
        paddingBottom:20, //Espacio al final de la lista
    },
    emptyContainer:{
        padding:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f9f9f9',
        borderRadius:10,
        margin:20,
    },
    emptyText:{
        fontSize:16,
        fontWeight:'bold',
        color:'#666',
        textAlign:'center',
    },
    emptyTextSecondary:{
        fontSize:14,
        color:'#999',
        marginTop:5,
    }
});

export default SongList;