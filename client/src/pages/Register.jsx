import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"
import { AuthContext } from '../context/authContext'
import { laptopSmall, tabletSmall, mobile,mobileSmall } from '../responsive';



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(90deg, rgba(246,103,133,0.7) 35%, rgba(238,66,102,0.7) 100%),
    #ee4266 url("https://source.unsplash.com/2VyyvZns3qQ") no-repeat;
    border-radius: 5px;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${laptopSmall({ backgroundRepeat: "repeat-y"})}
    ${mobile({ background:"white" })}
`

const Wrapper = styled.div`
    width: 60vw;
    background-color: white;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    ${laptopSmall({ width: "80%" })}
    ${mobile({ width: "100%" })}
`

const Image = styled.div`
    flex: 1;
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
    ${laptopSmall({ padding: "25px 10px 25px 15px" })}
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

const A = styled.a`
    cursor: pointer;
    ${laptopSmall({ fontSize: "14px" })}

    & .link{
        text-decoration: none;
        color: #ee4266;
        ${mobileSmall({ fontSize: "13px" })}
    }
`

const Buttons = styled.div`
    margin: 25px 0 8px 0;
    display: flex;
    gap: 8px;
    ${laptopSmall({ flexDirection: "column",marginTop:"10px" })}

    & .MuiButtonBase-root{
        width:95%
        ${mobileSmall({ fontSize: "13px" })}
        }
`

const Hr = styled.h2`
    width: 85%; 
   text-align: center; 
   border-bottom: 1px solid #97989b; 
   line-height: 0.1em;
   margin: 20px 0 20px;
    
`

const Span = styled.span`
color: #97989b;
    font-size: 18px;
    font-weight: 300;
    background:#fff; 
    padding:0 10px;
    ${laptopSmall({ fontSize: "13px" })}
`


const Form = styled.form`
    & input[type=checkbox]{
        ${tabletSmall({ width: "13px" })}
    }
`

const Input = styled.input`
    width: ${props => props.type === "checkbox" ? '15px' : '80%'}; 
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;
    ${tabletSmall({ width: "90%" })}

    

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Label = styled.label`
    ${laptopSmall({ fontSize: "14px" })}
`

const FormError = styled.div`
  color: #b32e2e;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
  text-align: center;
`;

const FormSuccess = styled.span`
  color: #28a828;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
`;

const FieldError = styled.div`
 
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`;

const ButtonSX = {
    fontSize: '14px',
    width: '80%',
    backgroundColor: 'rgba(246,103,133,0.7)',
    margin: '10px',

    '&:hover': {
        backgroundColor: 'rgba(246,103,133,0.7)'
    }
}


const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
    username: yup
        .string()
        .min(3, "Please enter you real name")
        .required("Username is required!"),
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup
        .string()
        .matches(PASSWORD_REGEX, "Please enter a strong password")
        .required(),
    checkbox: yup
        .boolean().oneOf([true], 'message')
})


function Register() {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const { register } = useContext(AuthContext)

    const onSubmit = async (values) => {
        try{
            await register(values)
            setError(null);
            formik.resetForm();
            navigate(-2)
        }catch(err){
                if (err && err.response) setError(err.response.data);
                setSuccess(null);
            };
    }


    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            checkbox: false,
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })

    console.log(error)

    return (
        <Container>
            {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
            
            <Wrapper>
                <Image></Image>
                <RegisterDiv>
                    <Title>Get Started</Title>
                    <SubTitle>Already have an account? <A><Link className='link' to="/login">Log in</Link></A></SubTitle>
                    <Buttons>
                        <Button variant="outlined" startIcon={<i class="fa-brands fa-google" style={{ fontSize: '11px' }}></i>} sx={{ fontSize: '10.5px', color: 'black', borderColor: '#959595', '&:hover': { borderColor: '#959595' } }}>
                            Sign up with Google
                        </Button>
                        <Button variant="contained" startIcon={<i class="fa-brands fa-facebook" style={{ fontSize: '11px' }}></i>} sx={{ fontSize: '10.5px' }}>
                            Sign up with Facebook
                        </Button>
                    </Buttons>
                    <Hr><Span>or</Span></Hr>
                    {!success && <FormError style={{display: error ? "block" : "none"}}>{error ? error : ""}</FormError>}
                    <Form onSubmit={formik.handleSubmit}>
                        <Label htmlfor="username">Username</Label><br />
                        <Input
                            type="text"
                            placeholder='xy_z'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} >
                        </Input><br />
                        <FieldError style={{display: formik.touched.username && formik.errors.username ? "block" : "none"}}>
                            {formik.touched.username && formik.errors.username
                                ? formik.errors.username
                                : ""}
                        </FieldError>
                        <Label htmlfor="email">Email Address</Label><br />
                        <Input
                            type="email"
                            placeholder='xyz@mail.com'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} >
                        </Input><br />
                        <FieldError style={{display: formik.touched.email && formik.errors.email ? "block" : "none"}}>
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
                        <FieldError style={{display: formik.touched.password && formik.errors.password ? "block" : "none"}}>
                            {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                        </FieldError>
                        <Input
                            type="checkbox"
                            name='checkbox'
                            value={formik.values.checkbox}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Label htmlfor="Terms" style={{ fontSize: '13px' }}>  I agree to platform's <A><Link className='link' to="/terms">Term's of Services</Link></A> and <A><Link className='link' to="/privacy">Privacy Policy.</Link></A></Label><br/>
                        <FieldError style={{display: formik.touched.checkbox && formik.errors.checkbox ? "block" : "none"}}>
                            {formik.touched.checkbox && formik.errors.checkbox
                                ? formik.errors.checkbox
                                : ""}
                        </FieldError>
                        <Button type="submit" variant="contained" sx={ButtonSX}>
                            Sign Up
                        </Button>
                    </Form>
                </RegisterDiv>
            </Wrapper>
        </Container>
    )
}

export default Register