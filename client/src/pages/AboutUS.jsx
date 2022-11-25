import React from 'react'
import styled from 'styled-components'
import { laptopSmall, mobileSmall, tabletLg, tabletSmall } from '../responsive'


const Container = styled.div`
    
`

const ContainerTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1b1c1e;
    min-height: 300px;
    color: white;
    ${mobileSmall({minHeight:"200px" })}
`

const Title = styled.h1`
    font-size: 40px;
    font-weight: 800;
    ${laptopSmall({ fontSize: "30px" })}
    ${mobileSmall({fontSize:"17px", fontWeight:"500" })}
`

const SubTitle = styled.h4`
    font-size: 20px;
    font-weight: 500;
    ${laptopSmall({ fontSize: "17px" })}
    ${mobileSmall({ fontSize: "14px", textAlign:"center" })}
`

const Wrapper = styled.div`
    padding: 3% 11%;
    display: flex;
    justify-content: space-between;
    ${tabletLg({ flexDirection:"column" })}
    ${mobileSmall({ flexDirection:"column", padding:"3% 5%" })}
`

const LeftSide = styled.div`
    flex: 1;
    padding-right: 30px;
    ${tabletSmall({paddingRight:"0" })}
    ${mobileSmall({paddingRight:"0" })}
`

const RightSide = styled.div`
    flex: 1;
    padding-left: 30px;
    ${tabletLg({paddingLeft:"0" })}
    ${mobileSmall({paddingLeft:"0" })}
`

const WrapperTitle = styled.div`
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.1;
    ${laptopSmall({ fontSize: "14px" })}

    &::after{
        content: '';
        width: 75%;
        border-bottom: 2px solid #938d8d;
        position: absolute;
        top: 50%;
        margin-left: 5px;
        ${mobileSmall({width:"50%" })}
    }
`

const P = styled.p`
    font-size: 18px;
    word-spacing: 2px;
    word-wrap: break-word;
    margin-bottom: 11px;
    text-align: justify;
    ${laptopSmall({ fontSize: "13px" })}
`

const PostQuote = styled.div`
    border: 1px solid #e8eaed;
    padding: 15px 15px;
    margin: 20px 0;
    text-align: justify;
`


const QuoteSent = styled.span`
    font-size: 20px;
    ${laptopSmall({ fontSize: "13px" })}
    ${mobileSmall({ fontSize: "13px" })}

    &::before {
        content: "\f10d";
        font-family: fontAwesome;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        border-radius: 50%;
        color: #ee4266;
        font-size: 30px;
        background: #fff;
        border: 2px solid #e8eaed;
        float: left;
        margin-right: 10px;
        ${mobileSmall({ fontSize: "20px", width:"40px", height:"40px", textAlign:"center", lineHeight:"40px" })}
    }
`

function AboutUS() {
    return (
        <Container>
            <ContainerTitle>
                <Title>ABOUT US</Title>
                <SubTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</SubTitle>
            </ContainerTitle>
            <Wrapper>
                <LeftSide>
                    <WrapperTitle>OUR STORY</WrapperTitle>
                    <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat possimus eligendi aliquam vero natus neque, laboriosam, quis qui quasi sint, omnis maiores! Eum eveniet ipsum assumenda eaque explicabo incidunt cum neque at debitis velit atque, adipisci minus ducimus deleniti reiciendis eius inventore, aperiam quisquam! Odit, maiores voluptas quibusdam exercitationem molestiae error vitae nam voluptates fugit, optio iure iste et. Excepturi?</P>
                    <PostQuote>
                        <QuoteSent>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum rerum nulla esse corporis, fuga repellendus sit dicta, debitis harum sapiente fugit autem dolor doloremque? Recusandae animi neque laboriosam iure ad, incidunt, velit unde iusto tempore beatae quas odio sequi corporis.
                        </QuoteSent>
                    </PostQuote>
                </LeftSide>
                <RightSide>
                    <WrapperTitle>OUR VISION</WrapperTitle>
                    <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet amet cumque aliquam accusamus soluta quo et veniam quaerat perspiciatis iusto facere autem quidem dolorum provident harum ex commodi, minima possimus labore alias beatae cupiditate molestias quis! Ut quia molestiae culpa?</P>
                    <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium voluptatibus doloremque sed mollitia, quibusdam odio commodi cumque quos a? Corporis repellendus aperiam, voluptatum deserunt odio, laudantium sit dicta, ratione consequatur error placeat tenetur! Voluptatibus debitis molestias corporis minus quibusdam, vitae mollitia ea reprehenderit aliquid quia deleniti, illum nihil inventore, harum ipsum. Soluta, cum. Blanditiis possimus ut corporis molestiae a?</P>
                </RightSide>
            </Wrapper>
        </Container>
    )
}

export default AboutUS