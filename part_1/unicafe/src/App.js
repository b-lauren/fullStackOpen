import { useState } from 'react'
import React from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  )
}

const StatisticLine  = (props) => {
  return (
      <td>{props.text} {props.value}</td>
  )
}

const Statistics = ({good, bad, neutral, total, average, positive}) => {
  if (total === 0 ) {
    return (
        <p>No feedback has been given</p>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
          <StatisticLine text="good" value={good} />
          </tr>
          <tr>
          <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
          <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
          <StatisticLine text="all" value={total} />
          </tr>
          <tr>
          <StatisticLine text="average" value={average} />
          </tr>
          <tr>
          <StatisticLine text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    setGood(good + 1)
  }

  const neutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const badFeedback = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => goodFeedback()} text="good" />
      <Button handleClick={() => neutralFeedback()} text="neutral" />
      <Button handleClick={() => badFeedback()} text="bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </>
  )
}

export default App