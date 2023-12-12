import { Battle } from "./Battle";

export class Field {
  weather: string;
  constructor(battle: Battle) {
    this.weather = "";
  }
  isWeather(weather: string | string[]) {
    const ourWeather = "";
    if (!Array.isArray(weather)) {
      return ourWeather === weather;
    }
    return weather.includes(ourWeather);
  }
}
