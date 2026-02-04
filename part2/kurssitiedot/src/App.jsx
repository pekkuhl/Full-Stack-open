

const Header = ({courseName}) => {
  console.log("header", courseName)
  return (
    <h1>{courseName}</h1>
  )
}

const Part = ({part}) => {
  console.log("....", part)
  return (
    <li> {part.name} {part.exercises} </li>
  )
}

const Content = ({courseParts}) => {
  console.log(" contetnt", courseParts)
  return (
    <ul>
      {courseParts.map(part => {
        console.log("!",courseParts)
        console.log("->",part)
        return <Part key={part.id} part={part}/>
      })}
    </ul>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content courseParts={course.parts}/>
    </div>
  )
}


const Total = (props) => {
  return(
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'testi',
        exercises: 14,
        id: 4
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App