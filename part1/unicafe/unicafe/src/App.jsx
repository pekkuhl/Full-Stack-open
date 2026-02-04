import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Button = (props) => {
  return <button onClick={props.function}>{props.text}</button>
}



const Display = (props) => {
  return <p> {props.text} {props.counter} </p>
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
    </div>
  )
}

export default App