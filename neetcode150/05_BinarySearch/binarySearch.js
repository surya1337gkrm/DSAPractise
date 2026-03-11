// Leetcode: https://leetcode.com/problems/binary-search/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // Approach: Straight forward binary search
  // take mid, check if target is equal to mid, if yes return mid
  // if target is less than mid, search in the left half
  // if target is greater than mid, search in the right half
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return -1
};

const testCases = [
  [[-1, 0, 3, 5, 9, 12], 9],
  [[-1, 0, 3, 5, 9, 12], 2],
];
testCases.forEach(testCase => console.log(search(...testCase)));
