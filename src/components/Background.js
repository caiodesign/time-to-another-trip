import 'babel-polyfill';
import React from 'react';
import styled from 'styled-components';
import Color from '../utils/Colors';
import getEndpoint from '../environment/Endpoints';

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover !important;
  background-position: center;
  position: fixed;
  background: ${Color.black};
  transition: linear all .3;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: -2;
  &:after{
    position: absolute;
    content: "";
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0, 0.7);
    z-index: -1;
  }
`

class Background extends React.Component {

  state = {
    background: undefined,
    loaded: false
  }

  componentDidMount () {
    this.getBackgroundPhoto(getEndpoint('backgrounds'), 'backgrounds');
  }

  handleLoad() {
    this.setState({
      loaded: true
    });
    this.props.isLoaded();
  }

  getBackgroundPhoto = async (hostname, location) => {
    try {
      const response =  await fetch(hostname);
      const data = await response.json();
      const backgrounds = await data.map( bg => bg.url);
      const background = await backgrounds[backgrounds.length * Math.random() << 0];
      
      const backgroundFile = await new Image();
      backgroundFile.src = await background;

      await this.setState({
        background: backgroundFile.src
      })

      await setTimeout( () => {this.handleLoad()}, 1500);

    }
    catch(err) {
      return console.error(':( Something is wrong!', err);
    }
  }

  render(){
    return(
      <Bg style={{backgroundImage: `url(${this.state.background})`}}/>
    )
  }
} 

export default Background;