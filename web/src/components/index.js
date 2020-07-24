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
`;
const BoxButton = styled.div`
  display:flex;justify-content:center;
  width:100%;
`;
const Button = styled.button`
  background-color:#3498db;
  transition:all 0.9s;
  color:#fff;
  padding: 4px 20px;
  width:70%;
  /* font-size:16px; */
  font-weight:bold;

  
  :hover{
    background-color:#3498dbcc;
  }
`;
export {
  Layout, Box, Button,BoxButton
}
