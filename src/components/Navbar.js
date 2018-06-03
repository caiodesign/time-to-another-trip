import React from 'react';
import styled from 'styled-components';
import Breakpoint from '../utils/Breakpoints';


const Nav = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    padding-top: 20px;
`
const Logo = styled.div`
    width: 50%;
    text-align: center;
    margin: 0 auto;
    @media(min-width: ${Breakpoint.desktop}){
        text-align: left;
        margin: 0 0 0 100px;
        width: 350px;
    }
    img{
        width: 100%;
    }
`

const Navbar = () => {
    return(
        <Nav>
            <Logo>
                <a href="!">
                    <img src="http://via.placeholder.com/350x65" alt="Time To Another Trip logo"/>
                </a>
            </Logo>
        </Nav>
    )
}

export default Navbar;