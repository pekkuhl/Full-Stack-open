import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Button = (props) => {
  return <button onClick={props.function}>{props.text}</button>
}

const Display = (props) => {
  return <div>{props.text} {props.counter} </div> 
}

const Total = (props) => {
  return <div> {props.text} {props.good + props.neutral + props.bad}  </div>
}

const Average = (props) => {
  return <div> {props.text} {(props.good - props.bad)/ (props.good + props.bad + props.neutral) }  </div>
}

const Positive = (props) => {
  return <div> {props.text} {((props.good) / (props.good + props.bad + props.neutral))*100} %</div>
}




const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodReview = () => {
  setGood(good + 1)
}

const giveNeutralReview = () => {
  setNeutral(neutral + 1)
}

const giveBadReview = () => {
  setBad(bad +1)
}




  return (
    <div>
      <Header text="give feedback"/>
      <Button function={giveGoodReview} text="good" />
      <Button  function={giveNeutralReview} text="neutral" />
      <Button function={giveBadReview} text= "bad" />


      <Header text="statistics" />
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
      <Total text="total" good={good} neutral={neutral} bad={bad} />
      <Average text="average" good={good} bad={bad} neutral={neutral} />
      <Positive text="positive" good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

export default App