let io;
let salas = [
  {
    pessoas: 0,
    chooseClient1: null,
    chooseClient2: null,
    client1: null,
    client2: null,
    nameClient1: null,
    nameClient2: null
  }
];
let { verifyPlayed, getResultString, getResultWithName } = require('./rules');
const webSocket = (server) => {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {
    socket.on('play', ({ choose }) => {
      salas.forEach(element => {
        if (element.client1 === socket.id) {
          if (element.chooseClient1 === null) {
            element.chooseClient1 = choose;
            if (element.client2 !== null && element.chooseClient2 === null)
              io.to(element.client2).emit("other_player_played", { status: true });
          }
        } else if (element.client2 === socket.id) {
          if (element.chooseClient2 === null) {
            element.chooseClient2 = choose;
            if (element.client1 !== null && element.chooseClient1 === null)
              io.to(element.client1).emit("other_player_played", { status: true });
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
            element.nameClient1 = null;
            element.chooseClient1 = null;
            io.to(element.client2).emit("searching_other_player", { status: true });
          }
          if (element.client2 === socket.id) {
            element.client2 = null;
            element.nameClient2 = null;
            element.chooseClient2 = null;
            io.to(element.client1).emit("searching_other_player", { status: true });
          }
          element.pessoas -= 1;

        }
      });
    })
    socket.on('searching_room', ({ name }) => {
      let searched = false;
      salas.forEach(element => {
        if (element !== null && element.people < 2) {
          if (element.client1 === null) {
            searched = true;
            element.client1 = socket.id;
            element.nameClient1 = name;
            element.people += 1;
            if (element.client2 === null) {
              io.to(element.client1).emit("searching_other_player", { status: true });
            } else {
              io.to(element.client1).emit("end_search_other_player", { status: true });
              io.to(element.client2).emit("end_search_other_player", { status: true });
            }
          } else if (element.client2 === null) {
            searched = true;
            element.client2 = socket.id;
            element.people += 1;
            element.nameClient2 = name;
            if (element.client1 !== null) {
              io.to(element.client2).emit("end_search_other_player", { status: true });
              io.to(element.client1).emit("end_search_other_player", { status: true });
            } else {
              io.to(element.client2).emit("searching_other_player", { status: true });
            }
          }
        }
      });
      if (searched) {
        io.to(socket.id).emit("searched_room", { status: true });
      }
      if (!searched) {
        salas.push({
          people: 1, client1: socket.id,
          chooseClient1: null, chooseClient2: null
          , client2: null, nameClient1: name, nameClient2: null
        })
        io.to(socket.id).emit("searched_room", { status: true });

      }
    });
  });
};

const verify = (id) => {
  let searched = false;
  salas.forEach(element => {
    if (element.client1 === id || element.client2 === id) {
      if (element.chooseClient1 !== null && element.chooseClient2 !== null) {
        let result = verifyPlayed(element.chooseClient1, element.chooseClient2);
        console.log(element);
        io.to(element.client1).emit("end_game", {
          chooseAdversary: element.chooseClient2,
          result, resultWrited: getResultString(result, 1), resultNamed: getResultWithName(result, element.nameClient1, element.nameClient2)
        });
        io.to(element.client2).emit("end_game",
          {
            chooseAdversary: element.chooseClient1,
            result, resultWrited: getResultString(result, 2), resultNamed: getResultWithName(result, element.nameClient1, element.nameClient2)
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