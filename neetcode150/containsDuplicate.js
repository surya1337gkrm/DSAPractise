// [ Easy ] Leetcode: https://leetcode.com/problems/contains-duplicate/description/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const testCases = [
  [1, 2, 3, 1],
  [1, 2, 3, 4],
  [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
];

var containsDuplicate = function (nums) {
  // Approach 01: Bruteforce
  // sort the array and check if next element is equal to the previous one.
  return nums.sort((a, b) => a - b).some((el, idx) => el === nums[idx + 1]);
};

var containsDuplicateV2 = function (nums) {
  // Approach 02: Avoid sorting & O(n) approach using a map
  // add the number to map if it doesnt exist, if exists found a duplicate
  const map = new Map();
  for (let num of nums) {
    if (map.has(num)) return true;
    map.set(num, 1);
  }
  return false;
};

// Testing
testCases.forEach(testCase => console.log(containsDuplicateV2(testCase)));
