import React, { Component } from 'react';
import Form from './components/Form';
import styled from 'styled-components';

const TimeToAnotherTrip = styled.div`
  
`

class App extends Component {

  state = {
    cities: undefined,
    weather: undefined,
    filter: undefined
  }

  componentDidMount () {
    this.getData(this.getEndpoint('cities'), 'cities');
    this.getData(this.getEndpoint('weather'), 'weather');
  }

  getEndpoint (location, hostname) {
    const host = {
      serverPort: 8882,
      hostname: window.location.hostname,
      cities: "/cities/",
      weather: "/weather/"
    }
    return `http://${host.hostname}:${host.serverPort+host[location]}`;
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
          getUserCityData={this.getCityData.bind(this, this.getEndpoint('cities'))}
        />
        {
          this.state.filter && this.state.filter.map(item => {
            console.log(this.state);
            return <div><p>{item.date} -> {item.weather}</p></div>
          })
        }
      </TimeToAnotherTrip>
    );
  }
}

export default App;
