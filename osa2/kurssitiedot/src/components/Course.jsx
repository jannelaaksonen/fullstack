// Course komponentti joka renderöi Header, Content ja Total komponentit
const Course = (props) => {
    console.log("Course", props)
    return (
      <div>
        <Header course={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }

// header komponentti joka renderöi kurssin nimen
const Header = (props) => {
    console.log("Header", props)
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }

// Content komponentti joka renderöi kurssin osat ja niiden tehtävämäärät
const Content = (props) => {
    console.log("Content", props)
    return (
      <div>
        <ul>
          {props.parts.map((part) => (
            <Part key={part.id} part={part.name} exercises={part.exercises}/>
          ))}
        </ul>
      </div>
    )
  }



// Part komponentti joka renderöi kurssin osan ja sen tehtävämäärän
const Part = (props) => {
    console.log("Part", props)
    return (
        <li>{props.part} {props.exercises}</li>
    )
  }

// Total komponentti joka renderöi kurssien yhteenlasketu tehtävämäärän
const Total = (props) => {
  console.log("Total", props)
  const totalExercises = props.parts.map(part => 
    part.exercises).reduce((sum, exercises) => 
    sum + exercises, 0)

  return (
    <div>
      <p><strong>Number of exercises {totalExercises}</strong></p>
    </div>
  )
}

export default Course