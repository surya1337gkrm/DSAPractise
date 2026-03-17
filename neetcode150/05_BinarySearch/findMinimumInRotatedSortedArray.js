// L:eetcode: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // Approach: as it is a rotated sorted array, we can use binary search to find the minimum element
  // as numbers are rotated, we need to find which subarray is sorted and which is not sorted
  // we can use binary search to find the minimum element in the sorted subarray
  let l = 0,
    r = nums.length - 1,
    min = Infinity;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (nums[l] <= nums[mid]) {
      // left subarray is sorted, so min element will be the first element of the left subarray
      min = Math.min(min, nums[l]);
      // as we have to check for the min element, we can ignore l to mid
      // there can be a min element in the right half
      l = mid + 1;
    } else {
      // right subarray is sorted
      // so mid is the min element
      min = Math.min(min, nums[mid]);
      // as we have to check for the min element, we can ignore mid to r
      r = mid - 1;
    }
  }
  return min;
};

const testCases = [
  [3, 4, 5, 1, 2],
  [4, 5, 6, 7, 0, 1, 2],
  [11, 13, 15, 17],
];

testCases.forEach(testCase => console.log(findMin(testCase)));
