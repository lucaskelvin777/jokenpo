import React, { useState, useEffect, useMemo } from 'react';

import {
  Box, Layout, ButtonSmall, BoxButton,
  ImageGame, ImageGameChoose, ImageGameChooseBox, BoxManyImages,
  TitleBox
} from './../components';
import { jokenpo, verify } from '../constraints/types';
const App = () => {
  const [myChoose, setMyChoose] = useState(null);
  const [chooseAdversary, setChooseAdversary] = useState(null);
  const [result, setResult] = useState('');
  const [played, setPlayed] = useState(false);
  function randomPlay() {
    let number = Math.random() * 3;
    number = parseInt(number);
    setChooseAdversary(number);
  }
  function setMyPlay(number) {
    setMyChoose(number);
    randomPlay();
    setPlayed(true);
  }
  function clean() {
    setResult('');
    setChooseAdversary(null);
    setMyChoose(null);
    setPlayed(false);
  }

  useEffect(() => {
    if (chooseAdversary !== null && myChoose !== null) {
      let result = verify(myChoose, chooseAdversary);
      if (result === 1) {
        setResult('Jogador 1 ganhou!');
      } else if (result === 2) {
        setResult('Jogador 2 ganhou!');
      } else {
        setResult('Empate');
      }
    }
  }, [chooseAdversary, myChoose]);
  return (
    <>
      <Layout>
        
        <Box>
          <TitleBox>
            <h2>Jokenpo</h2>
          </TitleBox>
          <hr />
          <p>{result}</p>

          {chooseAdversary !== null ?
            <>
              <TitleBox>
                <h3>Escolha adversaria</h3>
              </TitleBox>
              <ImageGame src={process.env.PUBLIC_URL + '/' + jokenpo[chooseAdversary].image} />
              <hr />
            </>
            : ''}



          {myChoose !== null ?
            <>
              <TitleBox>
                <h3>Sua escolha</h3>
              </TitleBox>

              <ImageGame
                src={process.env.PUBLIC_URL + '/' + jokenpo[myChoose].image} />

              <hr />
            </>
            : ''}

          {!played ?
            <BoxManyImages>
              <ImageGameChooseBox>
                <ImageGameChoose
                  onClick={() => { setMyPlay(0) }}
                  src={process.env.PUBLIC_URL + '/pedra.jpg'} />
                <p>Pedra</p>
              </ImageGameChooseBox>
              <ImageGameChooseBox>
                <ImageGameChoose
                  onClick={() => { setMyPlay(1) }}
                  src={process.env.PUBLIC_URL + '/papel.jpg'} />
                <p>Papel</p>
              </ImageGameChooseBox>
              <ImageGameChooseBox>
                <ImageGameChoose
                  onClick={() => { setMyPlay(2) }}
                  src={process.env.PUBLIC_URL + '/tesoura.jpg'} />
                <p>Tesoura</p>
              </ImageGameChooseBox>
            </BoxManyImages>
            :
            <BoxButton>
              <ButtonSmall onClick={clean}>Jogar novamente</ButtonSmall>
            </BoxButton>
          }
        </Box>
      </Layout>
    </>
  );
}

export default App;
