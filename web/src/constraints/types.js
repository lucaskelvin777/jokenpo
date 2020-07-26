const jokenpo = [];
jokenpo[0] = { displayName: 'Pedra', image: 'pedra.jpg' };
jokenpo[1] = { displayName: 'Papel', image: 'papel.jpg' };
jokenpo[2] = { displayName: 'Tesoura', image: 'tesoura.jpg' };

//is expected number zero, one and two of two parameters
//and return is 1 if  player one wins, and 2 if player two wins and 3 a tie
function verify(playOne, playTwo) {
  if ((playOne === 0 && playTwo === 2) ||
    (playOne === 1 && playTwo === 0) ||
    (playOne === 2 && playTwo === 1)

  ) {
    return 1;
  } else if ((playOne === 0 && playTwo === 0) ||
    (playOne === 1 && playTwo === 1) ||
    (playOne === 2 && playTwo === 2)) {
    return 3;
  } else {
    return 2;
  }
}
export {
  jokenpo,
  verify
};

