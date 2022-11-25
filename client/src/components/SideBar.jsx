import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PopularPosts from './PopularPosts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, useFormik } from "formik"
import * as yup from "yup"
import { AuthContext } from '../context/authContext'
import { laptopSmall, tabletLg } from '../responsive';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    ${tabletLg({ display: "none" })}
`


const ContainerTitle = styled.h2`
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;
    ${laptopSmall({ fontSize: "14px" })}

    &::after{
        content: '';
        width: 55%;
        border-bottom: 2px solid #938d8d;
        position: absolute;
        top: 50%;
        margin-left: 5px;
    }
`

const SocialMeadiaContainer = styled.div`
    
`


const SocialMediaIcons = styled.div`
    
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`

const Icons = styled.div`
    padding: 15px 10px;
    text-align: center;
`

const Logo = styled.div`
    color: white;
    margin-bottom: ${props => props.From === 'FontA' ? 12 : 5}px;
`

const FollowerCount = styled.p`
    color: white;
    font-size: 13px;
`

const CategoriesContainer = styled.div`
    margin-top: 30px;
`

const CategoriesName = styled.div`
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Category = styled.a`
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    ${laptopSmall({ fontSize: "13px" })}

    & .link{
        text-decoration: none;
        color: #11151c;

        &:hover {
        color: #ee4266;
    }
    }
`

const NewsLetterContainer = styled.div`
    margin-top: 30px;
`

const Subscription = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 15px 15px 15px;
    border-left: 2px dashed rgba(151, 152, 155, 0.5);
    border-right: 2px dashed rgba(151, 152, 155, 0.5);
`

const SubscriptionText = styled.p`
    word-spacing: normal;
    margin-bottom: 17px;
    ${laptopSmall({ fontSize: "13px" })}
`

const SubscriptionInput = styled.input`
    margin-bottom: 15px;
    padding: 10px;
`

const SubscriptionButton = styled.button`
    width: 60%;
    padding: 10px 20px;
    border: 2px solid black;
    border-color: #ee4266;
    background-color: #ee4260;
    color: white;
    transition: all 0.3s ease-out;
    cursor: pointer;

    &:hover {
        background-color: white;
        color: black;
    }
`

const PopularPostContainer = styled.div`
    margin-top: 30px;
`

const FieldError = styled.div`
 
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`;

const validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address").required(),
})


function CategoriesForPage() {

    const catQuery = useLocation().search
    const cat = new URLSearchParams(catQuery).get("cat");

    useEffect(() => {
        const body = document.querySelector('#root');

        body.scrollIntoView({
            behavior: 'smooth'
        }, 500)

    }, [cat]);
    

    return (
        <CategoriesContainer>
            <ContainerTitle>CATEGORIES</ContainerTitle>
            <CategoriesName>
                <Category><Link className='link' to={`/?cat=lifestyle`}>LIFESTYLE</Link></Category>
                {/*<CategoryPostsCount>600</CategoryPostsCount>*/}
            </CategoriesName>
            <CategoriesName>
                <Category><Link className='link' to={`/?cat=fashion`}>FASHION</Link></Category>
                {/*<CategoryPostsCount>334</CategoryPostsCount>*/}
            </CategoriesName>
            <CategoriesName>
                <Category><Link className='link' to={`/?cat=technology`}>TECHNOLOGY</Link></Category>
                {/*<CategoryPostsCount>450</CategoryPostsCount>*/}
            </CategoriesName>
            <CategoriesName>
                <Category><Link className='link' to={`/?cat=travel`}>TRAVEL</Link></Category>
                {/*<CategoryPostsCount>250</CategoryPostsCount>*/}
            </CategoriesName>
            <CategoriesName>
                <Category><Link className='link' to={`/?cat=health`}>HEALTH</Link></Category>
                {/*<CategoryPostsCount>50</CategoryPostsCount>*/}
            </CategoriesName>
        </CategoriesContainer>
    )
}

function SideBar() {

    const [Success,setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { isSubscribed, currentUser } = useContext(AuthContext)

    const onSubmit = async (values) => {
        try{
            await isSubscribed(values)
            setError(null);
            formik.resetForm();
        }catch(err){
                if (err && err.response) setError(err.response.data);
                setSuccess(null);
            };
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            subscribe:true,
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })

    

    return (
        <Container>
            <SocialMeadiaContainer>
                <ContainerTitle>
                    SOCIAL MEDIA
                </ContainerTitle>
                <SocialMediaIcons>
                    <Icons style={{ backgroundColor: '#225b99' }}>
                        <Logo From='FontA'>
                            <i class="fa-brands fa-facebook-f"></i>
                        </Logo>
                        <FollowerCount>
                            15.4k
                            Followers
                        </FollowerCount>
                    </Icons>
                    <Icons style={{ backgroundColor: '#00adf2' }}>
                        <Logo>
                            <TwitterIcon />
                        </Logo>
                        <FollowerCount>
                            12.8k
                            Followers
                        </FollowerCount>
                    </Icons>
                    <Icons style={{ backgroundColor: '#dc4d2d' }}>
                        <Logo>
                            <GoogleIcon />+
                        </Logo>
                        <FollowerCount>
                            10k
                            Followers
                        </FollowerCount>
                    </Icons>
                </SocialMediaIcons>
            </SocialMeadiaContainer>
            <CategoriesForPage />
            <NewsLetterContainer>
                <ContainerTitle>NEWSLETTER</ContainerTitle>
                <Subscription onSubmit={formik.handleSubmit}>
                    {Success ? <div>hihii</div>:null}
                    <SubscriptionText>Lorem ipsum dolor sit, amet led consectetur .</SubscriptionText>
                    <SubscriptionInput 
                        type="email"
                        placeholder='xyz@mail.com'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <FieldError style={{display: formik.touched.email && formik.errors.email ? "block" : "none"}}>
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""}
                        </FieldError>
                    <SubscriptionButton type='submit'>SUBSCRIBE</SubscriptionButton>
                </Subscription>
            </NewsLetterContainer>
            <PopularPostContainer>
                <ContainerTitle>POPULAR POSTS</ContainerTitle>
                <PopularPosts />
            </PopularPostContainer>
        </Container>
    )
}

export default SideBar