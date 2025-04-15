// Leetcode: https://leetcode.com/problems/number-of-islands/description/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  // keep a array with same dimensions as the grid to mark the visited nodes
  // we can use a set, but (1,1) and (1,1) will not be same therefore we need to
  // create a string to add to the set which isnt very ideal.
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );

  let islands = 0;

  const directions = [
    [-1, 0], //top
    [0, 1], //right
    [1, 0], //bottom
    [0, -1], //left
  ];

  const dfs = (r, c) => {
    if (visited[r][c]) return;
    // mark the visited node
    visited[r][c] = true;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        grid[nr][nc] === '1'
      ) {
        dfs(nr, nc);
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j] && grid[i][j] === '1') {
        dfs(i, j);
        islands++;
      }
    }
  }

  return islands;
};
