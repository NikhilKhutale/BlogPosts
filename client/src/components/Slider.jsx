import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { laptopSmall, tabletLg, tabletSmall, mobile, mobileSmall } from '../responsive';

const Container = styled.div`
    width: 80%;
    height: 60vh;
    margin: 3% 11% 4% 11%;
    display: flex;
    position: relative;
    overflow: hidden;
    ${tabletLg({ height: "40vh" })}
    ${mobile({ height: "30vh" })}
    ${mobileSmall({ margin: "3% 5% 4% 7%" })}
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props=>props.slideIndex * -80}vw);
`

const Slides = styled.div`
    width: 80vw;
    height: 60vh;
    position: relative;
    ${tabletLg({ height: "40vh"})}
    ${mobile({ height: "30vh"})}
    ${mobileSmall({ height: "30vh"})}
`

const ImgContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.div`
    min-width: 70%;
    min-height: 100%;
    background: linear-gradient(180deg, rgba(175,175,175,0.4125000341933649) 0%, rgba(51,48,48,1) 100%), 
    url(${props => props.Img ? props.Img : null});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`

const Infocontainer = styled.div`
    width: 400px;
    height: 100px;
    position: absolute;
    left: 32%;
    bottom: 0;
    margin: auto;
    color: white;
    ${laptopSmall({ width: "289px" })}
    ${mobile({ width: "170px",height:"60px", left:"20%" })}
    ${mobileSmall({ width: "110px",height:"60px", left:"20%" })}
`

const Title = styled.h3`
    cursor: pointer;
    font-size:25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
           line-clamp: 1;
    -webkit-box-orient: vertical;
    ${laptopSmall({ fontSize: "17px" })}
    ${mobileSmall({ fontSize: "12px" })}

    & .link{
        text-decoration: none;
        color: white;

        &:hover {
        color: #ee4266;
    }
    }
`

const Description = styled.p`
    margin: 3px 0px;
    font-size: 12px;
    cursor: pointer;
    ${mobileSmall({ fontSize: "8px" })}

    &:hover{
        color: #ee4266;
    }
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && '10px'};
    right: ${props => props.direction === "right" && '10px'};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    ${mobile({ backgroundColor: "transparent" })}
`


function Slider({posts}) {

    const [slideIndex, setSlideIndex] = useState(0)
    

    const handleClick = (direction) => {
        if (direction === "left"){
            setSlideIndex(slideIndex > 0? slideIndex-1:2)  
        }else{
            setSlideIndex(slideIndex < 2? slideIndex+1:0)
        }
     }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <i class="fa-solid fa-angle-left"></i>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {posts.slice(0,3).map((post, index) => (
                    <Slides key={index} > {/*remember use proper key name which is in array*/}
                        <ImgContainer>
                            <Image Img={post.thumbnail} />
                        </ImgContainer>
                        <Infocontainer>
                            <Description>{post.cat}</Description>
                            <Title><Link className='link' to={`/post/${post.id}`}>{post.title}</Link></Title>

                        </Infocontainer>
                    </Slides>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <i class="fa-solid fa-angle-right"></i>
            </Arrow>
        </Container>
    )
}

export default Slider