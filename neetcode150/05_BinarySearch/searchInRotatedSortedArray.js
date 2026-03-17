// Leetcode: https://leetcode.com/problems/search-in-rotated-sorted-array/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // Approach: as it is a sorted array, we can use a binary search
  // simillar to Find minimum in a rotated sorted array problem
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[l] <= nums[mid]) {
      // left array is sorted
      // now we need to check if the target lies within the sub-array
      if (nums[l] <= target && target <= nums[mid]) {
        // we can now reduce the search space to left sub-array
        r = mid - 1;
      } else {
        // if not, search space is the right half
        l = mid + 1;
      }
    } else {
      // right array is sorted
      // now we need to check if the target lies within the sub-array
      if (nums[mid] <= target && target <= nums[r]) {
        // we can now reduce the search space to right sub-array
        l = mid + 1;
      } else {
        // if not, search space is the left half
        r = mid - 1;
      }
    }
  }
  return -1;
};

const testCases = [
  [[4, 5, 6, 7, 0, 1, 2], 0],
  [[4, 5, 6, 7, 0, 1, 2], 3],
  [[1], 0],
];

testCases.forEach(testCase => console.log(search(...testCase)));
