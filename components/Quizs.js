import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import CardSwap from "./CardSwap";
import { red, green } from "../colors";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

class Quizs extends Component {
  static navigationOptions = {
    title: "quiz"
  };

  state = {
    currentCard: this.props.deck.questions[0],
    indexOf: 0,
    total: this.props.deck.questions.length,
    correct: 0,
    inCorrect: 0
  };

  clearLocalNotification = () => {
    return AsyncStorage.removeItem("Flashcards:notification").then(
      Notifications.cancelAllScheduledNotificationsAsync
    );
  };

  handelPress = () => {
    const random = this.getRandomInt(2);
    let correct, inCorrect;
    if (random === 1) {
      correct = this.state.correct + 1;
      inCorrect = this.state.inCorrect;
    } else {
      correct = this.state.correct;
      inCorrect = this.state.inCorrect + 1;
    }
    if (this.state.indexOf === this.state.total - 1) {
      this.setState({
        correct: correct,
        inCorrect: inCorrect,
        indexOf: this.state.indexOf + 1
      });
      this.clearLocalNotification();
    } else {
      this.setState((preState, props) => {
        return {
          indexOf: preState.indexOf + 1,
          currentCard: this.props.deck.questions[preState.indexOf + 1],
          correct: correct,
          inCorrect: inCorrect
        };
      });
    }
  };

  getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  restart = () => {
    this.setState({
      currentCard: this.props.deck.questions[0],
      indexOf: 0,
      total: this.props.deck.questions.length,
      correct: 0,
      inCorrect: 0
    });
  };

  goBack = () => {
    this.props.navigation.navigate("CardDetail", {
      title: this.props.deck.title,
      deck: this.props.deck
    });
  };

  render() {
    return (
      <View>
        {this.state.indexOf !== this.state.total ? (
          <View>
            <Text style={{ fontSize: 16, padding: 20 }}>
              {this.state.indexOf + 1} / {this.props.deck.questions.length}
            </Text>
            <CardSwap card={this.state.currentCard} />
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => this.handelPress()}
                style={styles.correctButton}
              >
                <Text style={{ color: "#444" }}>correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handelPress()}
                style={styles.inCorrectButton}
              >
                <Text style={{ color: "#fefefe" }}>InCorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            <View style={{ padding: 20 }}>
              <Text style={{ textAlign: "center" }}>finished!</Text>
              {this.props.deck.questions.length > 0 && (
                <Text style={{ textAlign: "center" }}>
                  correct : {this.state.correct} , percent:{" "}
                  {(this.state.correct / this.state.total).toFixed(4) * 100}%
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => this.restart()}
              style={styles.button}
            >
              <Text style={{ color: "#000" }}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.goBack()}
              style={styles.button}
            >
              <Text style={{ color: "#000" }}>back to deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#DDDDDD",
    marginBottom: 10
  },
  correctButton: {
    alignItems: "center",
    backgroundColor: green,
    padding: 10,
    marginBottom: 10
  },
  inCorrectButton: {
    alignItems: "center",
    backgroundColor: red,
    padding: 10,
    marginBottom: 10
  },
  buttons: {
    padding: 50
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    deck: state[title]
  };
};

export default connect(mapStateToProps)(Quizs);
