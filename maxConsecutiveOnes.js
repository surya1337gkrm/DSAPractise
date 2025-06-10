// Leetcode: https://leetcode.com/problems/max-consecutive-ones/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  // Approach 01: use a count variable to track number of consecutive 1's
  // if 1 is found, increase the count and 0 is found, reset the count to 0
  // and store max count in each iteration in another variable
  let count = 0,
    max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 1) {
      count++;
      max = Math.max(max, count);
    } else {
      count = 0;
    }
  }
  return max;
};
console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]));

// Approach 02: Using 2 pointers approach
var findMaxConsecutiveOnesV2 = function (nums) {
  // Approach: initiate the left and right pointers to 0 index
  // increment r when 1 is found that means we are still in the streak of 1's so update max and increment r
  // and if 0 is found, shift l & r to the right of the 0
  let l = 0,
    r = 0,
    max = 0;
  while (r < nums.length) {
    if (nums[r] === 1) {
      max = Math.max(max, r - l + 1);
      r++;
    } else {
      l = r + 1;
      r++;
    }
  }
  return max;
};
console.log(findMaxConsecutiveOnesV2([1, 1, 0, 1, 1, 1]));
console.log(findMaxConsecutiveOnesV2([1, 0, 1, 1, 0, 1]));
