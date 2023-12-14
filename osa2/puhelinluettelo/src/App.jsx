import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhonenumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form onSubmit={addNewPerson}>
            <div>Name: <input 
            value={newName}
            onChange={handleNewPerson}
            /></div>
            <div>Number: <input 
            value={newPhoneNumber}
            onChange={handleNewPhoneNumber}
            /></div>
            <div><button type="submit">add</button></div>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )

}

export default App