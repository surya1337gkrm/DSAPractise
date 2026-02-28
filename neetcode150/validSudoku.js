// Leetcode: https://leetcode.com/problems/valid-sudoku/description/

/**
 * @param {character[][]} board
 * @return {boolean}
 */

const testCases = [
  [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ],
  [
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ],
];
var isValidSudoku = function (board) {
  // Approach: iterate through the board and check if the element exists in the row, column and 3*3 box

  // check if the element exists in the row
  const isValidRow = (x, y) => {
    const val = board[x][y];
    for (let i = 0; i < 9; i++) {
      if (val === board[x][i] && i !== y) return false;
    }
    return true;
  };

  // check if the element exists in the column
  const isValidColumn = (x, y) => {
    const val = board[x][y];
    for (let i = 0; i < 9; i++) {
      if (val === board[i][y] && i !== x) return false;
    }
    return true;
  };

  // check if the element exists in the 3*3 box
  const isValidBox = (x, y) => {
    const val = board[x][y];
    const startRow = Math.floor(x / 3) * 3;
    const startCol = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const r = startRow + i;
        const c = startCol + j;
        // if current element is equal to the value and its not the same element, return false
        // not( r===x && c===y) -> (r !== x || c !== y)
        if (val === board[r][c] && (r !== x || c !== y)) return false;
      }
    }
    return true;
  };

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        if (!isValidRow(i, j) || !isValidColumn(i, j) || !isValidBox(i, j))
          return false;
      }
    }
  }
  return true;
};

testCases.forEach(testCase => console.log(isValidSudoku(testCase)));

// we need to iterate through the entire board(i.e 81 cells) and for each cell,
// we are checking the row, column and box which takes O(9) time,
// so overall time complexity is O(81*(9+9+9)) => O(1) as its a constant time.
// Space complexity is O(1) as we are not using any extra space.

// Approach 02: Instead of checking for each cell, we can keep a row/colun/grid
// and for each cell, we can check if the value already exists in the row/column/grid, if it does then its not a valid sudoku.
var isValidSudokuV2 = function (board) {
  // new Array(9).fill(new Set()) | if we use this, all the sets will refer same instance
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const grids = Array.from({ length: 9 }, () => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val === '.') continue;
      const gridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      // check if the value already exists in the row/column/grid, if it does then its not a valid sudoku
      if (rows[i].has(val) || cols[j].has(val) || grids[gridIndex].has(val)) {
        return false;
      }
      rows[i].add(val);
      cols[j].add(val);
      grids[gridIndex].add(val);
    }
  }
  return true;
};

testCases.forEach(testCase => console.log(isValidSudokuV2(testCase)));
