import React, { useEffect, useState } from 'react'
import Posts from '../components/Posts'
import HashLoader from "react-spinners/HashLoader"
import styled from 'styled-components'

const Preloader = styled.div`
    height: 100vh;
    width: 95vw;
    
    display: flex;
    align-items: center;
    justify-content: center;
`

function Home() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 6000)
    }, [])


    return (
        <>
            {loading === false ? 
                <Posts />
            : <Preloader><HashLoader color="#ee4266" /></Preloader>}
        </>
    )
}

export default Home