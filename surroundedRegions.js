// Leetcode: https://leetcode.com/problems/surrounded-regions/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  // Approach: if there's a zero cell in the boundary, all other zeroes connected to that cell will form
  // a region which isnt surrounded by X's. So we start with the boundary cells and start dfs from those cells
  // to mark all connected zero cells from that boundary cell.
  const rows = board.length;
  const cols = board[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const dfs = (r, c) => {
    if (visited[r][c]) return;
    visited[r][c] = 1;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] !== 1 &&
        board[nr][nc] == 'O'
      ) {
        dfs(nr, nc);
      }
    }
  };

  // we can iterate through the entire board but checking only boundary rows/cols saves some time
  // boundary rows [ 0th & rows-1 row]
  for (let i = 0; i < cols; i++) {
    if (board[0][i] == 'O') dfs(0, i);
    if (board[rows - 1][i] === 'O') dfs(rows - 1, i);
  }

  // boundary cols [ 0th and cols-1 col]
  for (let i = 0; i < rows; i++) {
    if (board[i][0] === 'O') dfs(i, 0);
    if (board[i][cols - 1] === 'O') dfs(i, cols - 1);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === 0 && board[i][j] === 'O') {
        board[i][j] = 'X';
      }
    }
  }

  console.log(board);
};

const input1 = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
];
solve(input1);

const input2 = [['X']];
solve(input2);
