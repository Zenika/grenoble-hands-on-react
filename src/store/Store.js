class CityStore {
  cities = {
    GRENOBLE: { lat: 45.183916, long: 5.703630 },
    SINGAPOUR: { lat: 1.295600, long: 103.858995 },
    BORDEAUX: { lat: 44.848089, long: -0.571017 },
    BREST: { lat: 48.389397, long: -4.499237 },
    MONTREAL: { lat: 45.523000, long: -73.581700 },
    LYON: { lat: 45.767443, long: 4.858798 },
    RENNES: { lat: 48.113409, long: -1.661249 },
    NANTES: { lat: 47.207408, long: -1.556187 },
    LILLE: { lat: 50.648670, long: 3.075520 },
    PARIS: { lat: 48.878932, long: 2.328487 }
  }

  getCityPosition(cityName) {
    return this.cities[cityName]
  }

  getCities() {
    return Object.keys(this.cities)
  }

  addCity(name, lat, long) {
    this.cities[name] = { lat, long }
  }
}

export default new CityStore()
