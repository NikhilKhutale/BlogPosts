import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useFormik } from "formik"
import * as yup from "yup"
import { AuthContext } from '../context/authContext'
import { laptopSmall, tabletSmall,mobile, mobileSmall } from '../responsive';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, rgba(246,103,133,0.7) 35%, rgba(238,66,102,0.7) 100%),
    #ee4266 url("https://source.unsplash.com/2VyyvZns3qQ") no-repeat;
    border-radius: 5px;
    background-size: 100%;
    //position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${laptopSmall({ backgroundRepeat: "repeat-y"})}
    ${mobile({ background: "white" })}
`

const Wrapper = styled.div`
    width: 60%;
    //height: 70vh;
    background-color: white;
    //position: absolute;
    //top: 16%;
    //left: 20%;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    ${laptopSmall({ width: "80%" })}
    ${mobile({ width: "100%" })}
`

const Image = styled.div`
    flex: 1;
    //width: 50%;
    //height: 100%;
    background: linear-gradient(360deg, rgba(240,78,112,0.26404065043986347) 100%, rgba(246,102,132,0.26684177088804273) 100%), 
    url("https://source.unsplash.com/BlGmdY18CFQ") center;
    border-radius: 10px;
    margin-right: 25px;
    ${laptopSmall({ marginRight: "0" })}
    ${tabletSmall({ display: "none" })}
`

const RegisterDiv = styled.div`
    flex: 1;
    padding: 50px 10px 50px 25px;
    ${laptopSmall({ paddingLeft: "15px" })}
    ${tabletSmall({ padding: "50px 35px" })}
    ${mobileSmall({ padding: "50px 10px" })}
`

const Title = styled.h2`
    margin-bottom: 6px;
    ${laptopSmall({ fontSize: "17px" })}
    ${mobileSmall({ fontSize: "15px" })}
`
const SubTitle = styled.span`
    ${laptopSmall({ fontSize: "14px" })}
    ${mobileSmall({ fontSize: "13px" })}
`

const Form = styled.form`
    margin-top: 20px;
    width: fit-content;

    & #Terms{
        ${laptopSmall({ width: "13px" })}

    }
`

const Input = styled.input`
    width: ${props => props.type === "checkbox" ? '15px' : '100%'}; 
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;
    ${laptopSmall({ width: "90%" })}

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }

    
`

const Label = styled.label`
    ${laptopSmall({ fontSize: "14px" })}
    ${mobileSmall({ fontSize: "13px" })}
`


const Extra = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
`

const A = styled.a`
    flex: 1;
    cursor: pointer;
    ${laptopSmall({ fontSize: "14px" })}
    

    & .link{
        text-decoration: none;
    color: #ee4266;
    }
`

const Remember = styled.div`
    flex: 1;
`

const Span = styled.span`
    display: block;
    margin: 8px 0 0 100px;
    font-size: 13px;
    ${laptopSmall({ fontSize: "12px", marginLeft: "50px"})}
    ${mobileSmall({ fontSize: "12px", marginLeft: "20px"})}
`


const FieldError = styled.div`
    text-align: ${props => props.Type === "Toperror" ? "center" : ""};
    font-size: 12px;
    color: red;
`


const ButtonSX = {
    fontSize: '14px',
    width: '100%',
    backgroundColor: 'rgba(246,103,133,0.7)',
    margin: '10px',

    '&:hover': {
        backgroundColor: 'rgba(246,103,133,0.7)'
    }
}

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().required("Please enter a password"),
})

function LogIn() {
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const W = window.innerWidth;

    const onSubmit = async (values) => {
        try {
            await login(values)

            setError(null);
            formik.resetForm();
            navigate(-1)

        } catch (err) {
            if (err && err.response) setError(err.response.data);
        };
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })


    return (
        <Container>
            <Wrapper>
                <Image></Image>
                <RegisterDiv>
                    <Title>Welcome Back!</Title>
                    <SubTitle>Welcome Back! Please Enter Your Details</SubTitle>
                    <Form onSubmit={formik.handleSubmit}>
                        {error ? <FieldError Type="Toperror">{error}</FieldError> : null}
                        <Label htmlfor="email">Email Address</Label><br />
                        <Input
                            type="email"
                            placeholder='xyz@mail.com'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}  >
                        </Input><br />
                        <FieldError style={{ display: formik.touched.email && formik.errors.email ? "block" : "none" }}>
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""}
                        </FieldError>
                        <Label htmlfor="password">Password</Label><br />
                        <Input
                            type="password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>
                        </Input><br />
                        <FieldError style={{ display: formik.touched.password && formik.errors.password ? "block" : "none" }}>
                            {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                        </FieldError>
                        <Extra>
                            <Remember>
                                <Input type="checkbox" id="Terms" />
                                <Label for="Terms">  Remember Me</Label>
                            </Remember>
                            <A style={{ paddingLeft: W < 320 ? "0" : '50px', fontSize:  W < 320 ? "13px" :"14px"}}><Link className='link' to="/reset-pass">Forgot Password</Link></A>
                        </Extra>
                        <Button type='submit' variant="contained" sx={ButtonSX} >
                            Sign In
                        </Button>
                        <Button variant="outlined" startIcon={<i class="fa-brands fa-google" style={{ fontSize: '11px' }}></i>} sx={{ width: '100%', fontSize: '14px', margin: '10px', color: 'black', borderColor: '#959595', '&:hover': { borderColor: '#959595' } }}>
                            Sign in with Google
                        </Button>
                        <Span>Don't have an account? <A><Link className='link' to="/register"> Sign Up</Link></A></Span>
                    </Form>
                </RegisterDiv>
            </Wrapper>
        </Container>
    )
}

export default LogIn
