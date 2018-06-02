import React from 'react';
import styled from 'styled-components';

const FormFields = styled.div`

`
const Form = props => {
  return(
    <FormFields>
      <form onSubmit={props.getUserCityData}>
        <select name="userCity" onChange={props.getUserCityWeather}>
          {
            props.getStateCities && props.getStateCities.map( (item) => {
              return <option key={item.woeid} value={item.woeid}>{item.district}</option>
            })
          }
        </select>
        <input required="required" type="number" name="userDays" placeholder="01" min="1" max="30"/>
        <select name="userWeather">
          {
            props.getStateWeather && props.getStateWeather.map( (item) => {
              return <option key={item.id}>{item.name}</option>
            })
          }
        </select>
        <button type="submit">Buscar</button>
      </form>
    </FormFields>
  )
}

export default Form;