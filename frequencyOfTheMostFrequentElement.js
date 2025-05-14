// leetcode: https://leetcode.com/problems/frequency-of-the-most-frequent-element/description/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  // Approach: Using sort & sliding window
  // sort the array: As we go through a window of elements,
  // if the elements are sorted: as we have limited increments to do (k)
  // incrementing the largest numbers further will do no good to us.

  // sorting and going through a window of elements is better
  nums.sort((a, b) => a - b);

  // two pointers for storing the window start & end postitons
  // maxFreq will be the length of the window &
  // currSum will hold the sum of the current window
  let left = 0,
    right = 0,
    maxFreq = 0,
    currSum = 0;

  while (right < nums.length) {
    currSum += nums[right];
    // to be maximum frequent: in the given window all elements should be same
    // in that case sum of the window shoule be currentElement*(length of the window)
    // if the current sum plus k is less than the currentElement*(length of the window)
    // cannot be maximum frequent: move the window
    while (currSum + k < nums[right] * (right - left + 1)) {
      currSum -= nums[left];
      left++;
    }

    // if not: expand the window
    maxFreq = Math.max(maxFreq, right - left + 1);
    right++;
  }
  return maxFreq;
};
