import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  Keyboard
} from "react-native";
import * as API from "../API";

class AddDeck extends Component {
  static navigationOptions = {
    title: "Add Deck"
  };

  state = {
    text: ""
  };

  submit = () => {
    const title = this.state.text;
    API.addDeck(title)
      .then(() => {
        this.props.dispatch(
          actions.addDeck({
            [title.trim()]: {
              title: title.trim(),
              questions: []
            }
          })
        );
        Keyboard.dismiss();
      })
      .then(() => {
        this.props.navigation.navigate("CardDetail", { title: title.trim() });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 48, marginBottom: 40 }}>
          What the title of your deck?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Submit"
          style={styles.button}
          onPress={() => this.submit()}
        />
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
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20
  }
});

export default connect()(AddDeck);
