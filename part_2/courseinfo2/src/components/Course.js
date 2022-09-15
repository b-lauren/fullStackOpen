const Course = ({course}) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

  export default Course
  
  const Header = ({course}) => {
    return (
      <h2>{course}</h2>
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
  
    const total = parts.reduce((sum, current) => sum += current.exercises, 0) 
  
    return (
      <p><strong>Total of {total} exercises</strong></p>
    )
  }

