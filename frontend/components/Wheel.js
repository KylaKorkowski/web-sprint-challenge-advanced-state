import React from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';
import { connect } from 'react-redux';

function Wheel(props) {

  const { wheel, moveClockwise, moveCounterClockwise } = props;

  const clockwiseClick = () => {
    moveClockwise();
  }

  const counterClockwiseCLick = () => {
    moveCounterClockwise();
  }

  return (
    <div id="wrapper">
      <div id="wheel">
      <div className={wheel === 0 ? "cog active" : "cog"} style={{ "--i": 0 }}>{wheel === 0 ? 'B' : ""}</div>
        <div className={wheel === 1 ? "cog active" : "cog"} style={{ "--i": 1 }}>{wheel === 1 ? 'B' : ""}</div>
        <div className={wheel === 2 ? "cog active" : "cog"} style={{ "--i": 2 }}>{wheel === 2 ? 'B' : ""}</div>
        <div className={wheel === 3 ? "cog active" : "cog"} style={{ "--i": 3 }}>{wheel === 3 ? 'B' : ""}</div>
        <div className={wheel === 4 ? "cog active" : "cog"} style={{ "--i": 4 }}>{wheel === 4 ? 'B' : ""}</div>
        <div className={wheel === 5 ? "cog active" : "cog"} style={{ "--i": 5 }}>{wheel === 5 ? 'B' : ""}</div>
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockwiseCLick} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(state => ({wheel: state.wheel}), {moveClockwise, moveCounterClockwise})(Wheel)
