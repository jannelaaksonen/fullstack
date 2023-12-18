import { useState, useEffect } from 'react'
import noteService from './services/notes'

// filtterin käsittely
const Filter = (props) => {
  return (
    <div>Filter shown with <input
          value={props.newFilter}
          onChange={props.addNewFilter}/>
    </div>
  )
}

// esitetään filtteröidyt nimet
const Filtered = (props) => {
  const addNewFilter = (countryName) => {
    props.setFilter(countryName)
  }
  if (props.filteredCountries.length < 10) {
    if (props.filteredCountries.length === 1) {
      return (
      <div>
        <h1>{props.filteredCountries[0].name.common}</h1>
        <p>capital {props.filteredCountries[0].capital}</p>
        <p>area {props.filteredCountries[0].area}</p>
        <h2>languages</h2>
        <ul>
        {Object.values(props.filteredCountries[0].languages).map(language => (
          <li key={language}>{language}</li>
        ))}
        </ul>
        <img src={props.filteredCountries[0].flags.png} alt="flag"></img>
      </div>
    )
    } else {
      return (
        <ul>
        {props.filteredCountries.map(country => (
          <li key={country.name.common}>
              {country.name.common}
              <button type="button" onClick={() => addNewFilter(country.name.common)}>show</button>
          </li>
          ))}
          </ul>
    )}
  } else {
    return (
      <div>Too many matches, specify another filter</div>
)}}


const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // filtterin käsittely
  const addNewFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    }

    // suodatetaan esitettävistä nimistä ne, jotka sisältävät filtterin
  const filteredCountries = countries.filter((country) => {
    const nameMatches = country.name.common.toLowerCase().includes(newFilter.toLowerCase());
    return nameMatches;
  });

return (
  <div>
    <Filter newFilter={newFilter} addNewFilter={addNewFilter}/>
    <Filtered filteredCountries={filteredCountries} setFilter={setFilter} />
  </div>
  )
}

export default App