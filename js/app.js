//importing UI
import UI from "./ui.js";

//class of App
class App {
  constructor() {
    this.shipsName;
    this.shiplength;
    this.isOverlap = false;
    this.locationShips = [];
    this.p1Point = 0;
    this.p2Point = 0;
    this.p1countCorrectShips = 0;
    this.p2countCorrectShips = 0;

    // get the ui from the ui.js file
    this.ui = new UI();
  }

  //This function runs when the page loads
  renderToDOM() {
    // eventlistener on the 'start game' button
    this.ui.startBtn.addEventListener("click", (e) => {
      e.preventDefault();

      //show loading box for 1 secound
      this.ui.loadingPage.classList.remove("d-none");
      setTimeout(() => {
        this.ui.loadingPage.classList.add("d-none");
      }, 1000);

      //change css display for hide Start box
      this.ui.startBox.classList.add("d-none");
      this.ui.gameBoard.classList.remove("d-none");

      // condition for check players name
      this.ui.firstPlayerNameInput.value == ""
        ? (this.ui.firstPlayerNameInput = this.ui.firstPlayerNameInput.placeholder)
        : (this.ui.firstPlayerNameInput = this.ui.firstPlayerNameInput.value);
      this.ui.secoundPlayerNameInput.value == ""
        ? (this.ui.secoundPlayerNameInput = this.ui.secoundPlayerNameInput.placeholder)
        : (this.ui.secoundPlayerNameInput = this.ui.secoundPlayerNameInput.value);

      //call create board function for first player
      let playerBoard = this.ui.createBoard();
      this.ui.playerBoardDiv.appendChild(playerBoard);
      //show name players
      this.ui.sideBar(
        this.ui.firstPlayerNameInput,
        this.ui.secoundPlayerNameInput
      );
    });

    //event listiner for ships button
    this.ui.shipsBoxBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.classList.contains("ships")) {
        //show popup
        this.ui.popUp.classList.remove("d-none");

        this.shipsName = e.target.innerHTML;
        //show ships name in popup title
        this.ui.popUpTitle.innerHTML = this.shipsName;
        //condition for entering ship information in arrays
        if (this.ui.playerTurn.innerHTML === this.ui.firstPlayerNameInput) {
          this.fillPopUpFieldsFromArray(this.ui.p1ShipsLocationArray);
        } else {
          this.fillPopUpFieldsFromArray(this.ui.p2ShipsLocationArray);
        }
      }
    });

    //eventlistener for cancel button and close popup
    this.ui.cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //hide popup
      this.ui.popUp.classList.add("d-none");
      //remove data in dropdowns
      this.ui.columnName.value = "";
      this.ui.rowName.value = "";
      this.ui.directionsName.value = "";
    });

    //eventlistener for done button (add location for every ship)
    this.ui.doneBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //condition for enable button after choose all ships location
      if (this.ui.p1ShipsLocationArray.length == 4) {
        this.ui.nextBtn.disabled = false;
      }
      if (this.ui.p2ShipsLocationArray.length == 4) {
        this.ui.doneShipsChosenBtn.disabled = false;
      }

      // The length of each ship
      switch (this.shipsName) {
        case "carrier":
          this.shiplength = 5;
          break;
        case "battelship":
          this.shiplength = 4;
          break;
        case "destroyer":
          this.shiplength = 3;
          break;
        case "submarine":
          this.shiplength = 3;
          break;
        case "patrol":
          this.shiplength = 2;
          break;
      }

      //check fields for empty
      if (
        this.ui.columnName.value === "" ||
        this.ui.rowName.value === "" ||
        this.ui.directionsName.value === ""
      ) {
        //set error text
        this.ui.displayError("fill all fields");
      } else {
        if (this.ui.playerTurn.innerHTML === this.ui.firstPlayerNameInput) {
          //call function
          this.checkOverlapDivs(this.ui.p1ShipsLocationArray);
          if (this.isOverlap) {
            //call error function
            this.ui.displayError(
              "There is another ship at the selected location or it will collide with another ship"
            );
          } else {
            //call function
            this.positionOfShips(this.ui.p1ShipsLocationArray);
          }
        } else {
          //call function
          this.checkOverlapDivs(this.ui.p2ShipsLocationArray);
          if (this.isOverlap) {
            //call error function
            this.ui.displayError(
              "There is another ship at the selected location or it will collide with another ship"
            );
          } else {
            this.positionOfShips(this.ui.p2ShipsLocationArray);
          }
        }
      }
    });

    //eventlistener for go to Next page and secound player can choose ships location
    this.ui.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();

      //show loading box for 1 secound
      this.ui.loadingPage.classList.remove("d-none");
      setTimeout(() => {
        this.ui.loadingPage.classList.add("d-none");
      }, 1000);

      //remove css class first player ships
      const fillunit = document.querySelectorAll(".fill");
      fillunit.forEach((ship) => {
        ship.classList = "";
        ship.classList.add("boardDiv");
        ship.classList.add("col");
      });
      //call create board function for first player
      this.ui.nextBtn.classList.add("d-none");
      this.ui.doneShipsChosenBtn.classList.remove("d-none");
      this.ui.sideBar(
        this.ui.secoundPlayerNameInput,
        this.ui.firstPlayerNameInput
      );
    });

    //eventlistener for done btn. show information box about game
    this.ui.doneShipsChosenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //show loading box for 1 secound
      this.ui.loadingPage.classList.remove("d-none");
      setTimeout(() => {
        this.ui.loadingPage.classList.add("d-none");
      }, 1000);
      this.ui.gameBoard.classList.add("d-none");

      this.ui.startTextBox.classList.remove("d-none");
    });

    //eventlistener for START game
    this.ui.startChoosing.addEventListener("click", (e) => {
      e.preventDefault();
      //show loading box for 1 secound
      this.ui.loadingPage.classList.remove("d-none");
      setTimeout(() => {
        this.ui.loadingPage.classList.add("d-none");
      }, 1000);
      //hide start page
      this.ui.startTextBox.classList.add("d-none");
      //show gaming boards for play game
      this.ui.startingGameBoard.classList.remove("d-none");
      //call funtion from ui for create board for player1
      let playerBoard = this.ui.createBoard();
      this.ui.firstPlayerBoard.appendChild(playerBoard);

      //call funtion from ui for create board for player2
      let secoundplayerBoard = this.ui.createBoard();
      this.ui.secooundPlayerBoard.appendChild(secoundplayerBoard);

      //Show name players
      this.ui.firstPlayerTitle.innerHTML = this.ui.firstPlayerNameInput;
      this.ui.secoundPlayerTitle.innerHTML = this.ui.secoundPlayerNameInput;
//unclickable board for player2
      this.ui.secooundPlayerBoard.classList.add("disable-board");
      // show whose turn it is
      this.ui.playerTurnGame.innerHTML = this.ui.firstPlayerNameInput;
    });

    //eventlistener for  first player board, choose div and Guess the location of ships
    this.ui.firstPlayerBoard.addEventListener("click", (e) => {
      const chosenDiv = e.target;
      let checkArray = [];
      //push all ships location in one array
      this.ui.p2ShipsLocationArray.forEach((item) => {
        for (let i = 0; i < item.location.length; i++) {
          checkArray.push(item.location[i]);
        }
      });
      //condition for whether the ship is in the selected location
      if (checkArray.includes(chosenDiv.innerHTML)) {
        //call function from ui for correct click
        this.ui.correctShip(chosenDiv);
        //Count the point
        this.p1Point += 50;
        //Count the correct clicks
        this.p1countCorrectShips += 1;
      } else {
        //call function from ui for incorrect click
        this.ui.inCorrectShip(chosenDiv);
        //Count the point
        this.p1Point -= 10;
      }
      //clickable board for player2
      this.ui.secooundPlayerBoard.classList.remove("disable-board"); //clickable board for player1
      //unclickable board for player1
      this.ui.firstPlayerBoard.classList.add("disable-board");
      // show whose turn it is
      this.ui.playerTurnGame.innerHTML = this.ui.secoundPlayerNameInput;
      //show point
      this.ui.player2Point.innerHTML = this.p1Point;
      console.log(this.p1countCorrectShips)
      //condition for show winner
      if (this.p1countCorrectShips == 17) {
        //call function from ui
        this.ui.showWinner(
          this.ui.firstPlayerNameInput,
          this.p1Point,
          this.p2Point
        );
      }
    });

    //eventlistener for  secound player board, choose div and Guess the location of ships
    this.ui.secooundPlayerBoard.addEventListener("click", (e) => {
      const chosenDiv = e.target;
      let checkArray = [];
      //push all ships location in one array
      this.ui.p1ShipsLocationArray.forEach((item) => {
        for (let i = 0; i < item.location.length; i++) {
          checkArray.push(item.location[i]);
        }
      });
      //condition for whether the ship is in the selected location
      if (checkArray.includes(chosenDiv.innerHTML)) {
        //call function from ui for correct click
        this.ui.correctShip(chosenDiv);
        //Count the point
        this.p2Point += 50;
        //Count the correct clicks
        this.p2countCorrectShips += 1;
      } else {
        //call function from ui for incorrect click
        this.ui.inCorrectShip(chosenDiv);
        //Count the point
        this.p2Point -= 10;
      }
      //unclickable board for player2
      this.ui.secooundPlayerBoard.classList.add("disable-board");
      //clickable board for player1
      this.ui.firstPlayerBoard.classList.remove("disable-board");
      // show whose turn it is
      this.ui.playerTurnGame.innerHTML = this.ui.firstPlayerNameInput;
      //show point
      this.ui.player1Point.innerHTML = this.p2Point;

      //condition for show winner
      if (this.p2countCorrectShips == 17) {
        //call function from ui
        this.ui.showWinner(
          this.ui.secoundPlayerNameInput,
          this.p1Point,
          this.p2Point
        );
      }
      
    });

    //eventlistener for pause game
    this.ui.pauseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.pausePage.classList.remove("d-none");
    });

    //eventlistener for countinue game
    this.ui.continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.pausePage.classList.add("d-none");
    });

    //eventlistener for Reset game
    this.ui.resetGameBtn.addEventListener("click", () => {
      location.reload();
    });
  }

  //Function to fill previously filled fields
  fillPopUpFieldsFromArray(shipsArray) {
    shipsArray.forEach((item) => {
      if (item.name === this.shipsName) {
        this.ui.columnName.value = item.location[0].slice(1, 2);
        this.ui.rowName.value = item.location[0].slice(0, 1);
        this.ui.directionsName.value = item.directions;
      }
    });
  }
  //function for check other ships location and Prevent overlapping
  checkOverlapDivs(shipsArray) {
    this.locationShips = [];
    this.calculateShipDiv();
    //add all old locations array in one new array for compare with new ship
    let arrayForAllLocation = [];
    shipsArray.forEach((item) => {
      if (this.shipsName !== item.name) {
        item.location.forEach((location) => {
          arrayForAllLocation.push(location);
        });
      }
    });
    //the loop for check new ship location and old ship location
    for (let i = 0; i < this.locationShips.length; i++) {
      if (arrayForAllLocation.includes(this.locationShips[i])) {
        this.isOverlap = true;
        break;
      } else {
        this.isOverlap = false;
      }
    }
  }

  //function for add
  positionOfShips(shipsArray) {
    // remove old location from array when set new location
    shipsArray.forEach((item, index) => {
      if (item.name === this.shipsName) {
        shipsArray.splice(index, 1);
      }
    });

    //Condition for the position of the ship
    if (this.ui.directionsName.value === "Hourizontal") {
      if (parseInt(this.ui.columnName.value) + this.shiplength > 11) {
        //call error function
        this.ui.displayError("Choose a smaller number for the column");
      } else {
        this.importShipLocation(shipsArray);
        //call function from ui for remove old ships in board
        this.ui.removeShipsInBoard(this.shipsName);
        //call function from ui for add ships in board
        this.ui.addShipsInBoard(this.shipsName, shipsArray);
      }
    } else {
      for (let i = 0; i < this.ui.columnArray.length; i++) {
        if (this.ui.rowName.value === this.ui.columnArray[i]) {
          if (i + this.shiplength > 10) {
            //call error function from ui
            this.ui.displayError("Choose previous rows");
          } else {
            this.importShipLocation(shipsArray);
            //call function from ui for remove old ships in board
            this.ui.removeShipsInBoard(this.shipsName);
            //call function from ui for add ships in board
            this.ui.addShipsInBoard(this.shipsName, shipsArray);
          }
        }
      }
    }
  }

  // function for calculate ships location div id
  calculateShipDiv() {
    let a = this.ui.rowName.value;
    let b = this.ui.columnName.value;

    this.locationShips.push(a + b);
    //condition for horizuntal or vertical ships
    if (this.ui.directionsName.value === "Hourizontal") {
      for (let j = 1; j < this.shiplength; j++) {
        b = parseInt(b) + 1;
        this.locationShips.push(a + b);
      }
    } else {
      for (let j = 0; j < this.ui.columnArray.length; j++) {
        if (a == this.ui.columnArray[j]) {
          for (let a = 1; a < this.shiplength; a++) {
            this.locationShips.push(this.ui.columnArray[j + a] + b);
          }
        }
      }
    }
  }
  //function for push ship information in array
  importShipLocation(shipArray) {
    this.locationShips = [];
    this.calculateShipDiv();

    //add ship location in array
    shipArray.push({
      name: this.shipsName,
      location: this.locationShips,
      directions: this.ui.directionsName.value,
      shiplength: this.shiplength,
    });

    //hide popup(location form)
    this.ui.popUp.classList.add("d-none");

    // remove field information
    this.ui.columnName.value = "";
    this.ui.rowName.value = "";
    this.ui.directionsName.value = "";
  }
}

const app = new App();
//start the app
app.renderToDOM();
