import axios from "axios";
import { API_KEY, BASE_URL, FORECAST_BASE_URL } from "./api";


export const getWeather = async (city:any) => {
    const url = BASE_URL+city+API_KEY;
  const method = "get";
  console.log("url",url);
  const config: any = {
    method,
    url,
    ["params"]: "",
  };
  config.headers = {
    "Content-Type": "application/json; charset=utf-8",
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
        console.log("Error",error);
        
      return error;
    });
}

export const getWeatherDaily = async (city:any) => {
  const url = FORECAST_BASE_URL+city+API_KEY;
const method = "get";
console.log("url",url);
const config: any = {
  method,
  url,
  ["params"]: "",
};
config.headers = {
  "Content-Type": "application/json; charset=utf-8",
};

return axios
  .request(config)
  .then((response) => {
    return response;
  })
  .catch(async (error) => {
      console.log("Error",error);
      
    return error;
  });
}