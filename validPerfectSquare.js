// leetcode: https://leetcode.com/problems/valid-perfect-square/

/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  // Approach: Binary search
  // check if mid square is equal to num
  // and follow binary search approach
  if (num < 2) return true;
  let l = 1,
    r = num,
    mid;
  while (l <= r) {
    mid = l + Math.floor((r - l) / 2);
    let square = mid * mid;
    if (square === num) return true;
    else if (square > num) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return false;
};
