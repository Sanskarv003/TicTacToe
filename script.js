document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Welcome to Tic Tac Toe");
    let music = new Audio("music.mp3");
    let audioTurn = new Audio("ting.mp3");
    let gameover = new Audio("gameover.mp3");
    let turn = "X";
    let isgameover = false;
  
    // Function to change the turn
    const changeTurn = () => {
      return turn === "X" ? "0" : "X";
    };
  
    // Function to check for a win
    const checkWin = () => {
      let boxtext = document.getElementsByClassName('boxtext');
      let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
      ];
      wins.forEach(e => {
        if (
          (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
          (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
          (boxtext[e[0]].innerText !== "")
        ) {
          document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
          isgameover = true;
          music.play();  // Play winning music
          gameover.play();  // Play game over sound
          document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
          const line = document.querySelector(".line");
          if (line) {
            // line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            // line.style.width = "20vw";
          }
        }
      });
  
      // Check for a draw (no empty boxes and no winner)
      if (!isgameover) {
        let draw = true;
        Array.from(boxtext).forEach(element => {
          if (element.innerText === '') {
            draw = false;
          }
        });
        if (draw) {
          document.querySelector('.info').innerText = "It's a Draw!";
          isgameover = true;
          gameover.play();  // Play game over sound for draw
        }
      }
    };
  
    // Game Logic
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
      let boxtext = element.querySelector('.boxtext');
      element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
          boxtext.innerText = turn;
          turn = changeTurn();
          audioTurn.play();
          checkWin();
          if (!isgameover) {
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
          }
        }
      });
    });
  
    // Add onclick listener to reset button
    document.getElementById('reset').addEventListener('click', () => {
      let boxtexts = document.querySelectorAll('.boxtext');
      Array.from(boxtexts).forEach(element => {
        element.innerText = "";
      });
      turn = "X";
      isgameover = false;
      const line = document.querySelector(".line");
      if (line) {
        line.style.width = "0vw";
      }
      document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
      music.pause();  // Stop the winning music
      music.currentTime = 0;  // Reset the music to the beginning
      gameover.pause();  // Stop the game over sound
      gameover.currentTime = 0;  // Reset the game over sound to the beginning
    });
  });
  