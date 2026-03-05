// Leetcode: https://leetcode.com/problems/trapping-rain-water/description/

/**
 * @param {number[]} height
 * @return {number}
 */

const testCases = [
  [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  [4, 2, 0, 3, 2, 5],
];
var trap = function (height) {
  // Approach: Use two pointers to calculate trapped water
  // storing the water trapped depends on the lower height at each pointer
  // if consecutive indices has the same height, we can skip those indices as they won't contribute to the trapped water
  let l = 0,
    r = height.length - 1,
    water = 0;
  let lhMax = 0,
    rhMax = 0;

  while (l <= r) {
    if (height[l] <= height[r]) {
      // i.e there's exists atleast one line of the left pointer that can trap water
      if (height[l] >= lhMax) {
        lhMax = height[l];
      } else {
        water += lhMax - height[l];
      }
      l++; // move the left pointer to the next index
    } else {
      // i.e there's exists atleast one line of the right pointer that can trap water
      if (height[r] >= rhMax) {
        rhMax = height[r];
      } else {
        water += rhMax - height[r];
      }
      r--; // move the right pointer to the next index
    }
  }
  return water;
};

testCases.forEach(testCase => console.log(trap(testCase)));
