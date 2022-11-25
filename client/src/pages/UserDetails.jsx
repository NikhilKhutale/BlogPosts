import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../context/authContext";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { laptopSmall, tabletLg, tabletSmall, mobile, mobileSmall } from '../responsive';


const Container = styled.div`
    height: 100vh;
    background: linear-gradient(90deg, rgba(246,103,133,0.7) 35%, rgba(238,66,102,0.7) 100%),
    #ee4266 url("https://source.unsplash.com/2VyyvZns3qQ") no-repeat;
    border-radius: 5px;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Wrapper = styled.div`
    width: 800px;
    padding: 70px 0 0 0;
    background-color: white;
    display: flex;
    justify-content: center;
    -moz-border-radius: 0px;
    -webkit-border-radius:15px 15px  0px 0px ;
    border-radius:15px 15px 0px 0px;
    ${laptopSmall({ width: "768px" })}
    ${tabletLg({ width: "618px" })}
    ${tabletSmall({ width: "480px" })}
    ${mobile({ width: "320px", flexDirection:"column" })}
    ${mobileSmall({ width: "250px", flexDirection:"column" })}
`


const LeftSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ProfileImg = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    border: 1px solid #d6d6d6;

`

const IMG = styled.img`
     width: 200px;
    height: 200px;
    border-radius: 50%;
`

const Edit = styled.div`
    position: absolute;
    transform: translate(150px, -50px);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px 2px rgba(153, 153, 153, 0.8); 
    
    
    &:hover{
        background: #f1f1f1;
        border: 0.5px solid #d6d6d6;
        cursor: pointer;
    }
`

const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const  Form =styled.form`
    ${mobile({ display:"flex", justifyContent:"center" })}
`

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    //gap: 15px;
    ${mobile({ width:"80%" })}
`

const Category = styled.div`
    margin-left: 70px;
    text-transform: capitalize;
    ${tabletSmall({ fontSize: "15px" })}
`

const Buttons = styled.div`
    width: 800px;
    background-color: white;
    padding-bottom: 70px;
    display: flex;
    justify-content: space-around;
    -moz-border-radius: 0px;
    -webkit-border-radius: 0px 0px 15px 15px;
    border-radius: 0px 0px 15px 15px;
    ${laptopSmall({ width: "768px" })}
    ${tabletLg({ width: "618px" })}
    ${tabletSmall({ width: "480px" })}
    ${mobile({ width: "320px", flexDirection:"column", alignItems:"center" })}
    ${mobileSmall({ width: "250px", flexDirection:"column" })}
`

const Button = styled.button`
    padding: 8px 0 5px 5px;
    width: 40%;
    margin-top: 25px;
    background-color: #ee4266;
    border: none;
    color: white;
    cursor: pointer;
    ${mobile({ width: "70%" })}
`

function UserDetails() {

    const [cat, setCat] = useState([])
    const { currentUser, logout } = useContext(AuthContext);

    const navigate = useNavigate()
    const W = window.innerWidth;

    const handleClick = async()=>{
        try{
            await logout()
            navigate("/")
        }catch(err){
            return err
        }
    }

    const { id, username, email, img, isSubscribed, ...subscribed } = currentUser

    useEffect(() => {


        const Subscribed = async () => {
            for (const [key, value] of Object.entries(subscribed)) {
                if (value) { setCat(old => [...old, key]) }
            }
        };
        Subscribed()
    }, [])

    const uniqueCat = [...new Set(cat)]

    if (isSubscribed) {
        uniqueCat.push("NewsLetter")
    }

    return (
        <Container>

            <Wrapper>
                <LeftSide>
                    <div>
                        <ProfileImg>{currentUser && currentUser.img === null ? <PersonIcon sx={{ width: "100%", height: "100%" }} /> : <IMG src={currentUser.img} />}</ProfileImg>
                    </div>

                </LeftSide>
                <Form style={{ flex: 1 }}>
                    <RightSide>
                        <label style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px" }} htmlFor="username">Username</label>
                        <input style={{ padding: "8px 0 5px 5px", width: W < 480 ? "100%" : "70%" }}
                            type="text"
                            name="username"
                            value={currentUser.username}
                        />
                        <label style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px" }} htmlFor="email">email</label>
                        <input style={{ padding: "8px 0 5px 5px", width: W < 480 ? "100%" : "70%" }}
                            type="email"
                            name="email"
                            value={currentUser.email}
                        />
                        <p style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px" }}>You Subscribed For:-</p>
                        {uniqueCat.map((cat, index) => (
                            <Category key={index}>✔ {cat}</Category>
                        ))}
                    </RightSide>
                </Form>
            </Wrapper>
            <Buttons>
                <Button>
                    <Link style={{ textDecoration: "none", color: "white" }} onClick={handleClick}>Logout</Link>
                </Button>
                <Button>
                    <Link style={{ textDecoration: "none", color: "white" }} to="/updateprofile">Update Profile</Link>
                </Button>
            </Buttons>
        </Container>
    )
}

export default UserDetails