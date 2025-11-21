import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { MOODS } from "../moods";

const FilterBar = ({ activeFilter, setActiveFilter}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle = {styles.container}
        >
            {MOODS.map((mood) => (
                <TouchableOpacity
                    key={mood}
                    onPress={() => setActiveFilter(mood)}
                    style ={[
                        styles.moodButton,
                        activeFilter === mood && styles.activeMoodButton,
                    ]}
                >
                    <Text style={[
                        styles.moodText,
                        activeFilter === mood && styles.activeMoodText,

                    ]}>
                        {mood}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles =StyleSheet.create({
    container:{
        paddingVertical:10,
        paddingHorizontal:5,
        borderBottomWidth:1,
        borderBottomColor: '#e0e0e0',
    },
    moodButton:{
        paddingHorizontal:15,
        paddingVertical: 8,
        borderRadius:20,
        marginHorizontal:5,
        backgroundColor: '#f0f0f0',
    },
    activeMoodButton:{
        backgroundColor:'#2582E5' //color azul para cuando este activo
    },
    moodText:{
        color:'#333',
        fontWeight:'500',
        fontSize:14,
    },
    activeMoodText:{
        color:'white',
        fontWeight:'bold',
    },
});

export default FilterBar;