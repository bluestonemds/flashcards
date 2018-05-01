import React from "react";
import {connect} from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import DeckCard from "./DeckCard";

class CardDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title: `${title}` };
  };

  backTo = route => {
    this.props.navigation.navigate(route, {
      title: this.props.deck.title
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <DeckCard deck={this.props.deck} />
        <View style={{ marginBottom: 10 }}>
          <Button title="Add Card" onPress={() => this.backTo("AddCard")} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button title="Start Quiz" onPress={() => this.backTo("Quizs")} />
        </View>
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
  }
});

const mapStateToProps = (state, {navigation}) => {
  const {title} = navigation.state.params;
  return {
    deck: state[title]
  }
};

export default connect(mapStateToProps)(CardDetail);
