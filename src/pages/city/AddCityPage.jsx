import { useState } from 'react'
import { NUMBERS_ONLY_REGEX } from '../../utils/regex.js'
import Store from '../../store/Store.js'
import { useNavigate } from 'react-router'

export const AddCityPage = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    name: false,
    longitude: false,
    latitude: false
  })
  const [name, setName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const checkFormIsValid = () => {
    const errors = {
      name: name.length === 0 || false,
      latitude:
        latitude.length === 0 ||
        latitude < -90 ||
        latitude > 90 ||
        !NUMBERS_ONLY_REGEX.test(latitude) ||
        false,
      longitude:
        longitude.length === 0 ||
        longitude < -180 ||
        longitude > 180 ||
        !NUMBERS_ONLY_REGEX.test(longitude) ||
        false
    }
    setErrors(errors)
    return !Object.values(errors).includes(true)
  }

  const addCity = () => {
    if (checkFormIsValid()) {
      Store.addCity(name, latitude, longitude)
      navigate('/')
    }
  }

  return (
    <>
      <h2 className="title">Create city</h2>

      <div className="card">
        <div className="card-content">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="City name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {errors.name && (
                <p className="help is-danger">Name is required.</p>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Latitude</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="latitude"
                placeholder="e.g. 45.18924"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </div>
            {errors.latitude && (
              <p className="help is-danger">
                Latitude is required and must be a number between -90 and 90.
              </p>
            )}
          </div>
          <div className="field">
            <label className="label">Longitude</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="longitude"
                placeholder="e.g. 5.72213"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
            </div>
            {errors.longitude && (
              <p className="help is-danger">
                Longitude is required and must be a number between -180 and 180.
              </p>
            )}
          </div>
          <div className="control">
            <button className="button is-primary" onClick={addCity}>
              Add City
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
