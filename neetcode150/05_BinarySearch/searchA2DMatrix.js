// Leetcode: https://leetcode.com/problems/search-a-2d-matrix/description/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  // Approach: Very simillar to regular binary search
  // instead of searching in a sorted array, we are searching in a 2D array
  // as all the rows are sorted, we can use binary search to find the row where the target lies
  // then we can use regular binary search to find the target in that row

  let tRow = 0,
    bRow = matrix.length - 1;
  while (tRow <= bRow) {
    const midRow = tRow + Math.floor((bRow - tRow) / 2);
    if (
      matrix[midRow][0] <= target &&
      target <= matrix[midRow][matrix[midRow].length - 1]
    ) {
      // target lies in this row, so we can use regular binary search to find the target in this row
      let l = 0,
        r = matrix[midRow].length - 1;
      while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (matrix[midRow][mid] === target) return true;
        else if (matrix[midRow][mid] > target) {
          r = mid - 1;
        } else {
          l = mid + 1;
        }
      }
      return false;
    } else if (matrix[midRow][0] > target) {
      bRow = midRow - 1;
    } else {
      tRow = midRow + 1;
    }
  }
  return false;
};

const testCases = [
  [
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3,
  ],
  [
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13,
  ],
];

testCases.forEach(testCase => console.log(searchMatrix(...testCase)));
