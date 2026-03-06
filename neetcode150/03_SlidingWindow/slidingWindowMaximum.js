// Leetcode: https://leetcode.com/problems/sliding-window-maximum/description/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const testCases = [
  [[1, 3, -1, -3, 5, 3, 6, 7], 3],
  [[1], 1],
];
var maxSlidingWindow = function (nums, k) {
  // Bruteforce approach
  // Iterate through the array and for each window of size k,
  // find the maximum element in that window and add it to the result array.
  const res = [];
  for (let i = 0; i <= nums.length - k; i++) {
    let max = -Infinity;
    for (let j = i; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    res.push(max);
  }
  return res;
};

testCases.forEach(testCase => console.log(maxSlidingWindow(...testCase)));
// brute force approach will give TLE for large inputs as it has a time complexity of O(n*k)

var maxSlidingWindowV2 = function (nums, k) {
  // use a monotonic deque to store the indices of the elements in the current window
  // Monotonic deque is a deque that maintains the elements in a decreasing order.

  // Approach: In a monotonic deque, the elements are stored in a decreasing order.
  // So, the maximum element in the current window will always be at the front of the deque.
  // We will iterate through the array and for each element,
  // we will remove the elements from the back of the deque
  // until we find an element that is greater than the current element.
  // Then we will add the current element to the back of the deque.
  // If the front of the deque is out of the current window, then we will remove it from the front of the deque.
  // Finally, we will add the front of the deque to the result array.

  // deque stores the indices of the elements in the current window
  const deque = [];
  const res = [];

  let l = 0,
    r = 0;
  while (r < nums.length) {
    // remove the elements from the back of the deque which are lesser than the current element
    while (deque.length && nums[deque[deque.length - 1]] < nums[r]) {
      deque.pop();
    }
    // add the current element index to the back of the deque
    deque.push(r);

    // remove the elements from the front if they are out of the current window
    if (deque[0] < l) {
      deque.shift();
    }

    // if the current window size is k, then add the front of the deque to the result array
    if (r - l + 1 >= k) {
      res.push(nums[deque[0]]);
      l++;
    }
    r++;
  }
  return res;
};

testCases.forEach(testCase => console.log(maxSlidingWindowV2(...testCase)));