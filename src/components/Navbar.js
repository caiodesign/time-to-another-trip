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
        width: 270px;
    }
    a{
        display: block;
        text-decoration: none;
    }
    img{
        width: 100%;
    }
`

const Navbar = props => {
    return(
        <Nav>
            <Logo>
                <a href="!">
                    <img src={props.getLogo} alt={props.getLogoAlt} />
                </a>
            </Logo>
        </Nav>
    )
}

export default Navbar;