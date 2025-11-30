import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MOODS } from "../moods";

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {MOODS.map((mood) => (
        <TouchableOpacity
          key={mood}
          onPress={() => setActiveFilter(mood)}
          style={[
            styles.moodButton,
            activeFilter === mood && styles.activeMoodButton,
          ]}
        >
          <Text
            style={[
              styles.moodText,
              activeFilter === mood && styles.activeMoodText,
            ]}
          >
            {mood}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  moodButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: "#f2f2f7",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  activeMoodButton: {
    backgroundColor: "#1D4ED8",
  },
  moodText: {
    color: "#4a4a4a",
    fontWeight: "600",
  },
  activeMoodText: {
    color: "white",
    fontWeight: "700",
  },
});

export default FilterBar;
