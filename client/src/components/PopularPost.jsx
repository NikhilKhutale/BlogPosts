import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { laptopSmall } from '../responsive'

const Container = styled.div`
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
`

const ImgContainer = styled.div`
    flex: 1;
    width: 100px;
    height: 60px;
    overflow: hidden;
`

const PostImage = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    transition: transform 1.6s ease;

    &:hover{
        transform: scale(1.2)
    }
`

const PostTextWrapper = styled.div`
    flex: 2;
    padding-left: 20px;
    & .link{
        text-decoration: none;
        color: #11151c;

        &:hover {
        color: #ee4266;
    }
    }
`

const PostCategory = styled.div`
    font-size: 13px;
    color: #ee4266;
`

const PostTitle = styled.h2`
    cursor: pointer;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
           line-clamp: 2;
    -webkit-box-orient: vertical;
    ${laptopSmall({ fontSize: "13px" })}

    &:hover {
        color: #ee4266;
    }
`

function PopularPost({props}) {
  return (
    <Container>
        <ImgContainer><PostImage  src={props.thumbnail} /></ImgContainer>
        <PostTextWrapper>
            <PostCategory><Link className='link' to={`/?cat=${props.category}`}>{props.category}</Link></PostCategory>
            <PostTitle><Link className='link' to={`/post/${props.id}`}>{props.title}</Link></PostTitle>
        </PostTextWrapper>
    </Container>
  )
}

export default PopularPost