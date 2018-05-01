import {ADD_CARD, ADD_DECK} from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD:
      const {deck, card} = action.data;
      return {
        ...state,
        [deck.title]:{
          ...deck,
          questions: deck.questions.concat([card])
        }
      }
    case ADD_DECK:
      return {...state, ...action.deck};
    default:
      return state;
  }
}

export default decks;