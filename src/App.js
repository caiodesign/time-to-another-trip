import React, { Component } from 'react';
import styled from 'styled-components';
import DocumentMeta from 'react-document-meta';
import getEndpoint from './environment/Endpoints';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Background from './components/Background';
import Preloader from './components/Preloader';

const meta = {
  title: 'Time for Another Trip',
  description: 'Do you know when is the best time to take a vacation? Developed with React.',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,app,time,another,trip'
    }
  }
};

const TimeToAnotherTrip = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  font-family: 'Open Sans', sans-serif;
`

class App extends Component {

  state = {
    cities: undefined,
    weather: undefined,
    period: {
      start: undefined,
      end: undefined,
      counter: undefined
    },
    city: {
      weather: undefined
    },
    loaded: false,
  };

  componentDidMount () {
    this.getData(getEndpoint('cities'), 'cities');
  }


  getData = async (hostname, location) => {
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

  getCityWeather = async (e) => {
    const City = e.target.value;
    const Year = new Date().getFullYear();

    if(City){
      try {
        const response =  await fetch(`${getEndpoint('cities') + City}/year/${Year}`);
        const data = await response.json();
        const Weather = [...(new Set(data.map( day => day.weather)))];

        this.setState({
          city: {
            weather: Weather
          }
        })
      }
      catch (err) {
        return console.error(':( Something is wrong!', err);
      }
    } else {
      this.setState({
        city: {
          weather: undefined
        }
      })
    }
  }

  getCityData = async (hostname, e) => {
    e.preventDefault();

    const Form = {
      year: new Date().getFullYear(),
      city: e.target.userCity.value,
      weather: e.target.userWeather.value,
      days: Number(e.target.userDays.value)
    }

    try {
      const response =  await fetch(`${hostname + Form.city}/year/${Form.year}`);
      const data = await response.json();
      const dataFiltered = await this.filterDataByWeather(data, Form.weather);
      console.log(dataFiltered);
      const bestPeriod = await this.filterByBestPeriod(dataFiltered, Form.days, new Date());
      console.log(bestPeriod);

			const start = (bestPeriod && bestPeriod.start) ? bestPeriod.start.toDateString(): 'no results found! try with another weather type.'
			const end = (bestPeriod && bestPeriod.end) ? bestPeriod.end.toDateString() : ':('
			const finalCounter = (bestPeriod && bestPeriod.finalCounter) ? bestPeriod.finalCounter : false

			console.log(bestPeriod)

      this.setState({
        filter: dataFiltered,
        period: {
          start,
          end,
          counter: finalCounter,
					weather: Form.weather,
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

    let filter = {finalCounter: 0}

    for(let i = 0; i < data.length; i++){
      let Day = new Date(`${data[i].date}`);
      Day.setDate(Day.getDate() + 1);

      if(Day > today){
        let counter = 0;
        let lastPeriodDay = new Date(Day);
        lastPeriodDay = new Date(lastPeriodDay.setDate(lastPeriodDay.getDate() + days));

        for(let t = i; t < data.length; t++){

          let thisDay = new Date (data[t].date);
          thisDay.setDate(thisDay.getDate() + 1);

          if(thisDay <= lastPeriodDay && counter < days){
            counter++;
          } else if (counter > filter.finalCounter){
            filter.finalCounter = counter;
            filter.start = Day;
            filter.end = lastPeriodDay;;
          }

        }
      }
    }
    return filter;
  }

  refreshApplication () {
    this.setState({
      period: {
        start: undefined,
        end: undefined,
        counter: undefined
      }
    });
  }

  stopPreloader(){
    return this.setState({loaded: true});
  }

  render() {
    return (
      <TimeToAnotherTrip>
        <DocumentMeta {...meta} />
        <Preloader stopLoader={this.state.loaded} />
        <Background isLoaded={this.stopPreloader.bind(this)} />
          <Navbar getLogoAlt={`Time to Another Trip logo`} />
          <Form
              getStateCities={this.state.cities}
              getStateWeather={this.state.city.weather}
              getUserCityData={this.getCityData.bind(this, getEndpoint('cities'))}
              getUserCityWeather={this.getCityWeather.bind(this)}
              getPeriod={this.state.period}
              refreshState={this.refreshApplication.bind(this)}
          />
      </TimeToAnotherTrip>
    );
  }
}

export default App;
