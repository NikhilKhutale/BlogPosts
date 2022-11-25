import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Posts from '../components/Posts'
import { useLocation } from 'react-router-dom'
import { laptopSmall, tabletLg, tabletSmall, mobile, mobileSmall } from '../responsive'



const Container = styled.div`
    
`

const Image = styled.div`
    background: linear-gradient(180deg, rgba(175,175,175,0.4125000341933649) 0%, rgba(51,48,48,1) 100%), 
    url('https://source.unsplash.com/bcLE7reXFLM');
    min-height: 300px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ minHeight: "300px" })}
    ${mobileSmall({ minHeight: "200px" })}
`

const CategoryTitle = styled.h1`
    color: white;
    font-size: 60px;
    ${laptopSmall({ fontSize: "50px" })}
    ${tabletLg({ fontSize: "40px" })}
    ${tabletSmall({ fontSize: "30px" })}
`

function SingleCategory() {

    const catQuery = useLocation().search
    const cat = new URLSearchParams(catQuery).get("cat");

    useEffect(() => {
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)
        

    }, [cat]);

    //console.log(cat)
    return (
        <Container>
            <Image>
                <CategoryTitle>{cat.toUpperCase()}</CategoryTitle>
            </Image>
                <Posts />
        </Container>

    )
}

export default SingleCategory