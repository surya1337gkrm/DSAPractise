// leetcode: https://leetcode.com/problems/rotting-oranges/description/
/**
 * @param {number[][]} grid
 * @return {number}
 */

// will be used to get the neighbor of a cell
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];

var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  // keep a array with same dimensions as the grid to mark the visited nodes
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  let freshCount = 0;
  let tMin = 0;

  let queue = [];

  // traverse the grid and count the fresh oranges and mark the rotten oranges in the visited array
  // and push the cell position to the queue
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) freshCount++;
      else if (grid[i][j] === 2) {
        visited[i][j] = 2;
        // push the cell position & startTime(o in this case for the first level)
        queue.push([[i, j], 0]);
      }
    }
  }

  // if there arent any fresh oranges ; return 0
  if (freshCount === 0) return 0;

  while (queue.length > 0) {
    const [[r, c], t] = queue.shift();
    if (t > tMin) tMin = t; // use tMin=Math.max(tMin,t)
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] !== 2 &&
        grid[nr][nc] === 1
      ) {
        visited[nr][nc] = 2;
        freshCount--;
        // push the neighbor cell if the conditions met - time will be t+1
        queue.push([[nr, nc], t + 1]);
      }
    }
  }

  return freshCount === 0 ? tMin : -1;
};

console.log('Time: ', orangesRotting(grid));

// we can use the length of the queue(which is equivalenct to the current level) to track the time
var orangesRottingV2 = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  // keep a array with same dimensions as the grid to mark the visited nodes
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  let freshCount = 0;
  let tMin = 0;

  let queue = [];

  // traverse the grid and count the fresh oranges and mark the rotten oranges in the visited array
  // and push the cell position to the queue
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) freshCount++;
      else if (grid[i][j] === 2) {
        visited[i][j] = 2;
        // push the cell position & startTime(o in this case for the first level)
        queue.push([i, j]);
      }
    }
  }

  // if there arent any fresh oranges ; return 0
  if (freshCount === 0) return 0;

  while (queue.length > 0 && freshCount > 0) {
    const currentLevel = queue.length;
    for (let i = 0; i < currentLevel; i++) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          visited[nr][nc] !== 2 &&
          grid[nr][nc] === 1
        ) {
          visited[nr][nc] = 2;
          freshCount--;
          // push the neighbor cell if the conditions met
          queue.push([nr, nc]);
        }
      }
    }
    tMin++;
  }

  return freshCount === 0 ? tMin : -1;
};

console.log('Time | With using level: ', orangesRottingV2(grid));
