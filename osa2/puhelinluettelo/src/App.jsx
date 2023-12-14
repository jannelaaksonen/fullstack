import { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = (props) => {
  return (
    <div>Filter shown with <input
          value={props.newFilter}
          onChange={props.addNewFilter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewPerson}>
    <div>Name: <input 
    value={props.newName}
    onChange={props.handleNewPerson}
    /></div>
    <div>Number: <input 
    value={props.newPhoneNumber}
    onChange={props.handleNewPhoneNumber}
    />
    </div>
    <div><button type="submit">add</button></div>
</form>)
}

const Filtered = (props) => {
  return (
  <ul>
  {props.filteredPersons.map(person =>
    <li key={person.name}>{person.name} {person.number}</li>
  )}
  </ul>
)}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhonenumber] = useState('')
  const [newFilter, setFilter] = useState('')

  // haetaan henkilötiedot palvelimelta
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // uuden henkilön lisäys ja tarkistus ettei nimi ole jo luettelossa
  const addNewPerson = (event) => {
    event.preventDefault();  
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newPhoneNumber
      }
      setPersons(persons.concat(personObject));
      setNewName('')
      setNewPhonenumber('')
    }
  }; 

  
  // uuden henkilön nimen käsittely
  const handleNewPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // uuden henkilön puhelinnumeron käsittely
  const handleNewPhoneNumber = (event) => {
    console.log(event.target.value)
    setNewPhonenumber(event.target.value)
  }
  // filtterin käsittely
  const addNewFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  // suodatetaan esitettävistä nimistä ne, jotka sisältävät filtterin
  const filteredPersons = persons.filter(person => {
    const nameMatches = person.name.toLowerCase().includes(newFilter.toLowerCase());
    const numberMatches = person.number.toLowerCase().includes(newFilter.toLowerCase());
    return nameMatches || numberMatches;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} addNewFilter={addNewFilter}/>
      <div>
        <h2>Add a new</h2>
        <PersonForm addNewPerson={addNewPerson} newName={newName} handleNewPerson={handleNewPerson} newPhoneNumber={newPhoneNumber} handleNewPhoneNumber={handleNewPhoneNumber}/>
      </div>
      <h2>Numbers</h2>
      <Filtered filteredPersons={filteredPersons}/>
    </div>
  )

}

export default App