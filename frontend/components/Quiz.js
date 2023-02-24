import React from 'react'
import { selectAnswer, setQuiz } from '../state/action-creators'

export default function Quiz(props) {
  const {selectAnswer, setQuiz, quiz, selectedAnswer } = props;

  const handleClick = (id) => {
    selectAnswer(id);
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        true ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="selectedanswer">
                A function
                <button onClick={handleClick}>
                  {/* {selectedAnswer === quiz.answers[0].id ? "SELECTED" : "Select"} */}
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onSubmit={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

// {selectedAnswer === quiz.answers[0].id ? "SELECTED" : "Select"}
// `${selectedAnswer === quiz.answers[0].id ? "answer selected" : "answer"}`