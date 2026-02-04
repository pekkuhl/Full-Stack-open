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

const Table = (props) => {
  return (
    <table>
      <tbody>
      <tr>
        <td>{props.displayGoodText}</td>
        <td>{props.goodCounter}</td>
      </tr>
      <tr>
        <td>{props.displayNeutralText}</td>
        <td>{props.neutralCounter} </td>
      </tr>
      <tr>
        <td>{props.displayBadText}</td>
        <td>{props.badCounter}</td>
      </tr>
      <tr>
        <td><StatisticLine text="total" /></td>
        <td><StatisticLine value={props.total} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="average"/></td>
        <td><StatisticLine value={props.average.toFixed(1)} /></td>
      </tr>
      <tr>
        <td><StatisticLine text="positive" /></td>
        <td><StatisticLine value={props.positive.toFixed(1) +"%"}/></td>
      </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0 ) {
    return (
    <div>
      <h1>{props.headerText}</h1>
      <Table displayGoodText={props.displayGoodText} goodCounter={props.goodCounter}
      displayNeutralText={props.displayNeutralText} neutralCounter={props.neutralCounter}
      displayBadText={props.displayBadText} badCounter={props.badCounter}
      total={props.total} average={props.average} positive={props.positive}
      good={props.good} neutral={props.neutral} bad={props.bad}  />
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