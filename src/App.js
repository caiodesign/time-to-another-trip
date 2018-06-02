import React, { Component } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import getEndpoint from './environment/Endpoints';

const TimeToAnotherTrip = styled.div`
  
`

class App extends Component {

  state = {
    cities: undefined,
    weather: undefined,
    filter: undefined,
    city: {
      weather: undefined
    }
  }

  componentDidMount () {
    this.getData(getEndpoint('cities'), 'cities');
    this.getData(getEndpoint('weather'), 'weather');
  }


  getData = async (hostname, location, e) => {
    try {
      const response =  await fetch(hostname);
      const data = await response.json();

      return this.setState({
        [location]: data
      })
    }
    catch(err) {
      return console.error(':( Something is wrong!', err);
    }
  }

  getCityData = async (hostname, e) => {
    e.preventDefault();

    const Year = new Date().getFullYear();
    const City = e.target.userCity.value;
    const Weather = e.target.userWeather.value;

    try { 
      const response =  await fetch(`${hostname + City}/year/${Year}`);
      const data = await response.json();
      const dataFiltered = await this.filterDataByWeather(data, Weather);
      
      return this.setState({
        filter: dataFiltered
      })
    }
    catch(err) {
      return console.error(':( Something is wrong!', err);
    }
  }

  filterDataByWeather (data, weather) {
    return data.filter( date => date.weather === weather);
  }


  render() {
    return (
      <TimeToAnotherTrip>
        <Form 
          getStateCities={this.state.cities} 
          getStateWeather={this.state.weather} 
          getUserCityData={this.getCityData.bind(this, getEndpoint('cities'))}
        />
        {
          this.state.filter && this.state.filter.map(item => {
            return <div key={item.date}><p>{item.date} -> {item.weather}</p></div>
          })
        }
      </TimeToAnotherTrip>
    );
  }
}

export default App;
