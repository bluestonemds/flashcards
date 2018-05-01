import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import * as API from "../API";
import DeckCard from "./DeckCard";
import { addDeck } from "../actions";

class ListDeckCards extends Component {
  static navigationOptions = {
    title: "首页"
  };

  componentDidMount() {
    API.getDecks()
      .then(data => {
        this.props.dispatch(addDeck(data));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {Object.values(this.props.decks).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("CardDetail", {
                  title: item.title
                })
              }
            >
              <DeckCard deck={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10
  }
});

const mapStateToProps = (decks) => ({decks});

export default connect(mapStateToProps)(ListDeckCards);
