import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  // console.log("STATE:", props.form)

  const { inputChange, form, postQuiz, resetForm} = props;

  const onInputChange = evt => {
    props.form.newQuestion = evt.target.value
    props.inputChange(newQuestion)
  }

  const onTrueChange = evt => {
    props.form.newTrueAnswer = evt.target.value
    props.inputChange(newTrueAnswer)
  }

  const onFalseChange = evt => {
    props.form.newFalseAnswer = evt.target.value
    props.inputChange(newFalseAnswer)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    postQuiz(
      form.newQuestion,
      form.newTrueAnswer,
      form.newFalseAnswer,
    );
    resetForm({
      newQuestion: '',
      newTrueAnswer: '',
      newFalseAnswer: ''
    }
    );
    
  }

  const enabled = form.newQuestion.trim().length > 1 && form.newTrueAnswer.trim().length > 1 && form.newFalseAnswer.trim().length > 1;

  // props.form.newQuestion.trim().length > 0 && props.form.newTrueAnswer.trim().length > 0 && props.form.newFalseAnswer.trim().length > 0 ? false : true 

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        onChange={onInputChange} 
        id="newQuestion" 
        placeholder="Enter question"   
        value={props.form.newQuestion}
      />

      <input 
        maxLength={50} 
        onChange={onTrueChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer" 
        value={props.form.newTrueAnswer}
      />

      <input 
        maxLength={50} 
        onChange={onFalseChange} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
        value={props.form.newFalseAnswer}
      />

      <button id="submitNewQuizBtn" disabled={!enabled}>Submit new quiz</button>
    </form>
  )
}

export default connect((state) => state, actionCreators)(Form)
