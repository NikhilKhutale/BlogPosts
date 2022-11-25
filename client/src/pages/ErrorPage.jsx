import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import styled from 'styled-components'
import { laptopSmall, mobile, tabletLg, tabletSmall } from '../responsive'


const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
`

const Wrapper = styled.div`
    width: 50%;
    text-align: center;
    ${tabletLg({ width: "60%" })}
    ${tabletSmall({ width: "70%" })}
    ${mobile({ width: "100%" })}
`

const ImageDiv = styled.div`
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 400px;
    background-position: center;
    text-align: center;
    ${tabletSmall({ height: "300px" })}
    ${mobile({ width: "100%" })}

    & > h1{
        font-size: 80px;
        ${laptopSmall({ fontSize: "70px" })}
        ${tabletSmall({ fontSize: "40px" })}
        ${mobile({ fontSize: "30px" })}
    }
`

const H3 = styled.h3`
    font-size: 50px;
    ${laptopSmall({ fontSize: "40px" })}
    ${tabletSmall({ fontSize: "30px" })}
    ${mobile({ fontSize: "20px" })}
`

const P = styled.p`
    ${mobile({ fontSize: "15px" })}
`

const Button = styled.div`
    color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
    cursor: pointer;
`


function ErrorPage() {

    const navigate = useNavigate()
    const error = useRouteError()

    console.log(error)

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Container>
            <Wrapper>
                <ImageDiv><h1>{error.status}</h1></ImageDiv>
                <H3>
                    Look like you're lost
                </H3>
                <P>the page you are looking for {error.statusText}!</P>
                <Button onClick={goBack}>Go Back</Button>
            </Wrapper>
        </Container>
    )
}

export default ErrorPage