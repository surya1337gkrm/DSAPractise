// leetcode: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // early return: if the nums is empty return 0
  if (nums.length === 0) return 0;

  // initiate a pointer i to 0: this tracks the count of unique numbers
  // iterate through the array [ j=1] and compare ith & jth element
  // if they arent same, increment i [ as stores count of unique nums and
  // will be a pointer to the next unique element]
  // and update the value at the i with the value at j

  // so when duplicate element is found, j will be incremented to the next value
  // and gets updated to the previous element (what i is pointing to)

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
};
