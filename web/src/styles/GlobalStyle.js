import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }
  html{
    min-height:100%;
    background: ${props=>props.theme.colorPrimary};
    color:${props=>props.theme.colorBlack};
  }
  hr{
    border-color:#00000099;
    border-bottom:0.5px solid;
    width:100%;
    margin-top:5px;
    margin-bottom:5px;

  }
  *, button, input{
    border:0;
    background:none;
    font-family:'Robotp', ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  ul{
    list-style:none;
    padding-left:0;
  }

`;