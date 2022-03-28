//Client file connecting to the server, sending user input and displaying the opponent's output

import { io } from "socket.io-client";

const socket = io('http://192.168.1.94:3000', {
    transportOptions: {
        polling: {
            extraHeaders: {
            "my-custom-header": "abcd"
            }
        }
    }
});



const root = document.getElementById('root');

const size = 80;

var checkClr = 'white';
var color1 = 'white';
var color2 = 'black';
var room;
var user;


//Create Board Matrix:
var boardMatrix = new Array(8);

for (let i = 0; i < boardMatrix.length; i++) {
    boardMatrix[i] = new Array(8);
}

console.log(boardMatrix);



//FUNCTIONS-&-CLASSES------------------------------------------------------------------


class Piece {
    constructor(_type, _player, _y, _x) {
        this.type = _type;
        this.player = _player
        this.y = _y;
        this.x = _x;
    }

    destinations() {
        let destinationsList = [];  //put objects containing pair of coordinates of the possible destinations
        //then find a way to get that checker and highlight it and make it clickable, and when you click it the piece moves there.
    }
    //KING

    //QUEEN

    //BISHOP

    //KNIGHT

    //ROOK

    //PAWN



}


function initializeBoard() {
    
    //Set pawns
    for(let i = 0; i < 8; i++){
        boardMatrix[1][i] = new Piece('pawn', 'white', 1, i);
        boardMatrix[6][i] = new Piece('pawn', 'black', 6, i);
    }

    //Set Rooks
    boardMatrix[0][0] = new Piece('rook', 'white', 0, 0);
    boardMatrix[0][7] = new Piece('rook', 'white', 0, 7);
    boardMatrix[7][0] = new Piece('rook', 'black', 7, 0);
    boardMatrix[7][7] = new Piece('rook', 'black', 7, 7);

    //Set Knights
    boardMatrix[0][1] = new Piece('knight', 'white', 0, 1);
    boardMatrix[0][6] = new Piece('knight', 'white', 0, 6);
    boardMatrix[7][1] = new Piece('knight', 'black', 7, 1);
    boardMatrix[7][6] = new Piece('knight', 'black', 7, 6);

    //Set Bishops
    boardMatrix[0][2] = new Piece('bishop', 'white', 0, 2);
    boardMatrix[0][5] = new Piece('bishop', 'white', 0, 5);
    boardMatrix[7][2] = new Piece('bishop', 'black', 7, 2);
    boardMatrix[7][5] = new Piece('bishop', 'black', 7, 5);

    //Set Kings
    boardMatrix[0][3] = new Piece('king', 'white', 0, 3);
    boardMatrix[7][3] = new Piece('king', 'black', 7, 3);

    //Set Queens
    boardMatrix[0][4] = new Piece('queen', 'white', 0, 4);
    boardMatrix[7][4] = new Piece('queen', 'black', 7, 4);
    
}

function drawBoard(){
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    root.appendChild(board);

    //Create Board Rows
    for(let i = 0; i < 8; i++) {
        let boardRow = document.createElement('div');
        boardRow.setAttribute('class', 'board-row');
        board.appendChild(boardRow);

        //Create Checkers
        for(let j = 0; j < 8; j++){
            let newDiv = document.createElement('div');
            let divColor = checkerColor();
            newDiv.setAttribute('class', 'checker-div');
            newDiv.setAttribute('data-y', 8-i-1);
            newDiv.setAttribute('data-x', j);
            newDiv.setAttribute('data-selected', false);
            newDiv.setAttribute('data-color', divColor);
            newDiv.setAttribute('style', `
                background-color: ${divColor};
            `)
            newDiv.addEventListener('click', () => {
                //socket.emit();
                console.log(newDiv.dataset);
                selectedPiece(newDiv);
            });
            boardRow.appendChild(newDiv);
        }
        checkerColor();
    }
}

function checkerColor() {
    if(checkClr === color1){
        checkClr = color2;
        return checkClr;
    } else {
        checkClr = color1;
        return checkClr;
    }
}

//Connection Panel
function createConnectionPanel(aP){
    //Row with all the connectivity features
    const connectionRow = document.createElement('div');
    connectionRow.setAttribute('id', 'connection-row');
    aP.appendChild(connectionRow);

    //Div that holds Text and Button
    const holder = document.createElement('div');
    
    //'Room:' Text
    const roomText = document.createElement('p');
    const roomText_text = document.createTextNode('Room:');
    roomText.append(roomText_text);
    holder.appendChild(roomText);
    //Room input text
    const roomInputText = document.createElement('p');
    roomInputText.setAttribute('id', 'room-input-text');
    roomInputText.setAttribute('class', 'hidden');

    //Input Box
    const roomInput = document.createElement('input');
    roomInput.setAttribute('id', 'room-input');

    //Join/Quit Button
    const roomInputButton = document.createElement('button');
    const roomInputButton_text = document.createTextNode('JOIN');
    roomInputButton.append(roomInputButton_text);
    roomInputButton.setAttribute('class', 'button');
    holder.appendChild(roomInputButton);
    connectionRow.appendChild(holder);
    connectionRow.appendChild(roomInput);
    connectionRow.appendChild(roomInputText);

    //Join or Quit Room
    roomInputButton.onclick = () => {

        if(!room){
            if(roomInput.value){
                room = roomInput.value;
                roomInputText.innerText += room;
                roomInputButton.innerText = 'QUIT';
                roomInput.setAttribute('class', 'hidden');
                roomInputText.removeAttribute('class');
            } else {
                alert("Room field can't be empty");
            }
        } else {
            room = "";
            roomInputText.innerText = "";
            roomInputButton.innerText = 'JOIN';
            roomInput.removeAttribute('class');
            roomInputText.setAttribute('class', 'hidden');
            roomInput.value = "";
        }
        
    };
}

//Username Panel
function createUsernamePanel(aP){
    //Row with all the connectivity features
    const usernameRow = document.createElement('div');
    usernameRow.setAttribute('id', 'username-row');
    aP.appendChild(usernameRow);

    //Div that holds Text and Button
    const holder = document.createElement('div');
    
    //'Username:' Text
    const usernameText = document.createElement('p');
    const usernameText_text = document.createTextNode('User:');
    usernameText.append(usernameText_text);
    holder.appendChild(usernameText);
    //Username input text
    const usernameInputText = document.createElement('p');
    usernameInputText.setAttribute('id', 'username-input-text');
    usernameInputText.setAttribute('class', 'hidden');

    //Input Box
    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('id', 'username-input');

    //Join/Quit Button
    const usernameInputButton = document.createElement('button');
    const usernameInputButton_text = document.createTextNode('SET');
    usernameInputButton.append(usernameInputButton_text);
    usernameInputButton.setAttribute('class', 'button');
    holder.appendChild(usernameInputButton);
    usernameRow.appendChild(holder);
    usernameRow.appendChild(usernameInput);
    usernameRow.appendChild(usernameInputText);

    //Set Username
    usernameInputButton.onclick = () => {

        if(!user){
            if(usernameInput.value){
                user = usernameInput.value;
                usernameInputText.innerText = user;
                usernameInputButton.innerText = "UPDATE";
                usernameInput.setAttribute('class', 'hidden');
                usernameInputText.removeAttribute('class');
            } else {
                alert("User field can't be empty");
            }
        } else {
            user = "";
            usernameInputText.innerText = "";
            usernameInputButton.innerText = 'SET';
            usernameInput.removeAttribute('class');
            usernameInputText.setAttribute('class', 'hidden');
            usernameInput.value = "";
        }


    };
}

//Game Panel (Game status, whose turn is it, timer)
function createGamePanel() {

}

//Actions Panel
function createActionsPanel(){
    const actionsPanel = document.createElement('div');
    actionsPanel.setAttribute('id','actions-panel')
    root.appendChild(actionsPanel);

    createUsernamePanel(actionsPanel);
    createConnectionPanel(actionsPanel);
    //createGamePanel(actionsPanel);
    //createGraveyard(actionsPanel);

}

//Activity Log
function createActivityLog(){
    const activityLog = document.createElement('div');
    activityLog.setAttribute('id','activity-log')
    root.appendChild(activityLog);
}

//Draw Pieces' names intead of using images for now
function drawAllPieces() {
    
    for(let j = 0; j < 8; j++) {       //j=y, 
        for(let i = 0; i < 8; i++) {   //i=x.
            if(boardMatrix[j][i]) {
                drawPiece(boardMatrix[j][i].type, boardMatrix[j][i].player, boardMatrix[j][i].y, boardMatrix[j][i].x);
            }
        }
    }
}

//Get a specific Checker based on the coordinates
function getChecker(_y, _x) {
    for(let i = 0; i < allCheckers.length; i++) {
        if(allCheckers[i].dataset.y == _y && allCheckers[i].dataset.x == _x) {
            return allCheckers[i];
        }
    }
}

function selectedPiece(checker) {
    if(checker.dataset.selected != 'true'){
        console.log(checker.dataset.selected);
        checker.dataset.selected = 'true';
        checker.setAttribute('style', 'background-color: red;');
        console.log(checker.dataset.selected);
    } else {
        console.log(checker.dataset.selected);
        checker.dataset.selected = 'false';
        checker.setAttribute('style', `background-color: ${checker.dataset.color};`);
        console.log(checker.dataset.selected);
    }
}

function drawPiece(_type, _player, _y, _x){
    //Get the target checker object
    let targetChecker = getChecker(_y, _x);
    //if(!targetChecker){return;}   //Skip if it's undefined.
    let pieceLetter;
    let piece = document.createElement('div');
    //Set Color
    if(_player == "white"){
        var bgColor = 'white';
        var textColor = 'black';
    } else {
        var bgColor = 'black';
        var textColor = 'white';
    }
    piece.setAttribute('style', `
        width: 40%;
        height: 40%;
        background-color: ${bgColor};
        border: solid ${textColor} 2px;
        text-align: center;
        border-radius: 50%;
        color: ${textColor};
        display: flex;
        align-items: center;
        justify-content: center;
    `)

    //Set Letter to identify the type of piece
    switch (_type) {
        case 'pawn':
            pieceLetter = 'P';
            break;
        case 'king':
            pieceLetter = 'KK';
            break;
        case 'queen':
            pieceLetter = 'Q';
            break;
        case 'bishop':
            pieceLetter = 'B';
            break;
        case 'knight':
            pieceLetter = 'K';
            break;
        case 'rook':
            pieceLetter = 'R';
            break;
        default:
            pieceLetter = 'X';
            console.log('Error in type of piece. Assigned not identified value "X".');
    }
    let textNode = document.createTextNode(pieceLetter);
    let text = document.createElement('p');
    text.setAttribute('class', 'letter-type')

    /*
    //Add click event to the piece
    piece.addEventListener('click', function() {
        console.log(this.parentElement.dataset);
    });
    */

    //Append textNote to text, text to piece and piece to checker
    text.append(textNode);
    piece.append(text);
    targetChecker.append(piece);
}

//EVENTS--------------------------------------------------------





//CODE----------------------------------------------------------

createActionsPanel();
drawBoard();
createActivityLog();

initializeBoard();

const allCheckers = document.getElementsByClassName('checker-div');
//var a = getChecker(7, 7);
//a.setAttribute('style', 'background-color: red;');


//drawPiece('rook', 'white', 3, 3);
drawAllPieces();





//TO-DO-LIST------------------------------
/*

Work on the createGamePanel() function.


*/
