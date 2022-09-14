const Course = ({courses}) => {
  return (
    <>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
        )}
    </>
  )
}

const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({parts}) => {
  return (
   <>
   {parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    )}
   </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {

  const total = parts.reduce(function(sum, current) {
    return sum += current.exercises;
  }, 0);

  return (
    <p><strong>Total number of exercises is {total}</strong></p>
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
    <>
      <h1>Web development curriculum</h1>
      {/* {courses.map(course => 
        <Course key={course.id} course={course} />
      )} */}
      <Course courses={courses} />
    </>
  )
}

export default App