import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ExploreCategories } from '../data'
import { laptopSmall, tabletLg, tabletSmall } from '../responsive';

const Container = styled.div`
    padding: 1.5% 11%;
    text-align: center;
    ${laptopSmall({ padding : "1.5% 2%" })}
    ${tabletSmall({ display : "none" })}
`

const ConatinerTitle = styled.h1`
  margin-bottom: 30px;
  ${laptopSmall({ fontSize:"20px" })}
`

const CategoryName = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
`

const Category = styled.div`
    backface-visibility: hidden;
    cursor: pointer;
    transition: box-shadow 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;
    background-color: #ee4266;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 0.5rem;
    flex-grow: 1;
    width: calc(33.3% - 1rem);
    ${tabletLg({ margin:"0 0.2rem" })}

    &:hover{
      box-shadow: 0 10px 50px -5px rgb(46 71 93 / 12%);
      transform: scale(1.014);
    }

    & .link{
        text-decoration: none;
    }
`

const CategoryContent = styled.a`
  color: #fff;
  text-decoration: none;
`

const ImageContainer = styled.figure`
  width: 100%;
  display: block;
`

const Image = styled.img`
  width: 100%;
  height: 7rem;
  object-fit: cover;
  ${tabletLg({ height:"5rem" })}
`

const TextContainer = styled.div`
  padding: 0.5rem 1rem 1rem;
`

const CategoryTitle = styled.h3`
    font-size: 1.5rem;
    margin: 0;
    font-weight: 300;
    ${laptopSmall({ fontSize:"1rem" })}
    ${tabletLg({ fontSize:"0.7rem" })}
`

const CategoryText = styled.p`
    margin: 0 0 1rem;
    font-size: 0.888rem;
    line-height: 1.5em;
    font-weight: 500;
    ${laptopSmall({ fontSize:"0.7rem" })}
    ${tabletLg({ display:"none" })}
`


function EachCategory({ props }) {
  return (
    <Category>
      <Link className='link' to={`/explore?cat=${props.title.toLowerCase()}`}>
        <CategoryContent>
          <ImageContainer>
            <Image src={props.img} />
          </ImageContainer>
          <TextContainer>
            <CategoryTitle>{props.title}</CategoryTitle>
            <CategoryText>{props.categoryText}</CategoryText>
          </TextContainer>
        </CategoryContent>
      </Link>
    </Category >
  )
}

function Categories() {
  return (
    <Container id='explore'>
      <ConatinerTitle>EXPLORE CATEGORIES</ConatinerTitle>
      <CategoryName>
        {ExploreCategories.map((Category, index) => (
          <EachCategory key={index} props={Category} />
        ))}
      </CategoryName>
    </Container>
  )
}

export default Categories