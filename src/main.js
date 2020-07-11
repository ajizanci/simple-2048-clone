import Grid2048 from './game-class'
import './css/style.css'

const start = document.getElementById("start"),
      restart = document.getElementById("restart");

const game = new Grid2048(4, document.getElementById('container'));

start.addEventListener("click", () => game.start());
restart.addEventListener("click", () => game.restart());

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37: //Left arrow key
      game.move("l");
      break;
    case 38: //Up arrow key
      game.move("u");
      break;
    case 39: //Right arrow key
      game.move("r");
      break;
    case 40: //Down arrow key
      game.move("d");
      break;
  }
});
