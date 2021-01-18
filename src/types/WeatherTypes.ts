export interface IWeather {
  date: number;
  temp2m: { max: number; min: number };
  weather: string;
  wind10m_max: number;
}

export interface IDetailedWeather {
  lifted_index: number;
  prec_amount: number;
  prec_type: string;
  rh2m: string;
  temp2m: number;
  timepoint: number;
  weather: string;
  wind10m: {
    direction: string;
    speed: number;
  };
}
