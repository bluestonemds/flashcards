import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const InitialState = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};

export const getDecks = () =>
  AsyncStorage.getItem("Flashcards:decks").then(result => {
    if (result) {
      return JSON.parse(result);
    } else {
      AsyncStorage.setItem("Flashcards:decks", JSON.stringify(InitialState));
      return InitialState;
    }
  });

export const addDeck = title =>
  AsyncStorage.mergeItem(
    "Flashcards:decks",
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );

export const addCard = (deck, card) =>
  AsyncStorage.mergeItem(
    "Flashcards:decks",
    JSON.stringify({
      [deck.title]: {
        questions: deck.questions.concat([card])
      }
    })
  );

export function setLocalNotification() {
  AsyncStorage.getItem("Flashcards:notification")
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: "day"
              }
            );

            AsyncStorage.setItem(
              "Flashcards:notification",
              JSON.stringify(true)
            );
          }
        });
      }
    });
}

export const createNotification = () => ({
  title: "don't forget learn",
  body: "👋 learn new things will be fun",
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  }
});
