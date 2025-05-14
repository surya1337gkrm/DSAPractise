// leetcode: https://leetcode.com/problems/rotate-array/description/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  // if array size is 3, and if k value is 4
  // after 3 rotations we will have the same array
  // so instead of rotating 4 times, we can get the same solution
  // by rotating the array by k%nums.length

  k = k % nums.length;

  // example array: [1,2,3,4,5] and k=2
  // [5,1,2,3,4]->[4,5,1,2,3]

  // [4,5,1,2,3] : we can get the same solution by following these steps
  // complete reverse the array -> [5,4,3,2,1]
  // and then reverse 0 to k-1 [4,5] and k to n [1,2,3]
  const reverse = (left, right) => {
    while (left < right) {
      //[nums[left],nums[right]]=[nums[right],nums[left]] // doing this takes time and consumes space
      const temp = nums[left];
      nums[left] = nums[right];
      nums[right] = temp;
      left++;
      right--;
    }
  };

  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
};
