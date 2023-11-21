import { useState, useEffect } from 'react'

const App = () => {
  // palautteiden kerääminen ja laskeminen
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  //määritellään tilastojen eri osille komponentti
  const StatisticLine = (props) => {
    return (
      <tr>
        <td>{props[0]}</td>
        <td>{isNaN(props[1]) ? '0' : props[1]}</td>
      </tr>
    )
  }

  // määritellään tilastojen näyttäminen omaksi komponentikseen
  // jos palautteita ei ole annettu, näytetään vain teksti "no feedback given"
  const Statistics = (props) => {
    if (total === 0) {
      return (
        <div>
          <h1>statistics</h1>
          <p>no feedback given</p>
        </div>
      )
    } else {
        return (
          <div>
            <h1>statistics</h1>
            <table>
              <tbody>
                {StatisticLine(["good", good])}
                {StatisticLine(["neutral", neutral])}
                {StatisticLine(["bad", bad])}
                {StatisticLine(["total", total])}
                {StatisticLine(["average", average])}
                {StatisticLine(["positive", positive])}
              </tbody>
            </table>
          </div>
          )
      }
  }

  //määritellään buttonit ja niiden toiminnot
  const Button = (props) => {
    return (
      <button onClick={props[0]}>{props[1]}</button>
    )
  }

  // useEffect hookki päivittää keskiarvon heti kun totalPoints tai total muuttuu
  useEffect(() => {
    if (total === 0) {
      setAverage(0);
    } else {
      const updatedAverage = totalPoints / total;
      setAverage(updatedAverage);
      }
  }, [totalPoints, total]);

  // sama kuin yllä, mutta positiivisten palautteiden prosenttiosuuden laskemiseen
  useEffect(() => {
    if (total === 0) {
      setPositive(0);
    } else {
    const updatedPositive = good / total * 100;
    setPositive(updatedPositive);
    }
  }
  )

  
  //good, neutral, bad laskurit
  //hyvien laskuri
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedTotalPoints = totalPoints + 1
    setTotalPoints(updatedTotalPoints)
    const updatedAverage = totalPoints / total
    setAverage(updatedAverage)
    const updatedPositive = good / total * 100
    setPositive(updatedPositive)
  }
  //neutraalien laskuri
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedTotalPoints = totalPoints + 0
    setTotalPoints(updatedTotalPoints)
    const updatedAverage = totalPoints / total
    setAverage(updatedAverage)
    const updatedPositive = good / total * 100
    setPositive(updatedPositive)
  }
  //huonojen laskuri
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = total + 1
    setTotal(updatedTotal)
    const updatedTotalPoints = totalPoints - 1
    setTotalPoints(updatedTotalPoints)
    const updatedAverage = totalPoints / total
    setAverage(updatedAverage)
    const updatedPositive = good / total * 100
    setPositive(updatedPositive)
  }
  //renderöidään tiedot näytölle
  return (
    <div>
      <h1>give feedback</h1>
      {Button([handleGoodClick, "good"])}
      {Button([handleNeutralClick, "neutral"])}
      {Button([handleBadClick, "bad"])}
      {Statistics(good, neutral, bad, total, average, positive)}
    </div>
  )
}

export default App