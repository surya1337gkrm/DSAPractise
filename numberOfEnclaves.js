// Leetcode: https://leetcode.com/problems/number-of-enclaves/

/**
 * @param {number[][]} grid
 * @return {number}
 */

// This is simillar to the surroundedRegions question
// instead of modifying the grid, we have to return the count of unvisited land cells

// in order to reach the boundary land cells, there should be some land cells in the boundary
// reachable from the other land cells. so we start with the boundary land cells and perform dfs
var numEnclaves = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));
  let count = 0;

  const dfs = (r, c) => {
    if (visited[r][c] === 1) return;
    visited[r][c] = 1;
    for (let [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] !== 1 &&
        grid[nr][nc] == 1
      ) {
        dfs(nr, nc);
      }
    }
  };

  // mark the boundary land cells in the visited array
  for (let i = 0; i < cols; i++) {
    if (grid[0][i] === 1) dfs(0, i);
    if (grid[rows - 1][i] === 1) dfs(rows - 1, i);
  }

  for (let i = 0; i < rows; i++) {
    if (grid[i][0] === 1) dfs(i, 0);
    if (grid[i][cols - 1] === 1) dfs(i, cols - 1);
  }

  // count the unvisited land cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (visited[i][j] === 0 && grid[i][j] === 1) {
        count++;
      }
    }
  }

  return count++;
};

const grid1 = [
  [0, 0, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];
const grid2 = [
  [0, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0],
];

console.log(numEnclaves(grid1));
console.log(numEnclaves(grid2));
