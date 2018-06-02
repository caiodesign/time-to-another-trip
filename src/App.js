import React, { Component } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import getEndpoint from './environment/Endpoints';

const TimeToAnotherTrip = styled.div`
  
`

/*
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
*/

class App extends Component {

  state = {
    cities: undefined,
    weather: undefined,
    filter: undefined,
    period: undefined,
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
    const Days = Number(e.target.userDays.value);

    try { 
      const response =  await fetch(`${hostname + City}/year/${Year}`);
      const data = await response.json();
      const dataFiltered = await this.filterDataByWeather(data, Weather);
      const bestPeriod = await this.filterByBestPeriod(dataFiltered, Days, new Date());
      
      return this.setState({
        filter: dataFiltered,
        period: {
          start: bestPeriod.start.toString(),
          end: bestPeriod.end.toString(),
          counter: bestPeriod.finalCounter
        }
      })
    }
    catch(err) {
      return console.error(':( Something is wrong!', err);
    }
  }

  filterDataByWeather (data, weather) {
    return data.filter( date => date.weather === weather);
  }


  filterByBestPeriod (data, days, today) {

    let filter = {
      start: undefined,
      end: undefined,
      finalCounter: 0
    }

    for(let i = 0; i < data.length; i++){

      let firstPeriodDay = new Date(`${data[i].date}`);
      
      if(firstPeriodDay > today){
        let lastPeriodDay = new Date(firstPeriodDay);
        let counter = 0;

        lastPeriodDay = new Date(lastPeriodDay.setDate(lastPeriodDay.getDate() + days));

        for(let t = i; t < data.length; t++){

          let currentlyDate = new Date(data[t].date);
          currentlyDate.setDate(currentlyDate.getDate() + 1);

          if(currentlyDate <= lastPeriodDay){
            counter++;
          } else {
            if(counter > filter.finalCounter){
              filter.finalCounter = counter;
              filter.start = firstPeriodDay;
              filter.end = lastPeriodDay;
            }
          };

        }
      }
    }

    return filter;
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
          <div>
            {this.state.period && <p>Start: {this.state.period.start}</p>}
            {this.state.period && <p>End: {this.state.period.end}</p>}
            {this.state.period && <p>Counter: {this.state.period.counter}</p>}
            
          </div>
        }
      </TimeToAnotherTrip>
    );
  }
}

export default App;
