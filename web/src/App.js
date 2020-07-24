import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { Box, Layout, Button, BoxButton } from './components';
//  <img src={process.env.PUBLIC_URL + '/yourPathHere.jpg'} /> 
const App = () => {
  function play(){
    let numero = Math.random() * 3;
    numero = parseInt(numero);
    alert(numero.toString());
  }
  return (
    <>
      <Layout>
        <Box>
          
          <h2>Jokenpo</h2>
          <hr />
          <BoxButton>
            <Button
              onClick={play}
            >Jogar</Button>
          </BoxButton>
        </Box>
      </Layout>
      <GlobalStyle />
    </>
  );
}

export default App;
