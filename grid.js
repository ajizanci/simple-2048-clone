function createGrid(matrix) {
  const table = document.createElement('table');
  table.setAttribute("id", "grid");

  for (let i = 0, n = matrix.length; i < n; i++) {
    const row = document.createElement('tr');

    for (let j = 0, m = matrix[i].length; j < m; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j] || ""; //Replace 0's with empty string
      cell.setAttribute("id", `cell-${i}${j}`);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  return table;
}

function generateMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push([]);
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

function hasRepeatedElement(row) {
  let test = [row[0], 0, false];
  for (let i = 1; i < row.length; i++) {
    if (row[i] == test[0] && i == (test[1] + 1)) {
      test[2] = true;
      break;
    }
    else {
      test[0] = row[i];
      test[1] = i;
    }
  }
  return test[2];
}

function merge(matrix, direction) {
  if (direction == 'l' || direction == 'r') {
    return matrix.map(collapse(direction));
  }
  direction = (direction == 'u') ? 'l' : 'r';

  matrix = (transpose(matrix)).map(collapse(direction));
  return transpose(matrix);
}

function collapse(direction) {
  return (row) => {
    if (direction == 'r') {
      return (shift([...row].reverse())).reverse();
    }
    return shift(row);
  }
}

function shift(row) {
  let shifted = [],
      index = 0, prev,
      n = row.length;
  while (index < n) {
    if (row[index]) { //If row[index] is not 0
      if (row[index] != prev && row[index] == shifted[shifted.length - 1]) {
        shifted[shifted.length - 1] = 2*row[index];
        prev = shifted[shifted.length - 1];
      } else
        shifted.push(row[index]);
    }
    index++;
  }
  while (shifted.length < n)
    shifted.push(0);

  return shifted;
}

function transpose(matrix) {
  let res = [];
  for (let i = 0, n = matrix[0].length; i < n; i++)
    res.push([]);

  for (let i = 0, n = matrix.length; i < n; i++) {
    for (let j = 0, m = matrix[i].length; j < m; j++) {
      res[j][i] = matrix[i][j];
    }
  }

  return res;
}

function getRandomPowerofTwo() {
  const powers = [2, 4, 8];
  return getRandomElementOfArray(powers);
}

function getRandomElementOfArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getFreeCells(matrix) {
  let freeCells = [];

  for (let i = 0, n = matrix.length; i < n; i++) {
    for (let j = 0, m = matrix[i].length; j < m; j++) {
      if (!matrix[i][j])
        freeCells.push(`${i}${j}`);
    }
  }

  return freeCells;
}
