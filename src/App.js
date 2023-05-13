import { Component } from 'react';
import {FaSearch} from "react-icons/fa"
import './App.css';

class App extends Component{
  state={
    weatherData:"",
    searchInput:'',
    showOutput:false
  }

  

  getWeatherReport=async ()=>{
    const {searchInput}=this.state
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=c4cf6545be9daee4e0db16ec7d2c54aa`
    const options={
      method:"GET"
    }
    const response=await fetch(apiUrl,options)
    
    const data=await response.json()
    const formattedData={
      latitude:data.coord.lat,
      longitude:data.coord.lon,
      temperature:data.main.temp,
      humidity:data.main.humidity,
      pressure:data.main.pressure,
      mainData:data.weather[0].main,
      description:data.weather[0].description
    }
    this.setState(prevState=>({
      weatherData:formattedData,
      showOutput:!prevState.showOutput
    }))

  }

  renderOutputView=()=>{
    const {weatherData,searchInput}=this.state
    const {latitude,longitude,temperature,humidity,pressure,mainData,description}=weatherData
    let term=searchInput!==undefined
    return  (
      term &&  <div className='output-container'>
      <h1 className='location'>{searchInput.toUpperCase()}</h1>
      <p className='para'>{mainData}</p>
      <p className='para'>{description}</p>
      <div className='content-container'>
        <div className='content'>
          <p className='type-heading'>Temperature</p>
          <p className='type-para'>{temperature}K</p>
        </div>
        <div className='content'>
          <p className='type-heading'>Humidity</p>
          <p className='type-para'>{humidity}%</p>
        </div>
        <div className='content'>
          <p className='type-heading'>Pressure</p>
          <p className='type-para'>{pressure}hPa</p>
        </div>


      </div>
      <div className='content-container1'>
      <div className='content'>
          <p className='type-heading'>Latitude</p>
          <p className='type-para'>{latitude}</p>
        </div>
        <div className='content'>
          <p className='type-heading'>Longitude</p>
          <p className='type-para'>{longitude}</p>
        </div>
        </div>
    </div>
    )
  }

  onSearchChange=event=>{
    this.setState({searchInput:event.target.value})
  }


  render(){
    const {weatherData}=this.state
    console.log(weatherData)
    return (
      <div className='weather-container'>
        <h1 className='weather-heading'>Weather Report</h1>
        <div className='input-container'>
          <input type="search" placeholder='Search' className='inputEl' onChange={this.onSearchChange}/>
          <button type="button" className='searchButton' onClick={this.getWeatherReport}><FaSearch className='search-icon'/></button>
        </div>
        {this.renderOutputView()}
      </div>
    )
  }
}
export default App;
