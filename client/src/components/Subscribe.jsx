import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { saperateCat } from '../data';
import { useFormik } from "formik"
import * as yup from "yup"
import { AuthContext } from '../context/authContext'
import { laptopSmall, mobile, tabletLg, tabletSmall, mobileSmall } from '../responsive';


const Container = styled.div`
    padding: 1% 11%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4.5rem;
    ${laptopSmall({ padding : "1% 0%" })}
    ${mobileSmall({ padding : "0.2% 0%", marginBottom:"1rem" })}
`

const SubscriptionDiv = styled.div`
    width: 64vw;
    background: linear-gradient(90deg, rgba(246,103,133,0.7) 35%, rgba(238,66,102,0.7) 100%),
    #ee4266 url("https://source.unsplash.com/-2vD8lIhdnw") no-repeat;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    ${laptopSmall({ width: "69vw" })}
    ${tabletSmall({ flexDirection: "column", alignItems: "center" })}
    ${mobile({ width:"80vw" })}
`

const RightSide = styled.div`
    padding: 4rem 4rem 2rem 4rem;
    flex: 1;
    text-align: left;
    color: white;
    ${laptopSmall({ padding : "4rem 2rem 2rem 4rem" })}
    ${tabletLg({ padding : "2rem 2rem 2rem 2rem" })}
    ${tabletSmall({ padding : "0", textAlign:"center"})}
    ${mobile({ display:"none"})}
`

const RightSideText = styled.span`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.75;
    margin-top: 1em;
    margin-bottom: 1em;
    ${laptopSmall({fontSize: "0.9rem"})}
    ${tabletLg({ fontSize: "0.8rem" })}
    
`

const RightTitle = styled.span`
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.38;
    display: block;
    margin-top: 2.5rem;
    ${laptopSmall({fontSize: "1.5rem"})}
    ${tabletLg({fontSize: "1.3rem"})}
`

const LeftSide = styled.div`
    padding: 3rem 3rem 3rem 0;
    flex: 2;
    color: white;
    ${tabletLg({ padding: "1rem 0" })}
    ${tabletLg({ width: "75%" })}
`

const Form = styled.form`
    
`

const CheckboxTitle = styled.h3`
    letter-spacing: 0.1rem;
    padding-bottom: 1rem;
    ${mobileSmall({ fontSize: "12px" })}
`

const SubscriptionForm = styled.ul`
    list-style: none;
    padding: 0;
`

const List = styled.li`
    display:inline-block;
    width:15rem;
    margin-right: 25px;
    text-transform: capitalize;
    ${tabletLg({ width: "6rem" })}
    
`

const InputContainer = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 1rem;
    ${laptopSmall({ flexDirection: "column", gap:"10px", alignItems: "flex-start" })}
    ${tabletSmall({ width: "100%" })}
`

const InputAndTitle = styled.div`
    flex: 2;
    ${laptopSmall({ flex: "1" })};
    ${tabletSmall({ width: "90%" })}
`

const IputTitle = styled.h4`
    letter-spacing: 0.1rem;
    padding: 0.5rem 0 0.2rem;
    ${mobileSmall({ fontSize: "12px" })}
`

const Input = styled.input`
    padding: 5px;
    width: 90%;
    ${laptopSmall({ width: "100%" })}
`

const ButtonContainer = styled.div`
    flex: 1;
    
`

const Button = styled.button`
    width: 100%;
    padding: 10px 30px;
    border: 2px solid black;
    border-radius: 5px;
    border-color: #ee4266;
    background-color: #ee4260;
    color: white;
    transition: all 0.3s ease-out;
    cursor: pointer;
    font-size: 15px;
    ${laptopSmall({ padding : "5px 20px" })}
    ${mobileSmall({ fontSize: "12px" })}

    &:hover {
        background-color: white;
        color: black;
    }
`

const PrivacyConcern = styled.span`
    ${laptopSmall({ fontSize: "10px" })}
    ${tabletLg({ display:"none" })}
`

const FieldError = styled.div`
 
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`;

const FormSuccess = styled.span`
  color: #28a828;
  font-size: 12px;
  min-height: 20px;
  font-weight: 600;
`

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
    checkbox: yup.array().min(1, "Min 1 Category should be selected!")
})

function Subscribe() {

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null)
    const { subscribedCategory, currentUser } = useContext(AuthContext)

    const onSubmit = async (values) => {
        try {
            await subscribedCategory(values)
            formik.resetForm();
            setError(null);
            setSuccess(true)
        } catch (err) {
            if (err && err.response) setError(err.response.data);
            setSuccess(null);
        };
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            lifestyle: null,
            fashion: null,
            technology: null,
            travel: null,
            health: null
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })

    const handleChange = (e) => {
        const { checked, name } = e.target;
        if (checked) {
          formik.setFieldValue("checkbox", [...formik.values.checkbox, name]);
        } else {
          formik.setFieldValue(
            "checkbox",
            formik.values.checkbox.filter((v) => v !== name)
          );
        }
      };

    
    return (
        <Container id='subscribenow'>
            <SubscriptionDiv>
                <RightSide>
                    <RightTitle>Subscribe to our blog</RightTitle>
                    <RightSideText>Stay up to date with the technology, lifestyle, fashion and health tips.</RightSideText>
                </RightSide>
                <LeftSide>
                {!error && <FormSuccess>{success ? "Thanks for subscribing..." : ""}</FormSuccess>}
                    <Form onSubmit={formik.handleSubmit}>
                        <CheckboxTitle>I want the latest in..</CheckboxTitle>
                        <SubscriptionForm>
                           
                            {saperateCat.map((Category, index) => (
                                <List key={index}>
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: '#fff',
                                            '&.Mui-checked': {
                                                color: '#f12f58',
                                            }, '& .MuiSvgIcon-root': { fontSize: 17 }
                                        }} />}
                                        label={Category}
                                        name={Category}
                                        value={formik.values.saperateCat}
                                        checked={formik.values.saperateCat}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </List>
                            ))}
                            {error ? <FieldError> {error}</FieldError> : null}
                        </SubscriptionForm>
                        <InputContainer>
                            <InputAndTitle>
                                <IputTitle>Email Address</IputTitle>
                                <Input
                                    type="email"
                                    placeholder='xyz@mail.com'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputAndTitle>
                            
                            <ButtonContainer>
                                <Button type="submit">Subscribe</Button>
                            </ButtonContainer>
                        </InputContainer>
                        <FieldError style={{ display: formik.touched.email && formik.errors.email ? "block" : "none" }}>
                                {formik.touched.email && formik.errors.email
                                    ? formik.errors.email
                                    : ""}
                            </FieldError>
                    </Form>
                    <PrivacyConcern>We're committed to your privacy. BlogPosts uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our <a style={{ textDecoration: 'underline', cursor: 'pointer' }}>privacy policy</a>.</PrivacyConcern>
                </LeftSide>
            </SubscriptionDiv>
        </Container >
    )
}

export default Subscribe