import React, { useState, useEffect, useMemo } from 'react';

import {
  Box, Layout, ButtonSmall, BoxButton,
  ImageGame, ImageGameChoose, ImageGameChooseBox, BoxManyImages,
  TitleBox
} from './../components';

import socketIOClient from "socket.io-client";

import { jokenpo, verify } from '../constraints/types';
const socket = socketIOClient('http://localhost:5000');
const App = () => {
  const [myChoose, setMyChoose] = useState(null);
  const [chooseAdversary, setChooseAdversary] = useState(null);
  const [result, setResult] = useState('');
  const [played, setPlayed] = useState(false);
  const [searchingRoom, setSearchingRoom] = useState(true);
  const [searchingOtherPlayer, setSearchingOtherPlayer] = useState(true);
  const [endGame, setEndGame] = useState(false);
  function setMyPlay(number) {
    if (!played) {
      setMyChoose(number);
      socket.emit('jogada', { escolha: number });
      setPlayed(true);
    }

  }
  function clean(room = true) {
    setResult('');
    setChooseAdversary(null);
    setMyChoose(null);
    setPlayed(false);
    setSearchingOtherPlayer(true);
    if(room)
      setSearchingRoom(true);
    
  }
  function searchRoom() {
    socket.emit('procurando_sala', {});
  }

  useEffect(() => {
    searchRoom();
    socket.on('procurando_outro_jogador', () => {
      clean(false);
    });
    socket.on('fim_procura_outro_jogador', () => {
      setSearchingOtherPlayer(false);
    });
    socket.on('sala_encontrada', () => {
      setSearchingRoom(false);
      
    });
    socket.on('outro_jogador_jogou', () => {

    })
    socket.on('fim_jogo', (data) => {
      console.log(data);
      setPlayed(true);
      setEndGame(true);
      setChooseAdversary(data.escolhaAdversario);
      setResult(data.resultadoEscrito);
    });
  }, []);
  if (searchingRoom || searchingOtherPlayer) {
    return (
      <>
        <Layout>
          <Box>
            {searchingRoom ? <p>Procurando uma sala!</p> : ''}
            {searchingOtherPlayer && !searchingRoom ? <p>Procurando outro jogador!</p> : ''}
          </Box>
        </Layout>
      </>
    )
  }

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
            : (endGame) ?
              <BoxButton>
                <ButtonSmall onClick={()=>{clean(); searchRoom();}}>Jogar novamente</ButtonSmall>
              </BoxButton> :
              <p>Aguarde outro jogador está jogando!</p>

          }
        </Box>
      </Layout>
    </>
  );
}

export default App;
