import React from 'react'
import styled from 'styled-components'
import { laptopSmall, tabletLg, mobile, mobileSmall } from '../responsive'
import Categories from './Categories'
import Subscribe from './Subscribe'


const Container = styled.div`
    background-color: #1b1c1e;
    color: #fff;
    padding: 5% 11%;
    ${laptopSmall({ padding : "5% 5%" })}
`

const Wrappers = styled.div`
    display: flex;
`

const WrapperFirst = styled.div`
    flex: 1;
    display: flex;
    align-self: flex-start;
    flex-direction: column;
`

const Logo = styled.h1`
    font-weight: bold;
    ${laptopSmall({ fontSize:"23px" })}
`

const Span = styled.span`
    color: #ee4266;
`

const Info = styled.p`
    margin: 2rem 2rem 2rem 0;
    text-align: justify;
    ${laptopSmall({ fontSize:"14px" })}
    ${mobileSmall({ fontSize:"11px" })}
    ${mobile({ margin:"0.5rem 0.5rem 0.5rem 0" })}
`

const WrapperThird = styled.div`
    flex: 1;
`

const WrapperThirdTitle = styled.h2`
    //margin-left: 40px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;
    ${laptopSmall({ fontSize:"14px", fontWeight:"600" })}
`
const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    //margin-left: 40px;
`

const TagsName = styled.span`
    background-color: #323335;
    color: #97989b;
    padding: 7px 12px;
    margin-right: 7px;
    margin-bottom: 5px;
    border-radius: 3px;
    transition: all 0.3s;
    cursor: pointer;
    ${laptopSmall({ fontSize:"13px", padding:"5px 9px" })}
    ${mobileSmall({ fontSize:"11px", padding:"4px 8px" })}

    &:hover{
        background-color: #ee4266;
        color: white;
    }
`

const BottomWrapper = styled.div`
    margin-top: 5%;
`

const SocialIcons = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style:none;
    padding: 0;

    &::before{
        content: '';
        border-bottom: 1px solid #97989b;
        width: 50%;
    }

    &::after{
        content: '';
        border-bottom: 1px solid #97989b;
        width: 50%;
    }
`

const Icons = styled.div`
    border : 1px solid #ee4266;
    margin: 5px;
    width: 70px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
    cursor: pointer;
    ${mobile({ fontSize:"8px", width:"50px", height:"30px" })}
    ${mobileSmall({ fontSize:"8px", width:"40px", height:"20px" })}

    &:hover {
        background-color: #ee4266;
        transform: translateY(-10px);
    }

    
`

const CopyRight = styled.div`
    padding-top: 20px;
    text-align: center;
    ${laptopSmall({ fontSize:"13px" })}
    ${mobileSmall({ fontSize:"11px" })}
`

const P = styled.p`
    padding-bottom: 3px;
`


function Footer() {
    return (
        <>
        <Categories/>
        <Subscribe/>
        <Container>
            <Wrappers>
                <WrapperFirst>
                    <Logo>Blog<Span>P</Span>osts</Logo>
                    <Info>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum soluta ab accusantium? Ullam placeat perspiciatis totam odit? Minima, optio nesciunt.</Info>
                </WrapperFirst>
                <WrapperThird>
                    <WrapperThirdTitle>Tags</WrapperThirdTitle>
                    <TagsContainer>
                        <TagsName>Fashion</TagsName>
                        <TagsName>Travel</TagsName>
                        <TagsName>Food</TagsName>
                        <TagsName>Health</TagsName>
                        <TagsName>Programming</TagsName>
                        <TagsName>Lifestyle</TagsName>
                    </TagsContainer>
                </WrapperThird>
                
            </Wrappers>
            <BottomWrapper>
                <SocialIcons>
                    <Icons><i class="fa-brands fa-facebook-f"></i></Icons>
                    <Icons><i class="fa-brands fa-instagram"></i></Icons>
                    <Icons><i class="fa-brands fa-twitter"></i></Icons>
                    <Icons><i class="fa-brands fa-google-plus-g"></i></Icons>
                </SocialIcons>
                <CopyRight>
                    <P>Copyright ©2022 All rights reserved</P>
                    <P>Made with <i class="fa-regular fa-heart"></i> by Nikhil Khutale</P>
                </CopyRight>
            </BottomWrapper>
        </Container>
        </>
    )
}

export default Footer