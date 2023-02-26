import React from 'react'
import { connect } from 'react-redux'
import { postQuiz, inputChange, resetForm} from '../state/action-creators'


function Form(props) {
  
  const { newFalseAnswer, newQuestion, newTrueAnswer, postQuiz, inputChange} = props;

  const onChange = evt => {
    inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = (evt) => {
    console.log(newFalseAnswer)
    evt.preventDefault();
    postQuiz({
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer
    });
    resetForm();
  }

  return (
    <form id="form" >
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        id="newQuestion"
        value={newQuestion}
        onChange={onChange}
        placeholder="Enter question"
      />

      <input
        maxLength={50}
        onChange={onChange}
        value={newTrueAnswer}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />

      <input
        maxLength={50}
        onChange={onChange}
        value={newFalseAnswer}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />

      <button id="submitNewQuizBtn" onClick={onSubmit} disabled={newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0 ? false : true}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
    state: state.form
  }
}

export default connect(mapStateToProps, { resetForm, inputChange, postQuiz })(Form)