//create UI class
class UI {
  constructor() {
    //html page 
    this.startBox = document.querySelector(".start-box");
    this.gameBoard = document.querySelector(".game-board");
    this.startTextBox = document.querySelector(".start-text-box");
    this.startingGameBoard = document.querySelector(".starting-game-board");

    this.playerBoardDiv = document.querySelector(".player-board");
    this.popUp = document.querySelector(".popup-ship-location");
    this.playerTurn = document.querySelector(".player-whose-turn");
    this.playerNext = document.querySelector(".alert-warning span");
    this.popUpTitle = document.querySelector(".popup-title span");

    //array
    this.columnArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    this.p1ShipsLocationArray = [];
    this.p2ShipsLocationArray = [];

    //Button
    this.startBtn = document.getElementById("start-btn");
    this.shipsBoxBtn = document.querySelector(".ships-box");
    this.doneBtn = document.querySelector(".done-btn");
    this.cancelBtn = document.querySelector(".cancel-btn");
    this.nextBtn = document.querySelector(".next-player");
    this.doneShipsChosenBtn = document.querySelector(".done-ships-chosen");
    this.startChoosing = document.querySelector(".start-choosing");

    //Fields
    this.firstPlayerNameInput = document.getElementById("player1Name");
    this.secoundPlayerNameInput = document.getElementById("player2Name");
    this.columnName = document.querySelector(".row-name");
    this.rowName = document.querySelector(".column-name");
    this.directionsName = document.querySelector(".directions-name");
  }

  //create Board game
  createBoard() {
    const playerBoard = document.createElement("div");
    //loop for create row
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.id = this.columnArray[i];
      row.classList.add("row");

      //loop for create div in row
      for (let j = 1; j <= this.columnArray.length; j++) {
        const div = document.createElement("div");
        div.id = this.columnArray[i] + j;
        div.classList.add("boardDiv");
        div.classList.add("col");
        div.innerHTML = this.columnArray[i] + j;

        row.appendChild(div);
      }

      playerBoard.appendChild(row);
    }
    this.playerBoardDiv.appendChild(playerBoard);
    /* this.playerTurn.innerText = this.firstPlayerNameInput;
      this.playerNext.innerText = this.secoundPlayerNameInput;
      console.log(this.firstPlayerNameInput) */
  }
  sideBar(player1, player2) {
    this.playerTurn.innerText = player1;
    this.playerNext.innerText = player2;
  }

  //function for show error in choose ship form
  displayError(err) {
    const div = document.createElement("div");
    div.classList = "alert alert-danger";

    div.innerText = err;

    this.popUp.insertBefore(div, document.querySelector(".form-box"));

    //remove error after 3secound
    setTimeout(() => {
      document.querySelector(".alert-danger").remove();
    }, 5000);
  }

  removeShipsInBoard(name) {
    const checkoldship = document.querySelectorAll(`.${name}`);
    if (checkoldship.length !== 0) {
      checkoldship.forEach((item) => {
        item.classList.remove(name);
      });
    }
  }
  addShipsInBoard(name, shipArray) {
    for (let i = 0; i < shipArray.length; i++) {
      if (name == shipArray[i].name) {
        shipArray[i].location.forEach((item) => {
          const ship = document.querySelector(`#${item}`);
          ship.classList.add(name);
          ship.classList.add("fill");
        });
      }
    }
  }
}

export default UI;
