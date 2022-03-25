//Server file containing all the logic, handling the connection and writing data to the database
//SETUP
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const io = require('socket.io')(3000, {
    cors: {
        origins: ["*"],

        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,POST",
              "Access-Control-Allow-Headers": "my-custom-header",
            });
            res.end();
        }
    }
});


var game = {
    room: "",
    playerWhite: "",
    playerBlack: "",
    start: false,
    turn: "white"
}


//FUNCTIONS-&-CLASSES-----------------------------------------------------------------------------

class Piece {
    constructor(_type, _x, _y) {
        this.type = _type;
        this.x = _x;
        this.y = _y;
    }

    //Define the moves for all types of pieces with a SWITCH statement to allow only the right ones
    
    //EXAMPLE:
    //Move knight
    /*
    if(type === 'knight'){
        //move like a knight;
    }
    */

    //KING

    //QUEEN

    //BISHOP

    //KNIGHT

    //ROOK

    //PAWN



}


//EVENTS------------------------------------------------------------------------------------------

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('custom-test', () => {
        console.log('Custom event received correctly');
    })
});


//CODE--------------------------------------------------------------------------------------------















//TO-DO-LIST------------------------------
/*




*/



