import React, { useState, useEffect, useMemo } from 'react';

import {
  Box, Layout, ButtonSmall, BoxButton,
  ImageGame, ImageGameChoose, ImageGameChooseBox, BoxManyImages,
  TitleBox
} from './../components';

import socketIOClient from "socket.io-client";

import { jokenpo, verify } from '../constraints/types';
const socket = socketIOClient('http://localhost:5050');
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
      socket.emit('play', { choose: number });
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
    let name = localStorage.getItem('name');
    socket.emit('searching_room', {name});
  }

  useEffect(() => {
    searchRoom();
    socket.on('searching_other_player', () => {
      clean(false);
    });
    socket.on('end_search_other_player', () => {
      setSearchingOtherPlayer(false);
    });
    socket.on('searched_room', () => {
      setSearchingRoom(false);
      
    });
    socket.on('other_player_played', () => {

    })
    socket.on('end_game', (data) => {
      console.log(data);
       setPlayed(true);
       setEndGame(true);
      setChooseAdversary(data.chooseAdversary);
      setResult(data.resultNamed);
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
