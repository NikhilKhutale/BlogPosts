import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HashLoader from "react-spinners/HashLoader"
import { laptopSmall, tabletLg, tabletSmall, mobile } from '../responsive';
import { axiosInstance } from '../config';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    width: 1054px;
    margin-top: 30px;
    display: flex;
    gap: 40px;
    ${laptopSmall({width:"768px"})}
    ${tabletLg({width:"618px"})}
    ${tabletSmall({width:"480px"})}
    ${mobile({width:"320px", gap:"15px"})}
`

const ImgDiv = styled.div`
    flex: 1;
    height: 230.954px;
    
    overflow: hidden;
    ${tabletLg({ height: "170px" })}
    ${tabletSmall({ height: "130px" })}
    ${mobile({ height: "90px" })}
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    transition: transform 1.6s ease;

    &:hover{
        transform: scale(1.2)
    }
`

const InfoDiv = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${tabletLg({ gap: "7px" })}
    ${tabletSmall({ gap: "5px" })}

    & .link{
        text-decoration: none;
        color: #11151c;

        &:hover {
        color: #ee4266;
    }
    }
`

const PostCategory = styled.div`
    ${tabletLg({ fontSize: "12px" })}
`

const PostTitle = styled.h1`
    font-size: 20px;
    cursor: pointer;
    ${tabletLg({ fontSize: "17px" })}
    ${tabletSmall({ fontSize: "15px" })}
    ${mobile({ fontSize: "13px" })}
`

const PostPublishDate = styled.div`
    ${tabletLg({ fontSize: "12px" })}
`

const PostDesc = styled.div`
    ${tabletLg({ fontSize: "14px" })}
    ${tabletSmall({ fontSize: "13px" })}
    ${mobile({ display: "none" })}
`

const Button = styled.button`
    background-color: #F16784;
    width: 200px;
    color: white;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 15px;
    margin: 10px 0;
    text-align: center;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 8px;
    ${laptopSmall({ fontSize : "15px", width:"150px", padding: "8px 13px" })}

    &:hover{
      background-color: white;
      border: 1px solid #4d4d4d;
      color: #4d4d4d;
    }
`

const Preloader = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`


function SearchPage() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1)
    const [prevQuery, setPrevQuery] = useState()
    const [Postloading, setPostLoading] = useState(null);
    const [Pageloading, setPageLoading] = useState(null);

    const location = useLocation()
    const searchQuery = location.search
    const query = new URLSearchParams(searchQuery).get("q");

    const W = window.innerWidth;
    const TruncWords = (W < 768 ? 100 : 275)

    

    const handleClick = () => {
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        const fetchData = async () => {
            setPostLoading(true)
            
            if (prevQuery !== query) {
                setPrevQuery(query)
                setPage(1)
                setData([])
                setPageLoading(true)
            }
            const res = await axiosInstance.get(`api/search?q=${query}&page=${page}`);

            setData(prev => [...prev, ...res.data])
            setPostLoading(null)
            setPageLoading(null)
        };
        if (query && query.length > 2) fetchData();
    }, [query, page]);


    //console.log(data)
    return (
        <Container>
            {!Pageloading ? (
                <>
                {(query.length > 1) ? (data.map((item, index) => {
                return (
                    <Wrapper key={index}>
                        <ImgDiv>
                            <Img src={item.img} />
                        </ImgDiv>
                        <InfoDiv>
                            <PostCategory><Link className='link' to={`/?cat=${item.cat}`}>{item.cat}</Link></PostCategory>
                            <PostTitle><Link className='link' to={`/post/${item.id}`}>{item.title}</Link></PostTitle>
                            <PostPublishDate>{moment(item.date).fromNow()}</PostPublishDate>
                            <PostDesc dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(item.descr.slice(0, TruncWords) + "...")
                            }}></PostDesc>
                        </InfoDiv>
                    </Wrapper>
                )
            })) :
                <div>Please Search Something...</div>
            }
            <Button onClick={handleClick}>
                {Postloading ? "Loading..." : "Load More"}
            </Button>
                </>
            ) : <Preloader><HashLoader color="#ee4266" /></Preloader>}
        </Container>
    )
}

export default SearchPage