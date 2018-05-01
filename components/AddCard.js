import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import {
  Text,
  View,
  StyleSheet,
  Platform,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Button
} from "react-native";

import { white } from "../colors";
import { addCard } from "../API";

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return { title: `Add Card of ${title}` };
  };

  state = {
    question: "",
    answer: ""
  };

  handleInput = (target, value) => {
    this.setState({
      [target]: value
    });
  };

  handelSubmit = () => {
    const { question, answer } = this.state;
    const card = { question: question.trim(), answer: answer.trim() };
    this.props.dispatch(actions.addCard(this.props.deck, card));
    addCard(this.props.deck, card);
    this.props.navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, padding: 20 }}>
          <KeyboardAvoidingView behavior={"padding"}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleInput("question", text)}
              value={this.state.question}
              placeholder="input the Question"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleInput("answer", text)}
              value={this.state.answer}
              placeholder="input the Answer"
            />
            <Button
              title="Submit"
              onPress={() => {
                this.handelSubmit();
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    deck: state[title]
  };
};

export default connect(mapStateToProps)(AddCard);
