import React from 'react';
import styled from 'styled-components';
import Color from '../utils/Colors';
import Breakpoint from '../utils/Breakpoints';
import getEndpoint from '../environment/Endpoints';

/**
 * Styled Components Constants
 */

const Inputs = `
  color: rgba(255,255,255,0.9);
  appearance: none;
  outline: none;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  line-height: 1.5em;
  font-size: 32px;
  border: none;
  border-bottom: 1px solid ${Color.white};
  width: 100%;
  font-weight: lighter;
  transition: all linear .3s;
  text-transform: capitalize;
  &:focus, &:hover{
    border-bottom: 1px solid ${Color.green};
  }
`

const Select = styled.select`
  ${Inputs};
  option{
    outline: none;
    background-color: rgba(0,0,0,0.8);
    &:hover{
      box-shadow: 0 0 10px 100px #1882A8 inset;
    }
  }
`

const Input = styled.input`
  ${Inputs};
  box-sizing: border-box;
`

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #4BC16B;
  font-weight: bold;
  font-size: 15px;
`

const Button = styled.button`
  background-color: rgba(255,255,255, 0.1);
  outline: none;
  color: ${Color.white};
  padding: 10px 26px;
  border: 1px solid ${Color.white};
  transition: linear all .2s;
  font-size: 20px;
  &:hover, &:active, &:focus{
    border: 1px solid ${Color.green};
    color: ${Color.green};
  }
`

const Card = styled.div`
  position: relative;
  .hidden{
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: linear all .2s;
  }
  .active{
    visibility: visible;
    opacity: 1;
    pointer-events: all;
    transition: linear all .2s;
  }
`

const CardBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover !important;
  background-position: center;
  position: relative;
  background: ${Color.green};
  transition: linear all .3;
  background-repeat: no-repeat;
  &:after{
    position: absolute;
    content: "";
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.7);
    z-index: 1;
  }
`

const CardForm = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  @media(min-width: ${Breakpoint.desktop}){
    width: 600px;
  }
`

const CardRow = styled.div`
  margin-bottom: 20px;
`

const CardResult = CardForm.extend`
  text-align: center;
  color: ${Color.white};
  @media(min-width: ${Breakpoint.desktop}){
    font-size: 26px;
  }
  span{
    color: ${Color.green};
    font-weightbold;
  }
`

const FormSubmit = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`

/**
 * Form Component
 */

class Form extends React.Component {
  
  state = {
    background: undefined
  }

  componentDidMount () {
    this.getBackgroundPhoto(getEndpoint('backgrounds'), 'backgrounds');
  }
  
  getBackgroundPhoto = async (hostname, location) => {
    
    try {
      const response =  await fetch(hostname);
      const data = await response.json();
      const photos = await data.map( bg => bg.url);
      const photo = await photos[photos.length * Math.random() << 0];

      return this.setState({
        background: photo
      });
    }
    catch(err) {
      return console.error(':( Something is wrong!', err);
    }
  
  }

  setWeather (e) {
    this.setState({
      weatherValidate: e.target.value
    })
  }

  render(){
    return(
      <Card>
        <CardBackground style={{backgroundImage:  `url(${this.state.background})` }}>
          <CardForm  className={!this.props.getPeriod.start ? "active" : "hidden"}>
            <form onSubmit={this.props.getUserCityData}>
                <CardRow>
                  <Label>Where do you want to go?</Label>
                  <Select name="userCity" required defaultValue={false} onChange={this.props.getUserCityWeather}>
                    <option value={false} disabled={true}>Specific city</option>
                    {
                      this.props.getStateCities && this.props.getStateCities.map( (item) => {
                        return <option key={item.woeid} value={item.woeid}>{item.district}</option>
                      })
                    }
                  </Select>
                </CardRow>
  
                <CardRow className={this.props.getStateWeather ? "active" : "hidden"}>
                  <Label>What kind of weather do you like?</Label>
                  <Select defaultValue={false} required name="userWeather" onChange={this.setWeather.bind(this)}>
                  <option value={false} disabled={true}>Choose weather</option>
                    {
                      this.props.getStateWeather && this.props.getStateWeather.map( (item) => {
                        return <option key={item}>{item}</option>
                      })
                    }
                  </Select>
                </CardRow>
  
                <CardRow className={this.state.weatherValidate ? "active" : "hidden"}>
                  <Label>How many days?</Label>
                  <Input required type="number" name="userDays" min="1" max="30" defaultValue="1"/>
                </CardRow>
  
                <FormSubmit className={this.state.weatherValidate ? "active" : "hidden"}>
                  <Button type="submit">Search</Button>
                </FormSubmit>
  
              </form>
          </CardForm>
          <CardResult className={this.props.getPeriod.start ? "active" : "hidden"}>
            {this.props.getPeriod.start && <p><span>Start:</span> {this.props.getPeriod.start}</p>}
            {this.props.getPeriod.end && <p><span>End:</span> {this.props.getPeriod.end}</p>}
            {this.props.getPeriod.counter && <p><span>{this.props.getPeriod.weather} days:</span> {this.props.getPeriod.counter}</p>}
            <Button onClick={this.props.refreshState}>Search Again</Button>
          </CardResult>
        </CardBackground>
      </Card>
    )
  }
}

export default Form;