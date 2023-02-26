// ❗ You don't need to add extra reducers to achieve MVP
import { 
  INPUT_CHANGE, 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER 
} from './action-types'
import { combineReducers } from 'redux'

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      state < 5 ? state = state + 1 : state = 0;
       return state;
    case MOVE_COUNTERCLOCKWISE:
      state > 0 ? state = state - 1 : state = 5;
      return state;
  }
  return state;
}

const initialQuizState = {
  quiz_id: null,
  question: null,
  aZero: null,
  aOne: null,
  aZeroId: null,
  aOneId: null
}
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return { ...state, question: action.payload }
    default:
      return state;
  }
}

const initialSelectedAnswerState = { answer: null }
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return {...state, answer: action.payload}
    default:
      return state;
  }
}

const initialMessageState = {message: ''}
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return { ...state, message: action.payload }
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}

function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {...state, [action.key]: action.val}
    case RESET_FORM:
      return {
        ...state,   
        newQuestion: '', 
        newTrueAnswer: '', 
        newFalseAnswer: ''
      };
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })