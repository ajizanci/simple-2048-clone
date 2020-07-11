class Grid2048 {
  constructor(size, container) {
    this.matrix = generateMatrix(size);
    this.size = size;
    this.state = container.querySelector('#state');
    this.grid = createGrid(this.matrix);
    container.appendChild(this.grid);
    this.started = false;
  }

  start() {
    if (!this.started) {
      this.state.classList.add("hidden");
      this.state.querySelector("#game-start")
        .classList.add("hidden");
      this.insertPower();
      this.started = true;
    }
  }

  restart() {
    this.matrix = generateMatrix(this.size);
    this.updateView();
    this.state.querySelector("#game-over")
      .classList.add("hidden");
    this.state.classList.add("hidden");
    this.start();
  }

  insertPower() {
    const [row, col] = (getRandomElementOfArray(getFreeCells(this.matrix))).split(""),
      cell = this.grid.querySelector(`#cell-${row}${col}`);

    this.matrix[row][col] = getRandomPowerofTwo();
    cell.textContent = this.matrix[row][col];
    cell.setAttribute("class", `cell-${this.matrix[row][col]}`)
  }

  move(direction) {
    if (this.started) {
      this.matrix = merge(this.matrix, direction);
      this.updateView();
      this.insertPower();
      this.checkGameState();
    }
  }

  updateView() {
    for (let i = 0, n = this.size; i < n; i++) {
      for (let j = 0, m = this.size; j < m; j++) {
        let cell = this.grid.querySelector(`#cell-${i}${j}`);
        if (cell.textContent != this.matrix[i][j])
          cell.textContent = this.matrix[i][j] || ""; //Replace 0's with empty string
        cell.setAttribute("class", `cell-${this.matrix[i][j]}`)
      }
    }
  }

  checkGameState() {
    let is_solved = this.matrix.some(row => row.some(x => x >= 2048));
    if (is_solved) {
      this.endGame(true);
      this.started = false;
    }
    else if (!(this.matrix.some(hasRepeatedElement)
      || transpose(this.matrix).some(hasRepeatedElement))
      && (getFreeCells(this.matrix)).length === 0) {
      this.endGame();
      this.started = false;
    }
  }

  endGame(is_solved) {
    const msg = this.state.querySelector("#game-over p span");
    let status = "lost";
    if (is_solved) {
      status = "won";
    }
    msg.setAttribute("class", status);
    msg.textContent = status;
    this.state.querySelector("#game-over")
      .classList.remove("hidden");
    this.state.classList.remove("hidden");
  }

}
