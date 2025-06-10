// Leetcode: https://leetcode.com/problems/find-all-duplicates-in-an-array/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  // Problem Statement: As per the problem statement, there will be n elements and nums array will
  // have n elements from integers in the range of 1 to n. At-most, any integer will repeat twice.

  // Approach: based on the prblm statement-> for each element in the array, use the element as index
  // and mark the index element as negative. If the element is already negative, then it means that the element
  // is already there in the array before. Because the array is 0 based indexed, use element-1 as the index

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // nums[i] could have been changed to negative, so always consider absolute value
    const index = Math.abs(nums[i]) - 1;
    // if the value at the index is already negative, it means its a duplicate element
    // if not, change the value at index to negative.
    if (nums[index] < 0) {
      result.push(index + 1);
    } else {
      nums[index] = -nums[index];
    }
  }
  return result;
};

console.log(findDuplicates((nums = [4, 3, 2, 7, 8, 2, 3, 1])));
console.log(findDuplicates((nums = [1, 1, 2])));
console.log(findDuplicates((nums = [1])));
