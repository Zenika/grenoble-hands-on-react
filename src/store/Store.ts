type IPosition = { lat: number; long: number };

export enum CITY_NAME {
  GRENOBLE = "GRENOBLE",
  SINGAPOUR= "SINGAPOUR" ,
  BORDEAUX = "BORDEAUX",
  BREST = "BREST",
  MONTREAL = "MONTREAL",
  LYON = "LYON",
  RENNES= "RENNES",
  NANTES = "NANTES",
  LILLE = "LILLE",
  PARIS = "PARIS",
}

class CityStore {
  private cities: { [K in CITY_NAME | string]: IPosition } = {
    [CITY_NAME.GRENOBLE]: { lat: 45.183916, long: 5.70363 },
    [CITY_NAME.SINGAPOUR]: { lat: 1.2956, long: 103.858995 },
    [CITY_NAME.BORDEAUX]: { lat: 44.848089, long: -0.571017 },
    [CITY_NAME.BREST]: { lat: 48.389397, long: -4.499237 },
    [CITY_NAME.MONTREAL]: { lat: 45.523, long: -73.5817 },
    [CITY_NAME.LYON]: { lat: 45.767443, long: 4.858798 },
    [CITY_NAME.RENNES]: { lat: 48.113409, long: -1.661249 },
    [CITY_NAME.NANTES]: { lat: 47.207408, long: -1.556187 },
    [CITY_NAME.LILLE]: { lat: 50.64867, long: 3.07552 },
    [CITY_NAME.PARIS]: { lat: 48.878932, long: 2.328487 },
  };

  getCityPosition(cityName: CITY_NAME | string): IPosition {
    return this.cities[cityName];
  }

  getCities() {
    return Object.keys(this.cities);
  }

  addCity(name: string, lat: number, long: number) {
    this.cities[name] = { lat, long };
  }
}

var Store = new CityStore();

export default Store;