import { css } from "styled-components";

export const mobile = (props) => {
    //for mobile devices
    return css`
       @media only screen and (max-width: 480px) {
        ${props}
        
       }
    `

}

export const mobileSmall = (props) => {
    //for mobile devices
    return css`
       @media only screen and (max-width: 320px) {
        ${props}
        {& .MuiFormControlLabel-label{font-size: 11px};
          .MuiButtonBase-root{font-size:12px}}
       }
    `

}

export const laptopSmall = (props) => {
    //for mobile devices
    return css`
       @media only screen and (max-width: 1066px) {
        ${props}
        {& .MuiFormControlLabel-label{font-size: 13px};
           .MuiButtonBase-root{width:90%}
        }
       }
    `

}


export const tabletLg = (props) => {
    //for mobile devices
    return css`
       @media only screen and (max-width: 768px) {
        ${props}
        {& .MuiButtonBase-root{width:100%}}
       }
    `

}

export const tabletSmall = (props) => {
    //for mobile devices
    return css`
       @media only screen and (max-width: 618px) {
        ${props}
        {& .MuiButtonBase-root{width:90%};
        }
       }
    `

}