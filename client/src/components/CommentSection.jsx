import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { mobile, mobileSmall, tabletSmall } from '../responsive';
import { axiosInstance } from '../config';


const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerTitle = styled.h2`
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;
    ${tabletSmall({ fontSize: "15px" })}
    
`

const AddComment = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column", gap:"10px" })}
`

const Input = styled.input`
  flex: 2;
  padding: 0 10px;
  ${mobile({ padding: "8px 10px" })}
`

const Button = styled.button`
  flex: 1;
  margin-left: 10px;
  padding: 10px 0;
  cursor: pointer;
  ${mobile({ marginLeft: "0px", padding:"8px 0px" })}
`

const CommentList = styled.div`
    margin-bottom: 25px;
`

const Comment = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid #eee;

    &:nth-child(even){
      background-color: #f4eaec;
    }
`

const RealComment = styled.div`
  
`

const User = styled.h5`
  ${mobileSmall({ fontSize: "13px" })}
`

const MainComment = styled.p`
  text-align: justify;
  ${tabletSmall({ fontSize: "15px" })}
  ${mobileSmall({ fontSize: "13px" })}
`


function CommentSection(props) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();

  console.log(axiosInstance)
  const postId = location.pathname.split("/")[2];
  //console.log(postId)
  useEffect(() => {
    axiosInstance.get(`api/comments/getComments/${postId}`).then(response => {
      //console.log(response)
      setComments(response.data);
      props.setCommentCount(response.data.length)
    })
  }, [newComment]);

  //console.log(comments)
  const id = useParams()
  //console.log(id)
  const addComment = async () => {
    try {
      //console.log(newComment)
      await axiosInstance.post(`api/comments/addComment`, {
        commentBody: newComment,
        ...id,
        username: currentUser.username,
      })
      setNewComment("");
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container>
      <ContainerTitle>{comments.length} Comments</ContainerTitle>
      <AddComment>
        <Input
          type="text"
          placeholder="Comment..."
          autoComplete="off"
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />
        <Button onClick={addComment}> Add Comment</Button>
      </AddComment>
      <CommentList>
        {comments.slice().reverse().map((comment, index) => {
          return (
            <Comment key={index}>
              <AlternateEmailIcon/>
              <RealComment>
                <User>{comment.username}</User>
                <MainComment>{comment.comment}</MainComment>
              </RealComment>
            </Comment>
          )
        })}
      </CommentList>
    </Container>
  )
}

export default CommentSection