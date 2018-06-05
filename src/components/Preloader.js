import React from 'react';
import styled from 'styled-components';
import Color from '../utils/Colors';

const Overlay = styled.div`
  background-color: ${Color.black};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  transition: linear all .3s;
  &.active{
    visibility: visible;
    opacity: 1;
    pointer-events: none;
  }
  &.hidden{
    visibility: hidden;
    opacity: 0;
  }
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
`

class Preloader extends React.Component {
    render () {
      return(
        <Overlay className={!this.props.stopLoader ? 'active' : 'hidden'}>
          <Spinner>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </Spinner>
        </Overlay>
      )
    }
}

export default Preloader;