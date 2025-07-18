import { useState,useEffect } from "react";
import "./App.css"
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon  from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(
<>
<div className="image">
  <img src={icon} alt="Image"/>
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
    <span className="lat">latitude</span>
    <span>{lat}</span>
    </div>
        <div>
    <span className="log">longitude</span>
    <span>{log}</span>
    </div>

  </div>
  <div className="datacontainer">
    <div className="element">
      <img src={humidityIcon} alt="humidity" className="icon"/>
      <div className="data">
        <div className="humidity-percentage">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
      
      
    </div>
    <div className="element">
      <img src={windIcon} alt="wind" className="icon"/>
      <div className="data">
        <div className="wind-percentage">{wind} km/h</div>
        <div className="text">wind</div>
      </div>
      
      
    </div>
    

  </div>
<p className="copyright"> Designed by <span>Anushiya</span></p>
  </>
  );

};

function App() {

   let api_key = "b2a3ed6e9bae7ca3f7c27494539f229d";
   const [text, setText] = useState ("Chennai");
 const[icon,setIcon]= useState(null);
 const[temp,setTemp]= useState(0);
 const [city,setCity]= useState("Chennai");
 const [country,setCountry]=useState("IN")
 const [lat,setLat]= useState(0);
 const [log,setLog]= useState(0);
 const [humidity,setHumidity]=useState(0);
 const [wind,setWind]=useState(0);
 const [cityNotFound,setCityNotFound] = useState(false);
 const [loading,setloading] = useState(false);
 const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
  "50d": cloudIcon,  
  "50n": cloudIcon 
};



 const search = async () =>{
 
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
  try{
  let res = await fetch(url);
  let data = await res.json();
  //console.log(data);
  if(data.cod === "404"){
    console.error("city not found");
    setCityNotFound(true);
    setloading(false);
    return;
  }

  setHumidity(data.main.humidity);
  setWind(data.wind.speed);
  setTemp(Math.floor(data.main.temp));
  setCity(data.name);
  setCountry(data.sys.country);
  setLat(data.coord.lat);
  setLog(data.coord.lon);
  const weatherIconCode = data.weather[0].icon;
  console.log("API icon code:", weatherIconCode);
  setIcon(weatherIconMap[weatherIconCode] || clearIcon);
  setCityNotFound(false);

}catch(error){
  console.error("An error occurred:" ,error.message);
}finally{
  setloading(false);
}

};
const handleCity = (e) => {
  setText(e.target.value);

};
const handleKeyDown = (e) => {
  if (e.key === "Enter")
  {
    search();
  }
}
useEffect(function () {
  search();

},[]);

  return (
    <>
      <div className="container">   
        <div className="input-container" >
          <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={text}
          onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="Search"/>
             
          </div>
          </div> 
          <WeatherDetails icon={icon}  temp={temp} city={city} country={country} 
          lat={lat} log={log} humidity={humidity} wind={wind} text={text} />
        </div>
    </>
  );
}

export default App;
