// leetcode: https://leetcode.com/problems/move-zeroes/description/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // Approach 01: Using count
  // iterate through the array and count the non zero numbers
  // and also update the values
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[count] = nums[i];
      count++;
    }
  }

  while (count < nums.length) {
    // now we know nums.length-1-count zeroes exist in the array
    nums[count] = 0;
    count++;
  }

  // Approach 02: O(n) approach.
  // in the previous approach, we iterate the array once and then
  // iterate again n-count-1 times additionally.

  // iterate through the array and if the current element isnt zero
  // then swap i & j elements and increment i

  let i = 0,
    temp;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== 0) {
      temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      i++;
    }
  }
};
