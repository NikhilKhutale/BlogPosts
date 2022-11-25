import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useFormik } from "formik"
import * as yup from "yup"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { laptopSmall, tabletLg, mobileSmall, tabletSmall, mobile } from '../responsive';
import { axiosInstance } from '../config';

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${laptopSmall({ margin: "15px 0" })}
`

const Wrapper = styled.div`
  width: 1000px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${laptopSmall({ width: "768px" })}
  ${tabletLg({ width: "618px" })}
  ${tabletSmall({ width: "480px" })}
  ${mobile({ width: "320px" })}
`

const ContactDiv = styled.div`
  flex: 1;
  ${mobileSmall({ width: "70%", display:"flex", alignItems:"center", flexDirection:"column" })}
`

const ContentDivTitle = styled.h1`
  ${laptopSmall({ fontSize: "20px" })}
  
`

const Form = styled.form`
    margin-top: 20px;
    ${mobileSmall({ width: "85%" })}

    & .MuiButtonBase-root{
      ${mobile({ marginLeft: "12px" })}
    }
`

const Input = styled.input`
    width: 93%;
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;
    ${tabletLg({ width: "100%" })}
    ${mobileSmall({ padding: "8px 6px", width:"91%" })}

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Textarea = styled.textarea`
    min-width: 93%;
    min-height: 120px;
    padding: 10px 8px; 
    margin: 8px 0; 
    border: 1px solid #ccc; 
    border-radius: 5px;
    transition: all ease-in-out;
    ${tabletLg({ width: "100%" })}
    ${mobileSmall({ padding: "8px 6px",width:"90%" })}

    &:focus{
        outline-color: rgba(246,103,133,0.7);
        box-shadow: 0 0 10px #719ECE;
    }
`

const Label = styled.label`
    ${laptopSmall({ fontSize: "13px" })}
`

const FormError = styled.div`
  color: #b32e2e;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
  text-align: center;
`

const FieldError = styled.div`
    text-align: ${props => props.Type === "Toperror" ? "center" : ""};
    font-size: 12px;
    color: red;
`

const Img = styled.img`
  flex: 2;
  margin-left: 70px;
  max-width: 655px;
  ${laptopSmall({ maxWidth: "300px" })}
  ${tabletLg({ display: "none" })}
`

const ButtonSX = {
  fontSize: '14px',
  width: '99%',
  backgroundColor: 'rgba(246,103,133,0.7)',
  marginTop: '10px',

  '&:hover': {
    backgroundColor: 'rgba(246,103,133,0.7)'
  }
}

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Please enter you real name")
    .required("Username is required!"),
  email: yup.string().email("Please enter a valid email address").required(),
  message: yup.string().max(400, "").required("Please enter a message"),
})

function ContactUs() {

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event) => {

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        sx={{position:"absolute",transform:"translateY(-70px) translateX(-25px)"}}
      >
        <CloseIcon fontSize="small" sx={{translateY:"30px"}}/>
      </IconButton>
    </React.Fragment>
  );

  const onSubmit = async (values) => {
    try {
      const res = await axiosInstance.post(`api/contactUS/`, values)
      setSuccess(res.data)
      setError(null);
      formik.resetForm();

    } catch (err) {
      if (err && err.response) setError(err.response.data);
    };
  }

  const formik = useFormik({
    initialValues: {
      username: currentUser ? currentUser.username : "",
      email: currentUser ? currentUser.email : "",
      message: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  })

  return (
    <Container>
      <Wrapper>
        <ContactDiv>
          <ContentDivTitle>Drop us a line</ContentDivTitle>
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
            <FieldError style={{ display: formik.touched.username && formik.errors.username ? "block" : "none" }}>
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
            <FieldError style={{ display: formik.touched.email && formik.errors.email ? "block" : "none" }}>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
            <Label htmlfor="message">Message</Label><br />
            <Textarea
              type="message"
              name='message'
              rows="4"
              cols="42"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}>
            </Textarea><br />
            <FieldError style={{ display: formik.touched.message && formik.errors.message ? "block" : "none" }}>
              {formik.touched.message && formik.errors.message
                ? formik.errors.message
                : ""}
            </FieldError>
            <Button type='submit' variant="contained" sx={ButtonSX} onClick={() => success && handleClick()} >
              Submit
            </Button>
          </Form>
        </ContactDiv>
        <Img src='https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1667564635527contact%20us.jpg?alt=media&token=113a2851-16b7-4bb2-b6c1-26b170b39974' alt='Contact Us Image'></Img>
      </Wrapper>
      <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={handleClose}
          message={<div><h4>Hi there</h4><br/>
                  <p>We've received your message<br/>
                    and will get back to you within<br/>
                    24 hours.</p><br/>
                    <p>In meantime make sure to<br/>
                     follow us on twitter</p></div>}
          action={action}
          style={{bottom: "24px",right: "24px",left: "auto"}}
        />
    </Container>
  )
}

export default ContactUs