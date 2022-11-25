import axios from 'axios'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { axiosInstance } from '../config'
import { laptopSmall, mobileSmall } from '../responsive'


const Container = styled.div`
    margin-bottom: 30px;
`

const ContainerTitle = styled.h2`
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;

    &::after{
        content: '';
        width: 86%;
        border-bottom: 2px solid #938d8d;
        position: absolute;
        top: 50%;
        margin-left: 5px;
        ${laptopSmall({ width: "65%" })}
        ${mobileSmall({ width: "50%" })}
    }
`

const PostContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const Post = styled.div`
    flex:1;
    padding: 0 20px;
    ${laptopSmall({ padding: "10px" })}

    & .link{
        text-decoration: none;
        color: #11151c;

        &:hover {
        color: #ee4266;
    }
    }
`

const ImgContainer = styled.div`
    width: 100%;
    height: 40%;
    overflow: hidden;
    margin-bottom: 5px;
`

const PostImg = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    transition: transform 1.6s ease;

    &:hover{
        transform: scale(1.2)
    }
`

const PostCategory = styled.span`
    font-size: 13px;
    color: #ee4266;
    margin-top: 5px;
    ${laptopSmall({ fontSize: "11px" })}
`

const PostTitle = styled.h2`
    margin: 6px 0;
    cursor: pointer;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
           line-clamp: 2;
    -webkit-box-orient: vertical;
    ${laptopSmall({ fontSize: "13px", margin:"2px 0" })}

    &:hover {
        color: #ee4266;
    }
`

const PublishDate = styled.span`
    font-size: 11px;
`

function RelatedPost({ props }) {
    return (
        <Post>
            <ImgContainer><PostImg src={props.img} /></ImgContainer>
            <PostCategory><Link className='link' to={`/?cat=${props.cat}`}>{props.cat}</Link></PostCategory>
            <PostTitle><Link className='link' to={`/post/${props.id}`}>{props.title}</Link></PostTitle>
            <PublishDate>{moment(props.date).fromNow()}</PublishDate>
        </Post>
    )
}


function RelatedPosts({props}) {

    const [posts, setPosts] = useState([])

    const page = 1;

    const W = window.innerWidth;
    const PostLimmit = (W < 480 ? 2 : 3)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get(`api/posts?cat=${props}&page=${page}`)
            setPosts(res.data)
        };
        fetchData()
    },[props])

    return (
        <Container>
            <ContainerTitle>Related Posts</ContainerTitle>
            <PostContainer>
                {posts.slice(0, PostLimmit).map((post, index) => (
                    <RelatedPost key={index} props={post} />
                ))}
            </PostContainer>
        </Container>
    )
}

export default RelatedPosts