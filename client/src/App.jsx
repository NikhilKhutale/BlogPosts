import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import SingleCategory from './pages/SingleCategory'
import AboutUS from './pages/AboutUS'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import UserProfile from './pages/UserProfile';
import UserDetails from './pages/UserDetails';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';


const Layout = ()=>{
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createHashRouter([
  {
    path:"/",
    element:<Layout/>,
    errorElement:<ErrorPage />,
    children:[
      {
        path:"/",
        element:<Home/>,
        errorElement:<ErrorPage />,
      },
      {
        path:"/post/:id",
        element:<SinglePost/>,
        errorElement:<ErrorPage />,
      },
      {
        path:"/explore",
        element:<SingleCategory/>,
        errorElement:<ErrorPage />,
      },
      {
        path:"/search",
        element:<SearchPage/>,
        errorElement:<ErrorPage />,
      },
      {
        path:"/about",
        element:<AboutUS/>,
        errorElement:<ErrorPage />,
      },
      {
        path:"/contact",
        element:<ContactUs/>,
        errorElement:<ErrorPage />,
      }
    ]
  },
  {
    path:"/login",
    element:<LogIn/>,
    errorElement:<ErrorPage />,
  },
  {
    path:"/register",
    element:<Register/>,
    errorElement:<ErrorPage />,
  },
  {
    path:'/profile',
    element:<UserDetails/>,
    errorElement:<ErrorPage />,
  },
  {
    path:'/updateprofile',
    element:<UserProfile/>,
    errorElement:<ErrorPage />,
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App