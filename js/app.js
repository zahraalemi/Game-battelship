//importing UI
import UI from "./ui.js";

//class of App
class App {
  constructor() {
    this.shipsName;
    this.shiplength;
    this.overlap = false;
    this.locationShips = [];
    this.p1Point = 0;
    this.p2Point = 0;

    // get the ui from the ui.js file
    this.ui = new UI();
  }

  //This function runs when the page loads
  renderToDOM() {
    // eventlistener on the 'start game' button
    this.ui.startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //change css display for hide Start box
      this.ui.startBox.style.display = "none";
      this.ui.gameBoard.style.display = "block";

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

      this.ui.sideBar(
        this.ui.firstPlayerNameInput,
        this.ui.secoundPlayerNameInput
      );
    });

    //event listiner for ships button
    this.ui.shipsBoxBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.classList.contains("ships")) {
        this.ui.popUp.style.display = "block";

        this.shipsName = e.target.innerHTML;
        this.ui.popUpTitle.innerHTML = this.shipsName;
        if (this.ui.playerTurn.innerHTML === this.ui.firstPlayerNameInput) {
          this.fillPopUpFieldsFromArray(this.ui.p1ShipsLocationArray);
        } else {
          this.fillPopUpFieldsFromArray(this.ui.p2ShipsLocationArray);
        }
      }
    });
    //eventlistener for cancel button
    this.ui.cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.popUp.style.display = "none";
      this.ui.columnName.value = "";
      this.ui.rowName.value = "";
      this.ui.directionsName.value = "";
    });
    //eventlistener for done button (add location for every ship)
    this.ui.doneBtn.addEventListener("click", (e) => {
      e.preventDefault();

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
          this.checkOverlapDivs(this.ui.p1ShipsLocationArray);
          if (this.overlap) {
            this.ui.displayError(
              "There is another ship at the selected location or it will collide with another ship"
            );
          } else {
            this.positionOfShips(this.ui.p1ShipsLocationArray);
          }
        } else {
          this.checkOverlapDivs(this.ui.p2ShipsLocationArray);
          if (this.overlap) {
            this.ui.displayError(
              "There is another ship at the selected location or it will collide with another ship"
            );
          } else {
            this.positionOfShips(this.ui.p2ShipsLocationArray);
          }
        }
      }
    });

    this.ui.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();

      //remove css class first player ships
      const fillunit = document.querySelectorAll(".fill");
      fillunit.forEach((ship) => {
        ship.classList = "";
        ship.classList.add("boardDiv");
        ship.classList.add("col");
      });
      //call create board function for first player
      this.ui.nextBtn.style.display = "none";
      this.ui.doneShipsChosenBtn.classList.remove("d-none");
      this.ui.sideBar(
        this.ui.secoundPlayerNameInput,
        this.ui.firstPlayerNameInput
      );
      /* this.ui.createBoard(this.ui.secoundPlayerNameInput); */
    });

    this.ui.doneShipsChosenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.gameBoard.style.display = "none";
      this.ui.startTextBox.classList.remove("d-none");
    });

    this.ui.startChoosing.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.startTextBox.classList.add("d-none");
      this.ui.startingGameBoard.classList.remove("d-none");

      let playerBoard = this.ui.createBoard();
      this.ui.firstPlayerBoard.appendChild(playerBoard);

      let secoundplayerBoard = this.ui.createBoard();
      this.ui.secooundPlayerBoard.appendChild(secoundplayerBoard);

      this.ui.firstPlayerTitle.innerHTML = this.ui.firstPlayerNameInput;
      this.ui.secoundPlayerTitle.innerHTML = this.ui.secoundPlayerNameInput;

      this.ui.secooundPlayerBoard.classList.add("disable-board");
      this.ui.playerTurnGame.innerHTML = this.ui.secoundPlayerNameInput;
    });

    this.ui.firstPlayerBoard.addEventListener("click", (e) => {
      const chosenDiv = e.target;

      this.ui.p1ShipsLocationArray.forEach((item) => {
        if (item.location.includes(chosenDiv.innerHTML)) {
          chosenDiv.classList.add("correct");
          chosenDiv.classList.add("fas");
          chosenDiv.classList.add("fa-ship");
          chosenDiv.innerHTML ='';
          this.p2Point += 50;
        } else {
          chosenDiv.classList.add("incorrect");
          chosenDiv.classList.add("fas");
          chosenDiv.classList.add("fa-times");
          chosenDiv.innerHTML ='';
          this.p2Point -= 10;
        }
      });
      this.ui.secooundPlayerBoard.classList.remove("disable-board");
      this.ui.firstPlayerBoard.classList.add("disable-board");
      this.ui.playerTurnGame.innerHTML = this.ui.firstPlayerNameInput;
      this.ui.player2Point.innerHTML = this.p2Point;
    });
    this.ui.secooundPlayerBoard.addEventListener("click", (e) => {
      const chosenDiv = e.target;

      this.ui.p2ShipsLocationArray.forEach((item) => {
        if (item.location.includes(chosenDiv.innerHTML)) {
          chosenDiv.classList.add("correct");
          chosenDiv.classList.add("fas");
          chosenDiv.classList.add("fa-ship");
          chosenDiv.innerHTML ='';
          this.p1Point += 50;
        } else {
          chosenDiv.classList.add("incorrect");
          chosenDiv.classList.add("fas");
          chosenDiv.classList.add("fa-times");
          chosenDiv.innerHTML ='';
          this.p1Point -= 10;
        }
      });
      this.ui.secooundPlayerBoard.classList.add("disable-board");
      this.ui.firstPlayerBoard.classList.remove("disable-board");
      this.ui.playerTurnGame.innerHTML = this.ui.secoundPlayerNameInput;

      this.ui.player1Point.innerHTML = this.p1Point;
    });
    this.ui.pauseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.pausePage.classList.remove("d-none");
    });
    this.ui.continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.ui.pausePage.classList.add("d-none");
    });

    this.ui.resetGameBtn.addEventListener('click', ()=>{
      location.reload();
    })
  }

  fillPopUpFieldsFromArray(shipsArray) {
    shipsArray.forEach((item) => {
      if (item.name === this.shipsName) {
        this.ui.columnName.value = item.location[0].slice(1, 2);
        this.ui.rowName.value = item.location[0].slice(0, 1);
        this.ui.directionsName.value = item.directions;
      }
    });
  }

  checkOverlapDivs(shipsArray) {
    this.locationShips = [];
    this.calculateShipDiv();


    let arrayForAllLocation = [];
    shipsArray.forEach(item => {
      
      item.location.forEach(locatiion => {
        arrayForAllLocation.push(locatiion)
      });
    });
console.log('newArray')
console.log(arrayForAllLocation)

for(let i=0; i<this.locationShips.length; i++){
  if(arrayForAllLocation.includes(this.locationShips[i])){
    this.overlap = true;
          break;
  }else{
    this.overlap = false;
  }
}


 /*    for (let i = 0; i < shipsArray.length; i++) {
      for (let j = 0; j < this.locationShips.length; j++) {
        console.log(this.locationShips[j]);
        console.log(this.locationShips[j]);
        if (shipsArray[i].location.includes(this.locationShips[j])) {
          this.overlap = true;
          break;
        } else {
          this.overlap = false;
        }
      }  */
      /* shipsArray[i].location.forEach((ship) => {
        if (this.locationShips.includes(ship)) {
          this.overlap = true;
        } else {
          this.overlap = false;
        }
      }); */
    
  }
  positionOfShips(shipsArray) {
    // remove old location when set new location
    shipsArray.forEach((item, index) => {
      if (item.name === this.shipsName) {
        shipsArray.splice(index, 1);
      }
    });

    //Condition for the position of the ship
    if (this.ui.directionsName.value === "Hourizontal") {
      if (parseInt(this.ui.columnName.value) + this.shiplength > 11) {
        this.ui.displayError("Choose a smaller number for the column");
      } else {
        this.importShipLocation(shipsArray);
        //call function from ui
        this.ui.removeShipsInBoard(this.shipsName);
        this.ui.addShipsInBoard(this.shipsName, shipsArray);
      }
    } else {
      for (let i = 0; i < this.ui.columnArray.length; i++) {
        if (this.ui.rowName.value === this.ui.columnArray[i]) {
          if (i + this.shiplength > 10) {
            this.ui.displayError("Choose previous rows");
          } else {
            this.importShipLocation(shipsArray);
            //call function from ui
            this.ui.removeShipsInBoard(this.shipsName);
            this.ui.addShipsInBoard(this.shipsName, shipsArray);
          }
        }
      }
    }
  }
  calculateShipDiv() {
    let a = this.ui.rowName.value;
    let b = this.ui.columnName.value;

    this.locationShips.push(a + b);
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
    this.ui.popUp.style.display = "none";

    // remove field information
    this.ui.columnName.value = "";
    this.ui.rowName.value = "";
    this.ui.directionsName.value = "";
  }
}

const app = new App();
//start the app
app.renderToDOM();
