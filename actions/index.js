export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const addDeck = deck => ({
  type: ADD_DECK,
  deck
});

export const addCard = (deck, card) => ({
  type: ADD_CARD,
  data: { deck, card }
});
