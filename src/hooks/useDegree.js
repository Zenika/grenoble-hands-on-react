import { useState } from 'react'

export const useDegree = () => {
  const [degree, setDegree] = useState('C')

  const getTemperature = (temperature) => {
    return `${
      degree === 'C' ? temperature : Math.round(temperature * (9 / 5) + 32)
    } °${degree}`
  }

  return { getTemperature, degree, setDegree }
}
