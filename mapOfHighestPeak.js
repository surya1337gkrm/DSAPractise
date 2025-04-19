// Leetcode: https://leetcode.com/problems/map-of-highest-peak/

/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */

// This question is simillar to the 01Matrix question
// 0 is land cell and 1 is water cell
// we need to update the number of steps required for 0 cell to reach the 1 cell
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const isWater = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 0, 0],
];
var highestPeak = function (isWater) {
  const rows = isWater.length;
  const cols = isWater[0].length;

  // we can directly modify the isWater matrix directly on use this heights matrix
  const heights = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const queue = [];

  // mark the water cells height as 0 and non-water cells as Infinity
  // and push the water cells to the queue
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isWater[i][j] === 1) {
        queue.push([i, j]);
      } else {
        heights[i][j] = Infinity;
      }
    }
  }

  // shift uses O(n) - instead we can use index to get the first element and constantly update the index
  let index = 0;
  while (index < queue.length) {
    const [r, c] = queue[index];
    index++;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        heights[nr][nc] === Infinity
      ) {
        heights[nr][nc] = heights[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return heights;
};

console.log(highestPeak(isWater));
