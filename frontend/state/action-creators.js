// ❗ You don't need to add extra action creators to achieve MVP
import { 
  INPUT_CHANGE, 
  MOVE_CLOCKWISE, 
  MOVE_COUNTERCLOCKWISE, 
  RESET_FORM, SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, 
  SET_SELECTED_ANSWER 
} from "./action-types"
import axios from "axios";

export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE })
}

export function moveCounterClockwise() {
  return ({ type: MOVE_COUNTERCLOCKWISE })
}

export function selectAnswer(answer) {
  return ({ type: SET_SELECTED_ANSWER, payload: answer })
}

export function setMessage(message) {
  return ({ type: SET_INFO_MESSAGE, payload: message })
}

export function setQuiz(question) {
  return ({ type: SET_QUIZ_INTO_STATE, payload: question })
}

export function inputChange(key, val) {
  return ({type: INPUT_CHANGE, key, val })
}

export function resetForm() { 
  return ({ type: RESET_FORM})
}

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
  dispatch(setQuiz(null))
  axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch(setQuiz({
        quiz_id: res.data.quiz_id,
        question: res.data.question,
        aZero: res.data.answers[0].text,
        aZeroId: res.data.answers[0].answer_id,
        aOne: res.data.answers[1].text,
        aOneId: res.data.answers[1].answer_id
      }));
    })
}

export function postAnswer(info) {
  return function (dispatch) {
    dispatch(selectAnswer(null))
    axios.post('http://localhost:9000/api/quiz/answer', info)
    .then(res => {
      dispatch(setMessage(res.data.message)); 
      dispatch(fetchQuiz());
    });
  }
}

export function postQuiz(newQuestion) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', newQuestion)
    .then(res => {
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
      dispatch(resetForm())
    })
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state