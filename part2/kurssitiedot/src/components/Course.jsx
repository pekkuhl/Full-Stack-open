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




const Total = ({courseParts}) => {
  const totalExerciseArray = courseParts.map(part => part.exercises)
  const total = totalExerciseArray.reduce((prev, cur) => prev + cur,0)
  console.log(total)
  return(
    <p>total of {total} exercises</p>
  )
}

export default Course