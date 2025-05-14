// leetcode: https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
  // Intution: As per the prblm statement, sorted array is rotated by x times
  // Rotation example: [1,2,3,4]
  // Rotation 01: [4,1,2,3]
  // Rotation 02: [3,4,1,2]
  // Rotation 03: [2,3,4,1]

  // Within the sorted & rotated array: there will be one point where ith ele > (i+1)th ele
  // as its a sorted & rotated array: first value should always be greater than the last value

  // initiate a variable count to 0 to track the shift in order of elements
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) {
      count++;
    }
  }

  if (count > 1 || (count === 1 && nums[0] < nums[nums.length - 1]))
    return false;
  else return true;
};
