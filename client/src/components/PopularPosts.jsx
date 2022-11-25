import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { axiosInstance } from '../config'
import PopularPost from './PopularPost'

const Container = styled.div`
  
`

function PopularPosts() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`api/search/popular`)
      setPosts(res.data)
    };
    fetchData()
  }, [])

  //console.log(posts)
  return (
    <Container>
      {posts.slice(0, 4).map((post, index) => (
        <PopularPost key={index} props={post} />
      ))}
    </Container>
  )
}

export default PopularPosts