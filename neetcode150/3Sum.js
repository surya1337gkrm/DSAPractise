// Leetcode: https://leetcode.com/problems/3sum/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const testCases = [
  [-1, 0, 1, 2, -1, -4],
  [0, 1, 1],
  [0, 0, 0],
];
var threeSum = function (nums) {
  // Approach: sort the array and then use two pointers to find the triplets that sum to 0
  nums.sort((a, b) => a - b);

  const res = [];
  // skip last 2 numbers because we need at least 3 numbers to form a triplet
  for (let i = 0; i < nums.length - 2; i++) {
    // skip duplicates
    // Why i & i-1 but not i & i=1?
    // coz (i-1) is the prev number and already checked for possible triplets,
    // checking the same number aagin results in the same triplets, so we skip it
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // two pointer approach to find the triplets that sum to 0
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);
        // now skip duplicates for the left and right pointers
        // start with left pointer, if the next number is the same as the current number, skip it
        while (left < right && nums[left] === nums[left + 1]) left++;
        // for right pointer, if the previous number is the same as the current number, skip it
        while (left < right && nums[right] === nums[right - 1]) right--;
        // move the pointers after skipping duplicates
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
};


testCases.forEach(testCase => console.log(threeSum(testCase)));