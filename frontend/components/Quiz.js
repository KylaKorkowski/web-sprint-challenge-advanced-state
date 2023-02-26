import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {

  const { question, fetchQuiz, answer, selectAnswer, postAnswer} = props;

  useEffect(() => {
    if (question === null) {
      fetchQuiz();
    }
  });


  const clickAnswer = (evt) => {
    console.log(question.quiz_id);
    selectAnswer(evt.target.id);
  }

  const submitAnswer = () => {
    postAnswer({quiz_id: question.quiz_id, answer_id: answer})
  }

  return (
    <div id="wrapper">
      {question || answer ? (
        <>
          <h2>{`${question.question}`}</h2>

          <div id="quizAnswers">
            <div className= {`answer${answer === question.aZeroId ? ' selected' : ''}`}
            >
              {`${question.aZero}`}
              <button id={question.aZeroId} onClick={clickAnswer}>
                {answer === question.aZeroId ? "SELECTED" : "Select"}
              </button>
            </div>

            <div className= {`answer${answer === question.aOneId ? ' selected' : ''}`} >
              {`${question.aOne}`}
              <button id={question.aOneId} onClick={clickAnswer}>
              { answer === question.aOneId ? "SELECTED" : "Select"}
              </button>
            </div>
          </div>

          <button disabled={answer ? false : true} id="submitAnswerBtn" onClick={submitAnswer}>Submit answer</button>
        </>
      ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    question: state.quiz.question,
    answer: state.selectedAnswer.answer
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz)