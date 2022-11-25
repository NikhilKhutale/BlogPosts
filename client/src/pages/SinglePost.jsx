import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import RelatedPosts from '../components/RelatedPosts'
import CommentSection from '../components/CommentSection'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import moment from "moment"
import DOMPurify from "dompurify";
import HashLoader from "react-spinners/HashLoader"
import { laptopSmall,mobile,tabletLg, mobileSmall, tabletSmall } from '../responsive'
import { axiosInstance } from '../config'

const Container = styled.div`
    padding-right: 10px;
`

const Image = styled.div`
    background: linear-gradient(180deg, rgba(175,175,175,0.4125000341933649) 0%, rgba(51,48,48,1) 100%), 
    url(${props => props.Img ? props.Img : null});
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    ${mobile({ minHeight: "300px" })}
    ${mobileSmall({ minHeight: "200px" })}
`

const Info = styled.div`
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    color: white;
`

const Category = styled.span`
    font-size: 18px;
    letter-spacing: 1px;
    cursor: pointer;
    ${tabletLg({ fontSize: "14px" })}
    ${mobile({ fontSize: "11px" })}
    ${mobileSmall({ fontSize: "8px" })}
    &:hover{
        color: #ee4266;
    }
`

const Title = styled.h1`
    font-size: 60px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
           line-clamp: 1;
    -webkit-box-orient: vertical;
    ${laptopSmall({ fontSize: "40px" })}
    ${mobile({ fontSize: "20px" })}
    ${mobileSmall({ fontSize: "15px" })}

    &:hover{
        color: #ee4266;
    }
`

const AddInfo = styled.ul`
    display: flex;
    margin: 3px 0 70px 0;
    ${mobile({ marginBottom: "30px", paddingLeft:"0" })}
`

const PublishDate = styled.li`
    font-size: 13px;
    ${mobile({ fontSize: "11px", listStyle:"none" })}
    ${mobileSmall({ fontSize: "8px", listStyle:"none" })}
`

const Comments = styled.li`
    margin: 0 25px;
    font-size: 13px;
    ${mobile({ fontSize: "11px" })}
    ${mobileSmall({ fontSize: "8px" })}
`

const Views = styled.li`
    font-size: 13px;
    ${mobile({ fontSize: "11px" })}
    ${mobileSmall({ fontSize: "8px" })}
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 11%;
    ${mobileSmall({ padding: "0 5%" })}
`

const PostWrapper = styled.div`
    flex: 3;
    padding-right: 30px;
    ${tabletLg({ paddingRight: "0" })}
`

const Share = styled.div`
    margin-top: 25px;
    display: flex;
    align-items: center;
    color: white;
    ${mobileSmall({ marginTop: "15px" })}
`

const Icon = styled.div`
    font-size: 10px;
    font-weight: 200;
    letter-spacing: 2px;
    padding: 8px 10px;
    margin-right: 8px;
    border-radius: 4px;
    background-color: ${props => props.bg};
    ${laptopSmall({ fontSize: "6px" })}
`

const PostTitle = styled.h3`
    margin: 30px 0 15px 0;
    ${mobileSmall({ fontSize: "15px", margin:"17px 0 15px 0" })}
`

const PostContent = styled.div`
    
`

const P = styled.div`
    font-size: 18px;
    word-spacing: 2px;
    margin-bottom: 11px;
    text-align: justify;

    & .link{
        color: #ee4266;
    }
`

const PostContentImage = styled.img`
    width: 100%;
    margin: 15px 0;
`

const PostQuote = styled.div`
    border: 1px solid #e8eaed;
    padding: 15px 15px;
    margin: 20px 0;
`


const QuoteSent = styled.span`
    font-size: 20px;

    &::before {
        content: "\f10d";
        font-family: fontAwesome;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        border-radius: 50%;
        color: #ee4266;
        font-size: 30px;
        background: #fff;
        border: 2px solid #e8eaed;
        float: left;
        margin-right: 10px;
    }
`

const LikeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px 0px;
    ${tabletSmall({ fontSize: "15px" })}
    ${mobileSmall({ fontSize: "13px" })}
`

const Likes = styled.span`
    border-left: 1px solid #ee4266;
    padding-left: 20px;
`

const Req = styled.h5`
    word-spacing: 2px;
    margin-bottom: 20px;
    text-align: justify;
    ${mobileSmall({ fontSize: "13px" })}

    & .link{
        font-size: 18px;
        color: #ee4266;
        ${mobileSmall({ fontSize: "15px" })}
    }
`

const MainContentDiv = styled.div`
    & > * {
        word-spacing: 1px;
        text-align: justify;
        margin-bottom: 11px;
    }

    & > p {
        font-size: 18px;
        ${laptopSmall({ fontSize: "15px" })}
        ${mobileSmall({ fontSize: "13px" })}

        & > img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width:70%;
            ${laptopSmall({ width:"100%", marginLeft: "auto", marginRight: "auto" })}
            ${mobile({ width:"100%", marginLeft: "auto", marginRight: "auto" })}
            ${mobileSmall({ width:"100%", marginLeft: "auto", marginRight: "auto" })}
        }
    }

    & > iframe {
            display: block;
            margin-left: auto;
            margin-right: auto;

            & > video {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    }


    & > blockquote{
        font-size: 19px;
        border: 1px solid #e8eaed;
        padding: 15px 15px;
        margin: 20px 0;
        ${laptopSmall({ fontSize: "15px" })}
        ${mobileSmall({ fontSize: "13px" })}

        &::before {
            content: "\f10d";
            font-family: fontAwesome;
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            border-radius: 50%;
            color: #ee4266;
            font-size: 30px;
            background: #fff;
            border: 2px solid #e8eaed;
            float: left;
            margin-right: 10px;
            ${mobileSmall({ fontSize: "20px", width:"40px", height:"40px", textAlign:"center", lineHeight:"40px" })}
        }
    }

    & > pre {
        font-size: 18px;
        white-space: pre-wrap;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
        color:white;
        background-color: #23241f;
        ${laptopSmall({ fontSize: "15px" })}
        ${mobileSmall({ fontSize: "13px", width:"70%" })}
    }
`

const Tags = styled.div`
    margin: 20px 0;
    ${laptopSmall({ fontSize: "15px" })}
    ${mobileSmall({ fontSize: "13px" })}
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

function SinglePost() {

    const [likes, setLikes] = useState([]);
    const [commentCount, setCommentCount] = useState()
    const [click, setClick] = useState()

    const [post, setPost] = useState({});
    const [isLoading, setLoading] = useState(true)

    const location = useLocation();

    const postId = location.pathname.split("/")[2];

    const W = window.innerWidth;


    useEffect(() => {
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)

    }, [postId]);

    useEffect(() => {
        axiosInstance.get(`api/posts/${postId}`).then(response => {
            setPost(response.data);

            setLoading(false)
        })
    }, [postId]);

    const { currentUser } = useContext(AuthContext);


    //console.log(postId)
    useEffect(() => {
        axiosInstance.get(`api/likes/${postId}`).then(response => {
            setLikes(response.data)
            //setComments(response.data);
        });
        if (!currentUser) {
            axiosInstance.get(`api/comments/getComments/${postId}`).then(response => {
                const count = response.data
                setCommentCount(count.length)
            })
        }
    }, [click]);


    const handleLike = async () => {
        if (likes.includes(currentUser.id)) {
            try {

                await axiosInstance.delete(`api/likes/deleteLike`, {
                    data: {
                        userid: currentUser.id,
                        postid: postId
                    }
                })
                setClick(true)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                //setClick(true)
                console.log(axiosInstance)
                await axiosInstance.post(`api/likes/addlike`, {
                    userid: currentUser.id,
                    postid: postId
                })
                setClick(false)
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <Container>
            {!isLoading ? (
                <>
                    <Image Img={post.img}>
                        <Info>
                            <Category>{post.cat}</Category>
                            <Title>{post.title}</Title>
                            <AddInfo>
                                {!isLoading && <PublishDate>{moment(post.date.split("T")[0]).format("MMM Do YY")}</PublishDate>}
                                <Comments><i class="fa-solid fa-comments"></i> {commentCount}</Comments>
                                <Views><i class="fa-solid fa-heart"></i> {likes.length}</Views>
                            </AddInfo>
                        </Info>
                    </Image>
                    <Wrapper>
                        <PostWrapper>
                            <Share>
                                <Icon bg='#225b99'>
                                    <i class="fa-brands fa-facebook-f">{W > 480 ?" | SHARE" : null}</i>
                                </Icon>
                                <Icon bg='#00adf2'>
                                    <i class="fa-brands fa-twitter">{W > 480 ?" | TWEET" : null}</i>
                                </Icon>
                                <Icon bg='#db4a39'>
                                    <i class="fa-brands fa-google-plus-g">{W > 480 ?" | ADD" : null}</i>
                                </Icon>
                                <Icon bg='#d62976'>
                                    <i class="fa-brands fa-instagram">{W > 480 ?" | SHARE" : null}</i>
                                </Icon>
                            </Share>
                            <PostTitle>{post.title}</PostTitle>
                            <MainContentDiv dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.descr, { ADD_TAGS: ['iframe'] }),
                            }}></MainContentDiv>
                            <Tags><span>Tags : </span>{post.tags}</Tags>
                            {currentUser ?
                                <>
                                    <LikeContainer>
                                        {likes.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{ color: "#ee4266", cursor: "pointer", fontSize: W < 320 ? "13px" :"20px" }} onClick={handleLike} /> : <FavoriteBorderOutlinedIcon style={{ cursor: "pointer", fontSize: W < 320 ? "13px" :"20px" }} onClick={handleLike} />}
                                        <Likes>{likes.length} likes</Likes>
                                    </LikeContainer>
                                    <CommentSection setCommentCount={setCommentCount} />
                                </>
                                :
                                <Req>To like and comment on this post please <Link className='link' to="/login">Login</Link></Req>
                            }
                            <RelatedPosts props={post.cat} />
                        </PostWrapper>
                        <MediaWrapper>
                            <SideBar />
                        </MediaWrapper>
                    </Wrapper>
                </>
            ) : <Preloader><HashLoader color="#ee4266" /></Preloader>}
        </Container>
    )
}

export default SinglePost