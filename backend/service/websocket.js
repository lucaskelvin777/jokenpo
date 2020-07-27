let io;
let salas = [
  {
    pessoas: 0,
    escolhaClient1: null,
    escolhaClient2: null,
    client1: null,
    client2: null
  }
];
let { verifyPlayed, getResultString } = require('./rules');
const webSocket = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    socket.on('jogada', ({ escolha }) => {
      salas.forEach(element => {
        if (element.client1 === socket.id) {
          if (element.escolhaClient1 === null) {
            element.escolhaClient1 = escolha;
            if (element.client2 !== null && element.escolhaClient2 === null)
              io.to(element.client2).emit("outro_jogador_jogou", { status: true });
          }
        } else if (element.client2 === socket.id) {
          if (element.escolhaClient2 === null) {
            element.escolhaClient2 = escolha;
            if (element.client1 !== null && element.escolhaClient1 === null)
              io.to(element.client1).emit("outro_jogador_jogou", { status: true });
          }
        }
      });
      verify(socket.id);

    });
    socket.on('disconnect', () => {

      salas.forEach(element => {
        if (element.client1 === socket.id || element.client2 === socket.id) {
          if (element.client1 === socket.id) {
            element.client1 = null;
            io.to(element.client2).emit("procurando_outro_jogador", { status: true });
          }
          if (element.client2 === socket.id) {
            element.client2 = null;
            io.to(element.client1).emit("procurando_outro_jogador", { status: true });
          }
          element.pessoas -= 1;

        }
      });
    })
    socket.on('procurando_sala', () => {
      let searched = false;
      salas.forEach(element => {
        if (element !== null && element.pessoas < 2) {
          if (element.client1 === null) {
            searched = true;
            element.client1 = socket.id;
            element.pessoas += 1;
            if (element.client2 === null) {
              io.to(element.client1).emit("procurando_outro_jogador", { status: true });
            } else {
              io.to(element.client1).emit("fim_procura_outro_jogador", { status: true });
              io.to(element.client2).emit("fim_procura_outro_jogador", { status: true });
            }
          } else if (element.client2 === null) {
            searched = true;
            element.client2 = socket.id;
            element.pessoas += 1;
            if (element.client1 !== null) {
              io.to(element.client2).emit("fim_procura_outro_jogador", { status: true });
              io.to(element.client1).emit("fim_procura_outro_jogador", { status: true });
            } else {
              io.to(element.client2).emit("procurando_outro_jogador", { status: true });
            }
          }
        }
      });
      if (searched) {
        io.to(socket.id).emit("sala_encontrada", { status: true });
      }
      if (!searched) {
        salas.push({
          pessoas: 1, client1: socket.id,
          escolhaClient1: null, escolhaClient2: null
          , client2: null
        })
        io.to(socket.id).emit("sala_encontrada", { status: true });

      }
    });
  });
};

const verify = (id) => {
  let searched = false;
  salas.forEach(element => {
    if (element.client1 === id || element.client2 === id) {
      if (element.escolhaClient1 !== null && element.escolhaClient2 !== null) {
        let result = verifyPlayed(element.escolhaClient1, element.escolhaClient2);
        let resultado = result;
        io.to(element.client1).emit("fim_jogo", {
          escolhaAdversario: element.escolhaClient2,
          resultado, resultadoEscrito: getResultString(resultado, 1)
        });
        io.to(element.client2).emit("fim_jogo",
          {
            escolhaAdversario: element.escolhaClient1,
            resultado, resultadoEscrito: getResultString(resultado, 2)
          });
        searched = true;
      }

    }
  });
  if (searched) {
    let slArr = salas.filter(element => {
      if (element.client1 !== id && element.client2 !== id)
        return element;
    })
    salas = slArr;
  }
}

module.exports = { webSocket }