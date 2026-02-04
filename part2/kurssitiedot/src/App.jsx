

const Header = ({courseName}) => {
  console.log("header", courseName)
  return (
    <h2>{courseName}</h2>
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

const Course = ({courses}) => {
  console.log(courses)
  return (
    
    <div>
      <h1>Web Development curriculum</h1>
      {courses.map(course => {
        return (
        <div>
          <Header courseName={course.name}/>
          <Content courseParts={course.parts}/>
          <Total courseParts={course.parts} />
        </div>
      )
      })}

      
      
    </div>
  )
}


const Total = ({courseParts}) => {
  const totalExerciseArray = courseParts.map(part => part.exercises)
  const total = totalExerciseArray.reduce((prev, cur) => prev + cur,0)
  console.log(total)
  return(
    <p>total of {total} exercises</p>
  )
}


const App = () => {
   const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App