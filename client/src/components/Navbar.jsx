import React, { useState } from 'react'
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import PersonIcon from '@mui/icons-material/Person';
import { keyframes } from 'styled-components'
import { laptopSmall, tabletLg, tabletSmall,mobile, mobileSmall } from '../responsive';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const WrapperTop = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0% 13%;
    padding: 8px 20px;
    ${tabletLg({ padding: "8px 0" })}
    ${tabletSmall({ margin: "0 5%" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${tabletLg({ display: "none" })}
`

const Icon = styled.a`
    margin-right: 35px;
    text-decoration: none;
    color: #11151c;
    ${laptopSmall({ marginRight: "18px" })}
    
    &:hover{
        color: #ee4266;
        cursor: pointer;
    }

`

const Center = styled.div`
    flex: 1;
    text-align: center;
    ${tabletLg({ textAlign: "left" })}
`

const Logo = styled.h1`
    font-weight: bold;
    color: #11151c;
    ${mobile({ fontSize: "23px" })}

    & .link{
        text-decoration: none;
        color: #11151c;
    }
`

const Span = styled.span`
    color: #ee4266;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MenuItem = styled.div`
    display: flex;
    align-items: center;
`

const Input = styled.input`
    color: white;
    border: 0;
    outline: 0;
    background-color: #353b48;
    width: 0;
    caret-color: transparent;
    line-height: 20px;
    transition: width 0.4s ease-in;
    padding: 0;
    ${mobile({ lineHeight: "10px" })}
    ${mobileSmall({ lineHeight: "8px" })}
`


const A = styled.a`
    height: 30px;
    width: 30px;
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    text-decoration: none;
    cursor: pointer;
    ${mobile({ height: "20px", width:"20px" })}
    ${mobileSmall({ height: "15px", width:"15px" })}
`


const SearchContainer = styled.div`
    margin-right: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    background-color: #353b48;
    border-radius: 30px;
    padding: 8px;
    ${tabletLg({ marginRight: "0" })}
    ${tabletSmall({ marginRight: "10px" })}
    ${mobile({ height: "20px" })}
    ${mobileSmall({ height: "15px" })}

    
    &:hover ${A}{
        background-color: white;
        color: #ee4266;
        ${mobile({ backgroundColor:"transparent" })}
    }
    &:hover ${Input}{
        padding: 0 10px;
        width: 100px;
        caret-color: #ee4266;
        transition: width 0.4s linear;
    }
`

const ButtonDiv = styled.div`
    ${laptopSmall({ display: "none" })}
`

const BarIcon = styled.div`
    display: none;
    ${tabletSmall({ display: "inline-block" })}
`

const theme = createTheme({
    palette: {
        primary: {
            main: '#ee4266',
        }
    }
});

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    ${tabletSmall({ display: "none" })}
`

const WrapperBottom = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    margin: 0% 13%;
    padding: 0 13%;
    ${laptopSmall({ padding: "0 4%", fontSize: "13px" })}
    ${tabletSmall({ display: "none" })}
`


const NavLinks = styled.div`
    flex: 1;
    cursor: pointer;


    &:hover{
        color: #ee4266;
    }
`


const slideUp = keyframes`
    0% {transform: translateY(90px) translateX(-115px);}
    100% {transform: translateY(60px) translateX(-115px);}
`

const NavAanchors = styled.div`
        text-decoration: none;
        color: #11151c;
        //transition: all 1s;
        position: relative;
        height: 100%;
        display: flex;
    align-items: center;

        & > div{
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            min-width: 160px;
            position: absolute;
            z-index: 1;
            transform: translateY(60px) translateX(-115px);
            color: #11151c;
            
            background-color: white;
            border-top:1px solid #ee4266;
     
            
            display: none;
            padding: 20px;
            ${tabletLg({ padding: "20px 0" })}

            & > .dropdwonContent {
                margin: 10px 30px;
                text-decoration: none;
                border: 2px solid #eee;
                padding: 5px 10px;
                border-radius: 10px;
                color: #11151c;
                ${tabletLg({ margin: "8px 15px" })}
                &:hover{
                    border-color:#ee4266;
                }
            }
        }
        
        &:hover .dropdownDiv{
            display: block;
            animation: ${slideUp} 0.3s ease-out;
        }

       & .link{
        text-decoration: none;
        color: #11151c;
       } 
       & :hover{
        color: #ee4266;
       }

`


const Account = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #11151c;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const IMG = styled.img`
     width: 30px;
    height: 30px;
    border-radius: 50%;
`

const BarContent = styled.div`
    z-index:100;
    height: 100%;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 10px;
`

const BarAnchors = styled.div`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 15px;
    display: block;
    transition: 0.3s;
    color: white;
    
    & .link {
        text-decoration: none;
        color: white;
    }
`

const BarDropdownDiv = styled.div`
    font-size: 15px;
    transition: 0.3s;
    
    & .barDropdwonContent {
        text-decoration: none;
        color: white;
        padding: 8px 8px 8px 32px;
        display: block;
    }
`


function Navbar() {

    const [click, setClick] = useState(false);
    const [query, setQuery] = useState("")


    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleKey = (e) => {
        if (e.key === "Enter") {
            navigate(`/search?q=${query}`, { state: query })
        }
    }


    const handleClick = () => {
        navigate("/profile")
    };


    return (
        <Container>
            <WrapperTop>
                <Left>
                    <Icon href='https://www.facebook.com' target='_blank'>
                        <i class="fa-brands fa-facebook-f icons"></i>
                    </Icon>
                    <Icon href='https://www.twitter.com' target='_blank'>
                        <i class="fa-brands fa-twitter icons"></i>
                    </Icon>
                    <Icon href='https://www.google.com' target='_blank'>
                        <i class="fa-brands fa-google-plus-g icons"></i>
                    </Icon>
                    <Icon href='https://www.instagram.com' target='_blank'>
                        <i class="fa-brands fa-instagram icons"></i>
                    </Icon>
                </Left>
                <Center>
                    <Logo><Link className='link' to="/">Blog<Span>P</Span>osts</Link></Logo>
                </Center>
                <Right>
                    <MenuItem>
                        <SearchContainer>
                            <Input type="search" placeholder="search..." onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKey} />
                            <Link to={`/search?q=${query}`} state={query}><A><i class="fa-solid fa-magnifying-glass"></i></A></Link>
                        </SearchContainer>
                        <ButtonDiv>
                            <ThemeProvider theme={theme}>
                                <Button variant='text' href='#subscribenow' >Subscribe Now</Button>
                            </ThemeProvider>
                        </ButtonDiv>
                        <BarIcon><i class="fa-solid fa-bars" onClick={() => setClick(true)}></i></BarIcon>
                    </MenuItem>
                </Right>
            </WrapperTop><Hr />
            <WrapperBottom>
                <NavAanchors><Link className='link' to="/">HOME</Link></NavAanchors>

                <NavAanchors>
                    <Link className="link">CATEGORIES</Link>
                    <div className='dropdownDiv'>
                        <Link className="dropdwonContent" to={`/explore?cat=lifestyle`}>Lifestyle</Link>
                        <Link className="dropdwonContent" to={`/explore?cat=fashion`}>Fashion</Link>
                        <Link className="dropdwonContent" to={`/explore?cat=technology`}>Technology</Link>
                        <Link className="dropdwonContent" to={`/explore?cat=travel`}>Travel</Link>
                        <Link className="dropdwonContent" to={`/explore?cat=health`}>Health</Link>
                    </div>
                </NavAanchors>

                <NavAanchors><Link className='link' to="/about">ABOUT US</Link></NavAanchors>

                <NavAanchors><Link className='link' to="/contact">CONTACT US</Link></NavAanchors>

                <NavAanchors><Link className='link' to="/help">HELP</Link></NavAanchors>


                {currentUser ? <Account onClick={handleClick}>{currentUser.img === null ? <PersonIcon /> : <IMG src={currentUser.img} />}</Account> : <NavAanchors><Link className='link' to="/login">LOGIN</Link></NavAanchors>}

            </WrapperBottom><Hr />
            <BarContent style={{ width: click ? "250px" : "0" }}>
                <BarAnchors onClick={() => setClick(false)} style={{ textAlign: "right", position:"absolute", top:"5px", right:"5px" }}><i class="fa-solid fa-xmark"></i></BarAnchors>
                <BarAnchors><Link className='link' to="/">Home</Link></BarAnchors>
                <BarAnchors style={{paddingBottom:"0"}}>
                    <Link className='link'>Categories</Link>
                    <BarDropdownDiv>
                        <Link className="barDropdwonContent" to={`/explore?cat=lifestyle`}>Lifestyle</Link>
                        <Link className="barDropdwonContent" to={`/explore?cat=fashion`}>Fashion</Link>
                        <Link className="barDropdwonContent" to={`/explore?cat=technology`}>Technology</Link>
                        <Link className="barDropdwonContent" to={`/explore?cat=travel`}>Travel</Link>
                        <Link className="barDropdwonContent" to={`/explore?cat=health`}>Health</Link>
                    </BarDropdownDiv>
                </BarAnchors>
                <BarAnchors><Link className='link' to="/about">About Us</Link></BarAnchors>
                <BarAnchors><Link className='link' to="/contact">Contact Us</Link></BarAnchors>
                <BarAnchors><Link className='link' to="/help">Help</Link></BarAnchors>
                <BarAnchors>{currentUser ? <Link to="/profile" className='link'>Account</Link> : <Link className='link' to="/login">Login</Link>}</BarAnchors>
            </BarContent>
        </Container>
    )
}

export default Navbar