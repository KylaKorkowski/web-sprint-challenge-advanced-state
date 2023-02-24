import React from 'react'
import { useEffect } from 'react';
// import { quiz } from '../state/action-creators'
import * as actions from '../state/action-creators'
import { connect } from 'react-redux';

export function Quiz(props) {
  const {selectAnswer, setQuiz, quiz, selectedAnswer, postAnswer, fetchQuiz} = props;

  useEffect(() => {
   fetchQuiz();
  }, []);


  const handleClick = (id) => {
    selectAnswer(id);
  }
  
  // const question_id = props.question;

  // const answers = props.quiz.map(a => {
  //   return a.text
  // })

  // const answers_id = props.quiz.map(id => {
  //   return id.answer_id
  // })

  const submitHandler = evt => {
    evt.preventDefault();
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer,
    });
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}`}>
                {quiz.answers[0].text}
                <button onClick={() => handleClick(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : "answer"}`}>
              {quiz.answers[1].text}
                <button onClick={() => handleClick(quiz.answers[1].answer_id)}>
                {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onSubmit={submitHandler} disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect((state) => state, actions)(Quiz)

// {selectedAnswer === quiz.answers[0].id ? "SELECTED" : "Select"}
// `${selectedAnswer === quiz.answers[0].id ? "answer selected" : "answer"}`

// disabled={`${props.selectedAnswer}`} onSubmit={() => props.postAnswer(quiz_id, props.selectedAnswer === answer_id[0], props.selectedAnswer === answer_id[1] ? "" : "{true}")}

