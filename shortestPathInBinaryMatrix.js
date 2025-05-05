// Leetcode: https://leetcode.com/problems/shortest-path-in-binary-matrix/description/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  // using a seperate matrix to track the visited nodes and update the steps taken to nearest 0.
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;

  let steps = 1;
  // use BFS to traverse through the matrix and start with the (0,0) cell
  const queue = [[0, 0]];
  const directions = [
    [-1, 0], // top
    [0, 1],
    // right
    [1, 0],
    // bottom
    [0, -1],
    // left
    // diagonal cells
    [-1, -1],
    // top right
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  while (queue.length > 0) {
    // visit all nodes in the queue in each iteration as they belong to the same level.
    const level = queue.length;
    for (let i = 0; i < level; i++) {
      const [r, c] = queue.shift();

      // this step is not required: but based on leetcode test-cases
      // we will get a TLE error if we don't add this check.
      // avoid calculating the new destination cells early - this will help us to reduce some running time.
      // skip the out-of-boundary/cells with value 1
      if (r >= rows || c >= cols || grid[r][c] === 1) continue;

      // if the (r,c) is the final cell, return the steps value
      if (r === rows - 1 && c === cols - 1 && grid[r][c] === 0) return steps;
      // mark the cell as visited
      grid[r][c] = 1;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr][nc] === 0
        ) {
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
  }

  return -1; // return if the path isnt possible.
};

// console.log(
//   shortestPathBinaryMatrix(
//     (grid = [
//       [0, 1],
//       [1, 0],
//     ])
//   )
// );

// console.log(
//   shortestPathBinaryMatrix(
//     (grid = [
//       [0, 0, 0],
//       [1, 1, 0],
//       [1, 1, 0],
//     ])
//   )
// );

// console.log(
//   shortestPathBinaryMatrix(
//     (grid = [
//       [1, 0, 0],
//       [1, 1, 0],
//       [1, 1, 0],
//     ])
//   )
// );

// There can two follow-up questions for this problem
// 1. Return the shortest path as an array(if multiple path exists, return the first one)
// 2. Return all possible shortest paths as an array.

const shortestPathBinaryMatrixV2 = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;
  // store the cell x,y values along with the path array which stores the path.
  let queue = [[0, 0, [[0, 0]]]];
  const directions = [
    [-1, 0], // top
    [0, 1],
    // right
    [1, 0],
    // bottom
    [0, -1],
    // left
    // diagonal cells
    [-1, -1],
    // top right
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  while (queue.length > 0) {
    const [r, c, path] = queue.shift();
    if (r >= rows || c >= cols || grid[r][c] === 1) continue;

    // if the (r,c) is the final cell, return the steps value
    if (r === rows - 1 && c === cols - 1 && grid[r][c] === 0) {
      console.log(path);
      return path.length;
    }

    grid[r][c] = 1;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0) {
        // as arrays are passed by reference, pushing new element directly to the list will
        // modify the original path array. Instead, use a copy of the path list and append new cell.
        queue.push([nr, nc, [...path, [nr, nc]]]);
      }
    }
  }

  return -1;
};
// console.log(
//   shortestPathBinaryMatrixV2(
//     (grid = [
//       [0, 1],
//       [1, 0],
//     ])
//   )
// );

// console.log(
//   shortestPathBinaryMatrixV2(
//     (grid = [
//       [0, 0, 0],
//       [1, 1, 0],
//       [1, 1, 0],
//     ])
//   )
// );

// console.log(
//   shortestPathBinaryMatrixV2(
//     (grid = [
//       [1, 0, 0],
//       [1, 1, 0],
//       [1, 1, 0],
//     ])
//   )
// );
// console.log(
//   shortestPathBinaryMatrixV2(
//     (grid = [
//       [0, 0, 0],
//       [0, 1, 0],
//       [0, 0, 0],
//     ])
//   )
// );

// Problem 03: return all possible shortest path(s)
const shortestPathBinaryMatrixV3 = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;
  // store the cell x,y values along with the path array which stores the path.
  let queue = [[0, 0, [[0, 0]]]];
  let minSteps = Infinity;
  const output = [];

  const directions = [
    [-1, 0], // top
    [0, 1],
    // right
    [1, 0],
    // bottom
    [0, -1],
    // left
    // diagonal cells
    [-1, -1],
    // top right
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  while (queue.length > 0) {
    const [r, c, path] = queue.shift();
    if (path.length > minSteps) continue; // skip if the current path is already greater than min steps required
    if (r >= rows || c >= cols || grid[r][c] === 1) continue;

    // if the (r,c) is the final cell, check if the current path length is less than minSteps required
    // if yes, update the minSteps and add the current path to the output
    if (r === rows - 1 && c === cols - 1 && grid[r][c] === 0) {
      if (minSteps >= path.length) {
        if (minSteps > path.length) {
          output.length = 0;
          minSteps = path.length;
        }
        output.push(path);
      }
    }

    grid[r][c] = 1; // mark a cell as visited

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0) {
        // as arrays are passed by reference, pushing new element directly to the list will
        // modify the original path array. Instead, use a copy of the path list and append new cell.
        queue.push([nr, nc, [...path, [nr, nc]]]);
      }
    }
    grid[r][c] = 0; // unmark the start node as we need to check if alternative path(s) exist
  }

  return output.length === 0 ? -1 : output;
};
console.log(
  shortestPathBinaryMatrixV3(
    (grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ])
  )
);
