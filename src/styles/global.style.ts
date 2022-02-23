import styled, { createGlobalStyle } from "styled-components";
import styles from "./style.config.json";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    padding: 0 ;
    margin: 0 ;

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
    
.logo{
    width:10rem;
    overflow: visible;
}
`;

export const StoryLayout = styled.div`
   display: flex;
   align-items: left;
   flex-direction: column;
`;

export const LandingPage = styled.main`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   height: 75%;

   .login-btn {
      width: 86%;
      height: 65px;
      margin-top: 2rem;
      font-size: 1.8rem;
   }

   @media (min-width: ${styles.breakPoints.m}) {
      height: 100%;
      flex-direction: row;
      .login-btn {
         width: 200px;
         height: 35px;
         margin-top: 2rem;
         font-size: 1.4rem;
         margin: 0;
         margin-left: 0.5rem;
         margin-right: 0.5em;
         margin-top: -2.5rem;
         border-radius: 22px;
         box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
   }
`;

export const TextHolder = styled.div`
   display: flex;
   align-items: center;
   padding: 0;
   margin: 0;

   &.margin-top {
      margin-top: 25px;
      color: ${styles.colors.blue};
   }

   .bold {
      font-weight: bold;
      padding-right: 5px;
   }

   .contact-info {
      font-size: 0.8rem;
      margin: 0;
      margin-top: 4px;
   }

   .landing-text {
      margin-left: 6px;
      font-size: 1.1rem;
      font-style: italic;
   }

   @media (min-width: ${styles.breakPoints.m}) {
      &.margin-top {
         position: absolute;
         bottom: 0;
      }
   }
`;
