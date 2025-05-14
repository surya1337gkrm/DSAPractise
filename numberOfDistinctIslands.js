// Leetcode(premium): https://leetcode.com/problems/number-of-distinct-islands/description/
// GFG: https://www.geeksforgeeks.org/problems/number-of-distinct-islands/0
// Lintcode: https://www.lintcode.com/problem/860/description

/**
 * @param grid: a list of lists of integers
 * @return: return an integer, denote the number of distinct islands
 */

// Simillar to counting the numberOfIslands
var numberofDistinctIslands = grid => {
  // Approach: We iterate through the grid and whenever a land cell(1) found, start dfs
  // along with the cell x,y value pass the base row & base col value as well which
  // will be used later to determine the unique islands

  // lets say we have two islands (0,0)->(0,1) and (2,2)->(2,3)
  // if we just store these values in a set(or any other data structure)
  // they will be always unique. now if we have base row & col [ which will be same i,j when we start]
  // we can use (r-baseRow,c-baseCol) to determine the unique islands.
  // now for the previous example: (0,0)->(0,1) and (2,2)->(2,3)
  // (0,0)->(0,1) -> (0,0)->(0,1) - baseRow = 0, baseCol = 0
  // (2,2)->(2,3) -> (2-2,2-2)->(2-2,3-2) -> (0,0)->(0,1) - baseRow = 2, baseCol = 2

  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const set = new Set();

  const dfs = (r, c, baseRow, baseCol, path) => {
    visited[r][c] = 1;
    // now push the explored cells to the path array (r-baseRow,c-baseCol)
    path.push([r - baseRow, c - baseCol]);
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        !visited[nr][nc] &&
        grid[nr][nc] === 1
      ) {
        dfs(nr, nc, baseRow, baseCol, path);
      }
    }
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        // store all explored cells(or path) in an array which will be added to the set later
        const path = [];
        dfs(i, j, i, j, path);
        set.add(path.toString());
      }
    }
  }

  return set.size;
};

const grid1 = [
  [1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0],
  [1, 1, 0, 0, 1],
  [0, 1, 0, 1, 1],
];

const grid2 = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1],
];
console.log(numberofDistinctIslands(grid1));
console.log(numberofDistinctIslands(grid2));
