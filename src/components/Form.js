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
  font-size: 40px;
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
  padding: 10px 20px;
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
`

const CardBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  background: ${Color.green};
  transition: linear all .3;
  &:after{
    position: absolute;
    content: "";
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.6);
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
    this.getUnsplashPhoto();
  }
  
  /**
   * Unsplash API DATA
   */
  getUnsplashPhoto = async () => {
    const client_id = "b9d51ca959ffb3a96f84db4f7e44ba0232a79b966109ff1c0e010cc51dc40aca";
    const query = "nature";
    const Endpoint = `https://api.unsplash.com/search/photos?query=${query}&client_id=${client_id}`
    const getData = await fetch(Endpoint);
    const getJson = await getData.json();
    const photos = await getJson.results.map(item => {
      return item.urls.full
    })
    const photo = await photos[photos.length * Math.random() << 0];
    
    this.setState({
      background: photo
    });
  }

  render(){
    return(
      <Card>
        <CardBackground style={{background:  `url(${this.state.background})` }}>
          <CardForm style={{display: !this.props.getPeriod.start ? 'block' : 'none' }}>
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
  
                <CardRow>
                  <Label>What kind of weather do you like?</Label>
                  <Select required name="userWeather">
                    {
                      this.props.getStateWeather && this.props.getStateWeather.map( (item) => {
                        return <option key={item}>{item}</option>
                      })
                    }
                  </Select>
                </CardRow>
  
                <CardRow>
                  <Label>How many days?</Label>
                  <Input required type="number" name="userDays" min="1" max="30"/>
                </CardRow>
  
                <FormSubmit>
                  <Button type="submit">Buscar</Button>
                </FormSubmit>
  
              </form>
          </CardForm>
          <CardResult style={{display: this.props.getPeriod.start ? 'block' : 'none' }}>
            {this.props.getPeriod.start && <p><span>Start:</span> {this.props.getPeriod.start}</p>}
            {this.props.getPeriod.end && <p><span>End:</span> {this.props.getPeriod.end}</p>}
            {this.props.getPeriod.counter && <p><span>{this.props.getPeriod.weather} days counter:</span> {this.props.getPeriod.counter}</p>}
            <Button onClick={this.props.refreshState}>Search Again</Button>
          </CardResult>
        </CardBackground>
      </Card>
    )
  }
}

export default Form;