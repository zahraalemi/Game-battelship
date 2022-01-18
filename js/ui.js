//create UI class
class UI {
  constructor() {
    //html page
    this.loadingPage = document.querySelector(".loading-box");
    this.startBox = document.querySelector(".start-box");
    this.gameBoard = document.querySelector(".game-board");
    this.startTextBox = document.querySelector(".start-text-box");
    this.startingGameBoard = document.querySelector(".starting-game-board");
    this.pausePage = document.querySelector(".pause-page");

    //
    this.playerBoardDiv = document.querySelector(".player-board");
    this.popUp = document.querySelector(".popup-ship-location");
    this.popupBox = document.querySelector(".popup-box");
    this.playerTurn = document.querySelector(".player-whose-turn");
    this.playerNext = document.querySelector(".alert-warning span");
    this.popUpTitle = document.querySelector(".popup-title span");
    this.firstPlayerBoard = document.querySelector(".first-player-board");
    this.secooundPlayerBoard = document.querySelector(".secound-player-board");
    this.firstPlayerTitle = document.querySelector(".pone-name");
    this.secoundPlayerTitle = document.querySelector(".ptwo-name");
    this.playerTurnGame = document.querySelector(".player-turn");
    this.player2Point = document.querySelector(".player2-point");
    this.player1Point = document.querySelector(".player1-point");
    this.textBox = document.querySelector(".text-box");

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
    this.pauseBtn = document.querySelector(".pause-btn");
    this.continueBtn = document.querySelector(".continue-btn");
    this.resetGameBtn = document.querySelector(".reset-game");

    //Fields
    this.firstPlayerNameInput = document.getElementById("player1Name");
    this.secoundPlayerNameInput = document.getElementById("player2Name");
    this.columnName = document.querySelector(".column-name");
    this.rowName = document.querySelector(".row-name");
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
        const div = document.createElement("button");
        div.id = this.columnArray[i] + j;
        div.classList.add("boardDiv");
        div.classList.add("col");
        div.innerHTML = this.columnArray[i] + j;

        row.appendChild(div);
      }

      playerBoard.appendChild(row);
    }
    return playerBoard;
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

    this.popupBox.insertBefore(div, document.querySelector(".form-box"));

    //remove error after 3secound
    setTimeout(() => {
      document.querySelector(".alert-danger").remove();
    }, 5000);
  }

  //remove old ship in board (when edit ship location)
  removeShipsInBoard(name) {
    const checkoldship = document.querySelectorAll(`.${name}`);
    if (checkoldship.length !== 0) {
      checkoldship.forEach((item) => {
        item.classList.remove(name);
      });
    }
  }

  // add ship in board
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

  // function for add css in correct ship choosen
  correctShip(div) {
    div.classList.add("correct");
    div.classList.add("fas");
    div.classList.add("fa-ship");
    div.innerHTML = "";
    div.disabled = true;
  }

  // function for add css incorrect ship choosen
  inCorrectShip(div) {
    div.classList.add("incorrect");
    div.classList.add("fas");
    div.classList.add("fa-times");
    div.disabled = true;
    div.innerHTML = "";
  }

  showWinner(playerName, p1Point, p2Point) {
    console.log(p1Point , p2Point)
    this.pausePage.classList.remove("d-none");
    this.continueBtn.classList.add("d-none");
    this.startingGameBoard.classList.add('d-none')
    this.textBox.innerText = "";
    let htmlText = `
      <h3 class="text-uppercase">${playerName} win this game</h3>
      <div class="d-flex justify-content-between p-5">
                <div class="text-center text-capitalize">
                  ${this.firstPlayerNameInput}<br/>
                  ${p1Point}  
                </div>
                <div class="text-center text-capitalize">
                  ${this.secoundPlayerNameInput}<br/>
                  ${p2Point}
                </div>
            </div>

    `;

    this.textBox.innerHTML = htmlText;
  }
}

export default UI;
