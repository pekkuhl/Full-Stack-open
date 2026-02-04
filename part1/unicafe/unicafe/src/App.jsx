import { useState } from 'react'

const Header = (props) => {
  return <h1>{props.text}</h1>
}

const Button = (props) => {
  return <button onClick={props.function}>{props.text}</button>
}

const StatisticLine = (props) => {
  return (
    <div> {props.text} {props.value} </div>
  )
} 

const Statistics = (props) => {
  if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0 ) {
    return (
    <div>
      <h1>{props.headerText}</h1>
      <div>{props.displayGoodText} {props.goodCounter} </div>
      <div>{props.displayNeutralText} {props.neutralCounter} </div>
      <div>{props.displayBadText} {props.badCounter} </div>
      <StatisticLine text="total" value={props.total} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive +"%"}/>
    </div>
  )
  }
  else {
    return (
      <div>
        <h1>{props.headerText}</h1>
        <p> no feedback given </p>
      </div>)
  }
  
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = (good + neutral + bad)
  const average = ((good - bad) / (total))
  const positive = (good / (total)) * 100

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

      <Statistics headerText="statistics"
      displayGoodText="good" goodCounter={good}
      displayNeutralText="neutral" neutralCounter={neutral}
      displayBadText="bad" badCounter={bad}
      total={total} average={average} positive={positive}
      good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App