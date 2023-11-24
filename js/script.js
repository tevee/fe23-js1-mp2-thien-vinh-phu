let playerPoints = 0;
let computerPoints = 0;
let round = 0;
const choices = ["rock", "paper", "scissors"];
const root = document.querySelector("#root");
const playerNameBtn = document.querySelector("#root form button");
const h2InFirstWrapper = document.querySelectorAll("#game > h2");
const choiceText = document.querySelectorAll("#choiceText > h2");
const scoreUpdate = document.querySelectorAll(".gc h3");
const resetGameBtn = document.querySelector("#resetGame");
const displayCompChoice = document.querySelector(".gc-right > div > img");

// Event listener
root.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector("#root > form > input").value;
  const playerName = document.querySelectorAll(".gc-left > h2");
  const welcomeMsg = document.querySelector("#root > h2");
  let computerNum = choices[randomNum()];

  if (playerPoints === 3 || computerPoints === 3) {
    resetGame();
  } else {
    if (playerNameBtn == e.target && nameInput != "") {
      welcomeMsg.innerText = `Welcome ${nameInput} to a game of rock paper scissors! First to 3 points win`;
      playerName[0].innerText = nameInput;
    }

    for (let i = 0; i < choices.length; i++) {
      if (
        choices[i] === e.target.getAttribute("data-object") &&
        nameInput != ""
      ) {
        playRound(e.target.getAttribute("data-object"), computerNum, nameInput);
      }
    }

    if (resetGameBtn === e.target) {
      resetGame();
    }
  }
});

// Return random number  0 -2
function randomNum() {
  let num = Math.floor(Math.random() * 3);
  return num;
}

/*  Om spelaren har samma som datorn visa oavgjort
    Om spelaren > datorn visa spelaren vann
    Annars visa att datorn vann */
function playRound(playerPick, computerPick, playerName) {
  round++;

  if (playerPick === computerPick) {
    h2InFirstWrapper[1].innerText = "Tie";
  } else if (
    (playerPick === "rock" && computerPick === "scissors") ||
    (playerPick === "paper" && computerPick === "rock") ||
    (playerPick === "scissors" && computerPick === "paper")
  ) {
    playerPoints++;
    scoreUpdate[0].innerText = `Score ${playerPoints}`;
    h2InFirstWrapper[1].innerText = `${playerName} won round ${round}`;
  } else {
    computerPoints++;
    scoreUpdate[1].innerText = `Score ${computerPoints}`;
    h2InFirstWrapper[1].innerText = `Computer won round ${round}`;
  }

  displayCompChoice.src = `./img/${computerPick}.png`;
  displayCompChoice.alt = `${computerPick} icon`;

  displayCompChoice.classList.add("rps-img");
  choiceText[0].innerText = `${playerName} chose ${playerPick}`;
  choiceText[1].innerText = `Computer chose ${computerPick}`;
  h2InFirstWrapper[0].innerText = `Round ${round}`;
  h2InFirstWrapper[2].innerText = `${playerPoints} : ${computerPoints}`;
  winnerOfRPS(playerName);
}

function winnerOfRPS(playerName) {
  if (playerPoints === 3) {
    h2InFirstWrapper[3].innerText = `${playerName} won!`;
    resetGameBtn.style.display = "block";
  } else if (computerPoints === 3) {
    h2InFirstWrapper[3].innerText = `Computer won!`;
    resetGameBtn.style.display = "block";
  }
}

// Reset game
function resetGame() {
  playerPoints = 0;
  computerPoints = 0;
  round = 0;

  h2InFirstWrapper[1].innerText = "";
  choiceText[0].innerText = "";
  choiceText[1].innerText = "";
  scoreUpdate[0].innerText = "Score 0";
  scoreUpdate[1].innerText = "Score 0";
  h2InFirstWrapper[0].innerText = "Round 0";
  h2InFirstWrapper[2].innerText = "Scoreline";
  h2InFirstWrapper[3].innerText = "";
  resetGameBtn.style.display = "none";
  displayCompChoice.src = `data:,`;
  displayCompChoice.alt = ``;
  displayCompChoice.classList.remove("rps-img");
}
