// Leetcode: https://leetcode.com/problems/max-consecutive-ones-iii/description/

// simmilar to ii version but here we are allowed to modify atmost k zeroes to 1's
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  // Approach 01: Bruteforce approach/subsets approach | TC: O(n^2) approx.

  // Start with 2 points left & right pointing to 0 index and zeroCount variable to keep track of number of zeroes in the sub array selected
  // and check if the current number is 0, if yes, increment zeroCount and check if the zeroCount>k
  // if exceeds, then shift the left pointer to next element and right pointer to current left position
  // this is simillar to generating subsets of an array: we are getting all subsets of an array with zeroes<=k
  // while doing this, by the end of each iteration update the max value with the length of sub-array
  let left = 0,
    right = 0,
    zeroCount = 0,
    max = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      zeroCount++;
      if (zeroCount > k) {
        left++;
        right = left;
        zeroCount = 0;
        continue; // after resetting, skip to the next iteration
      }
    }
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};
console.log(longestOnes((nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]), (k = 2)));
console.log(
  longestOnes(
    (nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1]),
    (k = 3)
  )
);

// Approach 02: using 2 pointer & sliding window approach | TC: O(n) approx.
var longestOnesV2 = function (nums, k) {
  // Approach: Initiate 2 pointers left and right to the 0th index and use zeroCount variable to keep track of
  // number of zeroes in the sub array. When zeroCount exceeds k, shift the left pointer to the position next to the
  // first occurance of zero in the sub array and continue the process.
  let left = 0,
    right = 0,
    max = 0,
    zeroCount = 0;
  // count the zeroes in the first sub-array
  while (right < nums.length) {
    if (nums[right] === 0) zeroCount++;

    // if zeroCount exceeds k(permitted size),
    // shift the left pointer to the position next to the first occurance of zero in the sub array
    while (zeroCount > k) {
      if (nums[left] === 0) zeroCount--;
      left++;
    }

    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};
console.log(longestOnesV2((nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]), (k = 2)));
console.log(
  longestOnesV2(
    (nums = [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1]),
    (k = 3)
  )
);
