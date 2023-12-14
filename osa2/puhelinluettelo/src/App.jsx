import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhonenumber] = useState('')
  const [newFilter, setFilter] = useState('')

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
      <div>Filter shown with <input
            value={newFilter}
            onChange={addNewFilter}/>
      </div>
      <div>
        <h2>Add a new</h2>
        <form onSubmit={addNewPerson}>
            <div>Name: <input 
            value={newName}
            onChange={handleNewPerson}
            /></div>
            <div>Number: <input 
            value={newPhoneNumber}
            onChange={handleNewPhoneNumber}
            />
            </div>
            <div><button type="submit">add</button></div>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App