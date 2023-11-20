import { useState, useEffect } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  // useEffect hookki päivittää keskiarvon heti kun totalPoints tai total muuttuu
  useEffect(() => {
    if (total === 0) {
      setAverage(0);
    } else {
      const updatedAverage = totalPoints / total;
      setAverage(updatedAverage);
      console.log(updatedAverage);}
  }, [totalPoints, total]);
  // sama kuin yllä, mutta positiivisen prosenttiosuuden laskemiseen
  useEffect(() => {
    if (total === 0) {
      setPositive(0);
    } else {
    const updatedPositive = good / total * 100;
    setPositive(updatedPositive);
    console.log(updatedPositive);}
  }

  )

  
  //good, neutral, bad counters
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
    console.log(average)
  }

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
    console.log(average)
  }

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
    console.log(average)
  }
  //renderöidään tiedot näytölle
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

export default App