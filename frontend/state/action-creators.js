// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import { MOVE_CLOCKWISE } from "./action-types";
import { MOVE_COUNTERCLOCKWISE } from "./action-types";
import { 
  SET_INFO_MESSAGE, 
  SET_SELECTED_ANSWER, 
  SET_QUIZ_INTO_STATE, 
  INPUT_CHANGE, 
  RESET_FORM } 
  from "./action-types";

export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE
  };
}

export function moveCounterClockwise() { 
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function selectAnswer(id) { 
  return {
    type: SET_SELECTED_ANSWER,
    payload: id
  };
}
  
export function setMessage(message) { 
  return {
    type:SET_INFO_MESSAGE,
    payload: message
  };
}

export function setQuiz(quiz) { 
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  };
}

export function inputChange(value) {
  return {
    type: INPUT_CHANGE,
    payload: value,
  }
 }

export function resetForm() {
  return {
    type: RESET_FORM
  }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch(setQuiz(res.data));
        // dispatch(setMessage(res.data.message));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
      .then(res => {
        dispatch(fetchQuiz());
        dispatch(setMessage(res.data.message));
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new')
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question} is a great question!`));
      dispatch(resetForm())
      console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
