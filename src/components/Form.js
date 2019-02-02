import React from 'react';
import styled from 'styled-components';
import Color from '../utils/Colors';
import Breakpoint from '../utils/Breakpoints';

/**
 * Styled Components Constants
 */

const Inputs = `
  color: rgba(255,255,255,0.9);
  appearance: none;
  outline: none;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  line-height: 1.2em;
  font-size: 26px;
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
  width: 100vw;
  height: 100vh;
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
  margin-bottom: 30px;
`

const CardResult = styled.div`
z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  text-align: center;
  color: ${Color.white};
  @media(min-width: ${Breakpoint.desktop}){
		idth: 600px;
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
    weatherValidate: undefined
  }

  setWeather (e) {
    this.setState({
      weatherValidate: e.target.value
    })
  }

  render(){
		const {
			getUserCityWeather,
			getStateWeather,
			getPeriod,
			getUserCityData,
			getStateCities,
			refreshState
		} = this.props

    return(
      <Card>
        <CardBackground>
          <CardForm  className={!getPeriod.start ? "active" : "hidden"}>
            <form onSubmit={getUserCityData}>
                <CardRow>
                  <Label>Where do you want to go?</Label>
                  <Select name="userCity" required defaultValue={false} onChange={getUserCityWeather}>
                    <option value={false} disabled={true}>Specific city</option>
                    {
                      getStateCities && getStateCities.map( (item) => {
                        return <option key={item.woeid} value={item.woeid}>{item.district}</option>
                      })
                    }
                  </Select>
                </CardRow>

                <CardRow className={getStateWeather ? "active" : "hidden"}>
                  <Label>What kind of weather do you like?</Label>
                  <Select defaultValue={false} required name="userWeather" onChange={this.setWeather.bind(this)}>
                  <option value={false} disabled={true}>Choose weather</option>
                    {
                      getStateWeather && getStateWeather.map( (item) => {
                        return <option key={item}>{item}</option>
                      })
                    }
                  </Select>
                </CardRow>

                <CardRow className={this.state.weatherValidate ? "active" : "hidden"}>
                  <Label>How many days?</Label>
                  <Input required type="number" name="userDays" min="1" max="90" defaultValue="1"/>
                </CardRow>

                <FormSubmit className={this.state.weatherValidate ? "active" : "hidden"}>
                  <Button type="submit">Search</Button>
                </FormSubmit>

              </form>
          </CardForm>
          <CardResult className={getPeriod.start ? "active" : "hidden"}>
            {getPeriod.start && <p><span>{getPeriod.counter && 'Start:'}</span> {getPeriod.start}</p>}
            {getPeriod.end && <p><span>{getPeriod.counter && 'End:'}</span> {getPeriod.end}</p>}
            {getPeriod.counter && (<p><span>{getPeriod.weather} days:</span> {getPeriod.counter}</p>)}
            <Button onClick={refreshState}>Search Again</Button>
          </CardResult>
        </CardBackground>
      </Card>
    )
  }
}

export default Form;
