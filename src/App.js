import React, { Component } from 'react';

const hostname = window.location.host;
const year     = new Date().getFullYear();

class App extends Component {

  state = {
    cities: undefined,
    weather: undefined,
    user: {
      city: undefined,
      weather: undefined,
      day: undefined
    }
  }

  componentWillMount () {

  }

  getCities = async (e, hostname) => {
    const Cities =  await fetch(`${hostname}/cities`);
    this.setState({
      cities: Cities
    })
  }

  getWeather = async (e, hostname) => {
    const Weather = await fetch(`${hostname}/weather`);
    this.setState({
      weather: Weather
    })
  }

  getCityDays = async (e, hostname, city, year) => {
    return await fetch(`${hostname}/cities/${city}/year/${year}`);
  }

  render() {
    return (
      <div />
    );
  }
}

export default App;
