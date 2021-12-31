//importing UI
import UI from "./ui.js";

//class of App
class App {
  constructor() {}

  //This function runs when the page loads
  renderToDOM() {
    // get the ui from the ui.js file
    let ui = new UI();

    // eventlistener on the 'start game' button
    ui.startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //change css display for hide Start box
      ui.startBox.style.display = "none";
      ui.gameBoard.style.display = "block";

      // condition for check players name
      ui.firstPlayerName.value == ""
        ? (ui.firstPlayerName = ui.firstPlayerName.placeholder)
        : (ui.firstPlayerName = ui.firstPlayerName.value);
      ui.secoundPlayerName.value == ""
        ? (ui.secoundPlayerName = ui.secoundPlayerName.placeholder)
        : (ui.secoundPlayerName = ui.secoundPlayerName.value);

      //call create board function for first player
      ui.createBoard(ui.firstPlayerName);
      ui.sideBar(ui.firstPlayerName, ui.secoundPlayerName);
    });


    //event listiner for carrier ship button
    ui.carrier.addEventListener("click", (e) => {
      e.preventDefault();
      ui.popUp.style.display = "block";
    });
  }
}

const app = new App();
//start the app
app.renderToDOM();
