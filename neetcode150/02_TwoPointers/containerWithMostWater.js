// Leetcode: https://leetcode.com/problems/container-with-most-water/description/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // Approach: Use two pointers and maximize the area by moving the pointers to maximize the height
  // As we start with max width, from there we can only maximize the area by increasing the height,
  // so we move the pointer with the max height
  let maxWater = 0;
  let l = 0,
    r = height.length - 1;
  while (l < r) {
    const w = r - l;
    // water holding capacity will be determined by the shorter line
    // so we take the min of the two heights
    const h = Math.min(height[l], height[r]);
    maxWater = Math.max(maxWater, w * h);
    // in order to maximize the area(water capacity), go to the next line with more height
    if (height[l] < height[r]) l++;
    else r--;
  }
  return maxWater;
};
