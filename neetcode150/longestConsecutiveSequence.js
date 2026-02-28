// Leetcode: https://leetcode.com/problems/longest-consecutive-sequence/

/**
 * @param {number[]} nums
 * @return {number}
 */

const testCases = [
  [100, 4, 200, 1, 3, 2],
  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
  [1, 2, 0, 1],
];
var longestConsecutive = function (nums) {
  // Approach: use a set to store all the numbers in the array and then iterate through the set
  // and for each number, check if the number-1 exists in the set,
  // if not, then it means that the number is the start of a sequence
  // then we can keep checking for the next number in the sequence until we find a number that does not exist in the set
  // and keep track of the longest sequence length
  const numSet = new Set(nums);
  let count = 0,
    maxCount = 0;
  for (let num of numSet) {
    if (numSet.has(num - 1)) continue;
    // if num-1 does not exist, then num is the start of a sequence
    count = 1;
    while (numSet.has(num + 1)) {
      count++;
      num++;
    }
    maxCount = Math.max(maxCount, count);
  }
  return maxCount;
};

testCases.forEach(testCase => console.log(longestConsecutive(testCase)));
