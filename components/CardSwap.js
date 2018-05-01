import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

class CardSwap extends Component {
  state = {
    currentStatus: "display answer",
    currentDisplay: this.props.card.question
  };

  componentWillReceiveProps(props) {
    this.setState({
      currentDisplay: props.card.question
    });
  }

  handelSwap = () => {
    this.state.currentStatus === "display question"
      ? this.setState({
          currentStatus: "display answer",
          currentDisplay: this.props.card.question
        })
      : this.setState({
          currentStatus: "display question",
          currentDisplay: this.props.card.answer
        });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.currentDisplay}</Text>
        <TouchableOpacity
          style={styles.button}
          title={this.state.currentStatus}
          onPress={() => this.handelSwap()}
        >
          <Text style={{ color: "#ff0000" }}>{this.state.currentStatus} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    marginBottom: 20,
    fontSize: 36
  },
  container: {
    padding: 10,
  },
  button: {
    alignItems: "center"
  }
});

export default CardSwap;
