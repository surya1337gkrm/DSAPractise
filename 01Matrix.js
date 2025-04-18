// leetcode: https://leetcode.com/problems/01-matrix/description/

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const testInput = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
const testInput2 = [
  [0, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
];
var updateMatrix = function (mat) {
  // using a seperate matrix to track the visited nodes and update the steps taken to nearest 0.
  const rows = mat.length;
  const cols = mat[0].length;

  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const queue = [];

  // push the cells with 0 value to the queue
  // we will use these cells to explore the nearest the 1 cell and update the step count
  // we mark these nodes as visited in the visited matrix
  // and when we start bfs, we check for un-visited cells(with value 0) which will
  // be 1 in this case(as we already marked them in the visited matrix)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
        visited[i][j] = 1;
        //[[cellX,cellY],steps]
        queue.push([[i, j], 0]);
      }
    }
  }

  while (queue.length > 0) {
    const [[r, c], steps] = queue.shift();
    dist[r][c] = steps;
    for (let [dr, dc] of directions) {
      const nr = dr + r;
      const nc = dc + c;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] === 0
      ) {
        visited[nr][nc] = 1;
        queue.push([[nr, nc], steps + 1]);
      }
    }
  }

  return dist;
};

console.log(updateMatrix(testInput));
console.log(updateMatrix(testInput2));

// Option 02: modify the given matrix directly
const updateMatrixV2 = (mat) => {
  const rows = mat.length;
  const cols = mat[0].length;
  const queue = [];

  // mark the non-zero cells with some unique value which we can use later for checks(Using Infinity)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (mat[i][j] === 0) {
        queue.push([[i, j], 0]);
      } else {
        mat[i][j] = Infinity;
      }
    }
  }

  while (queue.length > 0) {
    const [[r, c], steps] = queue.shift();
    // update the matrix (r,c) cell with the min(current val,steps)
    // considering when started - cell either has 0/Infinity
    mat[r][c] = Math.min(mat[r][c], steps);

    for (const [dr, dc] of directions) {
      const nr = dr + r;
      const nc = c + dc;
      // if the next cell/neighbor is Infinity, push the cell to the queue as we need to update the steps to that cell
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        mat[nr][nc] === Infinity
      ) {
        queue.push([[nr, nc], steps + 1]);
      }
    }
  }
  return mat
};
console.log("Modifying the mat: ",updateMatrixV2(testInput));
console.log("Modifying the mat: ",updateMatrixV2(testInput2));