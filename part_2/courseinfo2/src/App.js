const Course = ({course}) => {
  return (
    <p>{course.name} {course.exercises}</p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  const total = course.parts.reduce(function(sum, current) {
    return sum += current.exercises;
  }, 0);

  console.log('reducer attempt =', total)

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(course => 
        <Course key={course.id} course={course} />
      )}
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

export default App