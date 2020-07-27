function verifyPlayed(playOne, playTwo) {
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
function getResultString(result, client) {
  let string = "";
  switch (result) {
    case 1:
      if(client == 1)
        string = "Você ganhou";
      else if(client == 2)
        string = "Você perdeu";
      break;
    case 2:
      if(client == 1)
        string = "Você perdeu";
      else if(client == 2)
        string = "Você ganhou";
      break;
    case 3:
      string = "Empate";
      break;
      default: 
      string = "Fora de padrão";
      break;
  }
  return string;
}
module.exports = { verifyPlayed, getResultString }