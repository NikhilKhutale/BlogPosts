import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../context/authContext";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useFormik } from "formik"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { laptopSmall, tabletLg, tabletSmall,mobile, mobileSmall } from '../responsive';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../firebase";
import { axiosInstance } from '../config';



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
    gap: 15px;
    ${mobile({ background: "white" })}
`

const Wrapper = styled.div`
    width: 800px;
    padding: 70px 0;
    border-radius: 15px;
    background-color: white;
    display: flex;
    justify-content: center;
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

const FieldError = styled.div`
 
  color: #b32e2e;
  font-size: 11px;
  min-height: 18px;
`

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
        .required("You should enter password"),
})

function UserProfile() {

    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState()
    const [urlImg, setUrlImg] = useState()

    const navigate = useNavigate()
    const { currentUser, updateProfile } = useContext(AuthContext);
    const W = window.innerWidth;

    //console.log(file)

    //lets create upload img function
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file)
            const res = await axiosInstance.post(`api/upload`, formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    const handleClick = async (e) => {
        const files = e.target.files[0]
        const fileName = new Date().getTime() + files.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, files);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log("Upload is " + progress + "% done");
            setProgress(Math.round(progress))
            switch (snapshot.state) {
              case "paused":
                //console.log("Upload is paused");
                break;
              case "running":
                //console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
    
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              
              setProgress("done")
              //console.log(downloadURL)
              setUrlImg(downloadURL);
            });
          }
        );
      }

    const onSubmit = async (values) => {

        try {
            await updateProfile({ ...values, imgUrl: urlImg ? urlImg : null })
            setError(null);
            formik.resetForm();
            navigate(-1)
        } catch (err) {
            if (err && err.response) setError(err.response.data);
            setSuccess(null);
        };
    }


    const formik = useFormik({
        initialValues: {
            username: currentUser.username,
            email: currentUser.email,
            password: "",
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })

    console.log(error)



    return (
        <Container>

            <Wrapper>
                <LeftSide>
                    <div>
                        <ProfileImg>{urlImg ? <IMG src={urlImg} /> : (currentUser && currentUser.img === null ? <PersonIcon sx={{ width: "100%", height: "100%" }} /> : <IMG src={currentUser.img} />)}</ProfileImg>
                        <input style={{ display: "none" }}
                            type="file" id="file"
                            onChange={handleClick}
                        />
                        <Edit><Label htmlFor="file"><EditIcon /></Label></Edit>
                    </div>
                </LeftSide>
                <Form onSubmit={formik.handleSubmit} style={{ flex: 1 }}>
                    <RightSide>
                        <label style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px"}} htmlFor="username">Username</label>
                        <input style={{ padding: "8px 0 5px 5px", width: W < 480 ? "100%" : "70%" }}
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FieldError style={{display: formik.touched.username && formik.errors.username ? "block" : "none"}}>
                            {formik.touched.username && formik.errors.username
                                ? formik.errors.username
                                : ""}
                        </FieldError>
                        <label style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px" }} htmlFor="email">email</label>
                        <input style={{ padding: "8px 0 5px 5px", width: W < 480 ? "100%" : "70%" }}
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FieldError style={{display: formik.touched.email && formik.errors.email ? "block" : "none"}}>
                            {formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""}
                        </FieldError>
                        <label style={{ margin: "15px 0 5px 0", fontSize: W < 618 ? "14px": "17px" }} htmlFor="password">Current / Change Password</label>
                        <input style={{ padding: "8px 0 5px 5px", width: W < 480 ? "100%" : "70%" }}
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <FieldError style={{display: formik.touched.password && formik.errors.password ? "block" : "none"}}>
                            {formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : ""}
                        </FieldError>
                        <button style={{ padding: W < 480 ? "8px 5px" : "8px 0 5px 5px", width: "40%", marginTop: "25px", backgroundColor: "#ee4266", border: "none", cursor:"pointer", color:"white" }}
                            type="submit">
                            Update
                        </button>
                    </RightSide>
                </Form>
            </Wrapper>
            
        </Container>
    )
}

export default UserProfile