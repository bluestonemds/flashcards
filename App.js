import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Text, View } from "react-native";
import { Platform } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { blue, white, purple } from "./colors";
import Tabs from "./TabNavigator";
import reducer from './reducers';
import CardDetail from "./components/CardDetail";
import AddCard from "./components/AddCard";
import Quizs from "./components/Quizs";
import { setLocalNotification } from "./API";

const RootStackNavigator = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    },
    CardDetail: {
      screen: CardDetail
    },
    AddCard: {
      screen: AddCard
    },
    Quizs: {
      screen: Quizs
    }
  },
  {
    initialRouteName: "Tabs"
  }
);

class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <RootStackNavigator />
      </Provider>
    );
  }
}

export default App;
