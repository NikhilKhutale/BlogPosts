import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from "moment";
import { laptopSmall, mobile, mobileSmall } from '../responsive';

const Container = styled.div`
    flex: 1;
    margin: 10px 10px 30px 0;
    min-width: 380px;
    max-width: 410px;
    height: 350px;
    position: relative;
    ${mobile({ minWidth: "260px", maxWidth:"290px",height:"230px" })}
    ${mobileSmall({ minWidth: "160px", maxWidth:"190px",height:"130px" })}
`

const ImgContainer = styled.div`
    width: 100%;
    height: 70%;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    transition: transform 1.6s ease;

    &:hover{
        transform: scale(1.2)
    }
`

const Info = styled.div`
    position: absolute;
    top: 55%;
    right: 0;
    width: 93%;
    height: 45%;
    background-color: white;
    padding: 20px 0 0 15px;
    ${mobile({ padding:"10px 0 0 5px"})}

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
    margin-bottom: 10px;
    text-transform: capitalize;
    ${mobile({ fontSize:"11px", marginBottom:"2px" })}
    ${mobileSmall({ fontSize:"8px", marginBottom:"1px" })}
`


const PostTitle = styled.h1`
    font-size: 20px;
    white-space: normal;
    margin-bottom: 10px;
    cursor: pointer;
    ${laptopSmall({ fontSize: "17px" })}
    ${mobile({ fontSize:"15px",marginBottom:"0px"   })}
    ${mobileSmall({ fontSize:"12px",marginBottom:"0px"   })}
    
`

const PostPublishDate = styled.span`
    font-size: 12px;
    ${mobile({ fontSize:"11px"})}
    ${mobileSmall({ fontSize:"8px", marginLeft:"10px"})}
`

function Post({props}) {
    const W = window.innerWidth;
  return (
    <Container>
        <ImgContainer><Image src={props.thumbnail} /></ImgContainer>
        <Info>
            <PostCategory><Link className='link' to={`/?cat=${props.cat}`}>{props.cat}</Link>{W < 320 ? <PostPublishDate>{moment(props.date).fromNow()}</PostPublishDate> : null}</PostCategory>
            <PostTitle><Link className='link' to={`/post/${props.id}`}>{props.title}</Link></PostTitle>
            {W > 320 ? <PostPublishDate>{moment(props.date).fromNow()}</PostPublishDate> : null}
        </Info>
    </Container>
  )
}

export default Post