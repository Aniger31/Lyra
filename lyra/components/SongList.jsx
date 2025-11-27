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
 emptyContainer: {
  padding: 40,
  alignItems: 'center',
  backgroundColor: '#f2f2f7',
  borderRadius: 16,
  margin: 20,
},
emptyText: {
  fontSize: 17,
  fontWeight: '600',
  color: '#444',
  textAlign: 'center',
},
emptyTextSecondary: {
  fontSize: 14,
  color: '#888',
  marginTop: 6,
},

});

export default SongList;