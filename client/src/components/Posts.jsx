import React, { useRef, useState } from 'react'
import { BigPosts } from '../data'
import styled from 'styled-components'
import Post from './Post'
import SideBar from './SideBar'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from './Slider'
import { useEffect } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import HashLoader from "react-spinners/HashLoader"
import { laptopSmall, tabletLg, mobile, mobileSmall } from '../responsive'
import { axiosInstance } from '../config'


const Container = styled.div`
    padding: 0 11%;
    display: flex;
    justify-content: space-between;
    position: relative;
    ${mobile({ padding: "0 5%" })}

    &::after{
        content: '';
        border-bottom: 3px solid #eee;
        position: absolute;
        width: 80%;
        left: 12%;
        bottom: 0;
    }
`

const PostWrapper = styled.div`
    flex: 3;
    padding: 20px;
    display: flex;
    flex-direction: column;
    
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    ${laptopSmall({ justifyContent: "center" })}
`

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px 0;
`

const Button = styled.button`
    background-color: #F16784;
    width: 200px;
    color: white;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 15px;
    text-align: center;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 8px;
    ${laptopSmall({ fontSize: "15px", width: "150px", padding: "8px 13px" })}
    ${mobileSmall({ fontSize: "8px", width: "110px", padding: "6px 11px" })}

    &:hover{
      background-color: white;
      border: 1px solid #4d4d4d;
      color: #4d4d4d;
    }
`

const MediaWrapper = styled.div`
    flex: 1;
    ${tabletLg({ display: "none" })}
`

const Preloader = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

function Posts() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loc, setLoc] = useState()
    const [Postloading, setPostLoading] = useState(false);


    const cat = useLocation().search
    if (cat !== loc) {
        setLoc(cat)
        setPage(1)
        setPosts([])
    }
    //console.log(cat)
    //console.log(useLocation())



    const initialRender = useRef(true);

    const handleClick = () => {
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        //if (initialRender.current) {
        //    initialRender.current = false
        //} else {
            const fetchData = async () => {

                try {
                    console.log(axiosInstance)
                    setPostLoading(true)
                    if (cat) {
                        const res = await axiosInstance.get(`api/posts${cat}&page=${page}`)
                        setPosts(prev => [...prev, ...res.data])
                        console.log("cat")
                    } else {
                        const res = await axiosInstance.get(`api/posts?page=${page}`)
                        setPosts(prev => [...prev, ...res.data])
                        console.log("page")
                    }
                    setPostLoading(false)
                } catch (err) {
                    console.log(err)
                }

            }
            fetchData()
        //}
    }, [cat, page])

    console.log(posts)
    return (
        <>
            <Slider posts={posts} />
            <Container>
                <PostWrapper>
                    <Wrapper>
                        {posts.slice(3).map((post, index) => (
                            <Post key={index} props={post} />
                        ))}
                    </Wrapper>
                    <PaginationContainer>
                        <Button onClick={handleClick}>
                            {Postloading ? "Loading..." : "Load More"}
                        </Button>
                    </PaginationContainer>
                </PostWrapper>
                <MediaWrapper>
                    <SideBar />
                </MediaWrapper>
            </Container>

        </>
    )
}

export default Posts