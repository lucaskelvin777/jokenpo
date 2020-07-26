import styled from 'styled-components';

const Layout = styled.div` 
  height:100vh;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  align-content:center;
`;
const Box = styled.div`
  background-color:#f2f2f2;
  border-radius:4px;
  max-width:900px;
  min-width:300px;
  display:flex;justify-content:center;
  flex-wrap:wrap;
  padding:20px;
  @media(max-width: 400px){
    max-width:300px;
  }
`;
const BoxButton = styled.div`
  display:flex;justify-content:center;
  width:100%;
`;
const TitleBox = styled.div` 
  width:100%;
  text-align:center;

`;
const Button = styled.button`
  background-color:#9b59b6;
  transition: 0.5s;
  color:#fff;
  padding: 4px 20px;
  
  /* font-size:16px; */
  font-weight:bold;
  :hover{
    background-color:#8e44ad;
  }
`;
const ButtonLarge = styled(Button)`
    width:70%;
`;
const ButtonSmall = styled(Button)`
  width:40%;
`;
const ButtonMedium = styled(Button)`
width:50%;
`;
const BoxManyImages = styled.div`
  display:flex;justify-content:center;
  align-items:center; flex-wrap:wrap;
`;
const ImageGameChoose = styled.img`
  height:100px;
  width:100%;
`;
const ImageGameChooseBox = styled.div` 
  height:100px;
  width:100px;
  display:flex;justify-content:center;flex-wrap:wrap;
  @media(max-width:400px){
    margin:20px;
  }
`;
const ImageGame = styled.img`
  height:200px;
  width:200px;
`;
const Input = styled.input `
  border:1px dashed;
  border-color:${props=>props.theme.colorPrimary};
  outline:none;
  padding:10px;
`;
const BoxInput = styled.div ` 
  width:100%;
  display:flex;
  justify-content:start;
  flex-wrap:wrap;
  margin-bottom:12px;
  input{
    width:100%;
  }
  label{ 
    margin-bottom:10px;
  }
`;

export {
  Layout,
  Box,
  ButtonLarge,
  ButtonMedium,
  ButtonSmall,
  BoxButton,
  ImageGameChoose,
  ImageGame,
  ImageGameChooseBox,
  BoxManyImages,
  TitleBox,
  BoxInput,
  Input
}
