//Client file connecting to the server, sending user input and displaying the opponent's output

const root = document.getElementById('root');

const size = 80;

var checkClr = 'white';
var color1 = 'white';
var color2 = 'black';


//FUNCTIONS--------------------------------------------------------------------

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
            newDiv.setAttribute('class', 'checker-div');
            newDiv.setAttribute('style', `
                background-color: ${checkerColor()};
            `)
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



//Actions Panel
function createActionsPanel(){
    const actionsPanel = document.createElement('div');
    actionsPanel.setAttribute('id','actions-panel')
    root.appendChild(actionsPanel);

    const connectionRow = document.createElement('div');
    connectionRow.setAttribute('id', 'connection-row');
    actionsPanel.appendChild(connectionRow);

    const roomInputText = document.createElement('p');
    const roomInputText_text = document.createTextNode('Room:');
    roomInputText.append(roomInputText_text);
    roomInputText.setAttribute('class', 'text');
    connectionRow.appendChild(roomInputText);

    const roomInput = document.createElement('input');
    roomInput.setAttribute('id', 'room-input');
    connectionRow.appendChild(roomInput);

    const roomInputJoinButton = document.createElement('button');
    const roomInputJoinButton_text = document.createTextNode('JOIN');
    roomInputJoinButton.append(roomInputJoinButton_text);
    roomInputJoinButton.setAttribute('class', 'button');
    connectionRow.appendChild(roomInputJoinButton);

}

function createActivityLog(){
    const activityLog = document.createElement('div');
    activityLog.setAttribute('id','activity-log')
    root.appendChild(activityLog);
}


//CODE----------------------------------------------------------

drawBoard();
createActionsPanel();
createActivityLog();





