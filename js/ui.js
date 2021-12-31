//create UI class
class UI {
  constructor() {
    this.startBox = document.querySelector(".start-box");
    this.firstPlayerName = document.getElementById("player1Name");
    this.secoundPlayerName = document.getElementById("player2Name");
    this.startBtn = document.getElementById("start-btn");
    this.gameBoard = document.querySelector(".game-board");
    this.playerBoardDiv = document.querySelector(".player-board");
    this.playerShipDiv = document.querySelector(".player-ship");
    this.columnArray = ["A", "B", "C", "D", "E", "F", "G", "H", "D", "I"];
    this.carrier = document.querySelector('.carrier')
    this.popUp = document.querySelector('.popup-ship-location')

  }

  //create Board game
  createBoard(player) {
    const playerBoard = document.createElement("div");
    playerBoard.id = player;
    //loop for create row
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.id = i + 1;
      row.classList.add("row");

      //loop for create div in row
      for (let j = 1; j <= this.columnArray.length; j++) {
        const div = document.createElement("div");
        div.id = this.columnArray[i] + j;
        div.classList.add("boardDiv");
        div.classList.add("col");

        row.appendChild(div);
      }

      playerBoard.appendChild(row);
    }
    this.playerBoardDiv.appendChild(playerBoard);
    
  }
  sideBar(player1, player2) {
    /* let sideBarBox = `
      <div class="col p-4">
        <div class="row">
            <h4>Welcome ${player1} </h4>
            <h5>Please locate your ships by clicking on each ship</h5>
            <p class="alert alert-warning">${player2} should not look at the monitor</p>
        </div>
        <div class="ships d-flex flex-wrap p-3">
            <a href="#" class="carrier ships m-1">CARRIER</a>
            <a href="#" class="battelship ships m-1">Bttelship</a>
            <a href="#" class="destroyer ships m-1">destroyer</a>
            <a href="#" class="submarine ships m-1">submarine</a>
            <a href="#" class="patrol ships m-1">patrol</a>
        </div>
        <div class="row p-3">
            <a href="#" class="next-player btn btn-success">Next Player</a>  
        </div>
      </div>
      `;
    this.playerShipDiv.innerHTML=sideBarBox */
  }

  popupshipslocation(){
      
  }
}

export default UI;
