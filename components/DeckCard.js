import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class DeckCard extends Component {
  render() {
    const deck = this.props.deck;
    return (
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#909399"
  }
});

export default DeckCard;
