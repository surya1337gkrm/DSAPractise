// Leetcode: https://leetcode.com/problems/largest-rectangle-in-histogram/description/

/**
 * @param {number[]} heights
 * @return {number}
 */

const testCases = [
  [2, 1, 5, 6, 2, 3],
  [2, 4],
  [1, 1, 1, 1, 1, 1, 1],
];

// TC: O(n^2) for large inputs, this will give TLE
var largestRectangleArea = function (heights) {
  // Bruteforce approach:
  // Iterate through the array and for each element,
  // for every element calculate the area of the rectange formed
  // and keep track of the maximum area(only min height will be considered as only common min height forms rectangle)
  let maxArea = -Infinity;
  for (let i = 0; i < heights.length; i++) {
    let minHeight = Infinity;
    for (let j = i; j < heights.length; j++) {
      minHeight = Math.min(minHeight, heights[j]);
      maxArea = Math.max(maxArea, minHeight * (j - i + 1));
    }
  }
  return maxArea;
};

testCases.forEach(testCase => console.log(largestRectangleArea(testCase)));

var largestRectangleAreaV2 = function (heights) {
  // Optimal approach should be O(n)
  // Approach: using a monotonic stack
  // To maximize the area of the rectangle, we need to priortize max heights
  // So, iterate through the array until the next smaller bar is found.
  // As we reached a smaller bar, previous bar will be higher and thats our right end.
  // for left end, when we reached a smaller bar, previous bar will be popped, now stack will
  // have the next smallest element. So, we can consider next index as left end
  // Why?: Before pushing an element to the stack, we pop all the elements that are higher
  // than the current element. So, only element(s) left in the stack will be lesser than the current element.

  // as we need to maximize the area, we shouldnt consider the previous smallest element so left+1

  const stack = [];
  let maxArea = 0;
  // Why?: we need to consider the last bar as well
  // we need a dummy bar so that if bars are only in decreasing height, we can still pop'em at the end
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
      const idx = stack.pop();
      //Why?: if stack is empty that means for the current element,
      // we dont have the previous smaller element
      // so there's no smaller bar that restricts forming the rectangle. So, l is 0
      const l = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
      const r = i - 1;
      maxArea = Math.max(maxArea, (r - l + 1) * heights[idx]);
    }
    stack.push(i);
  }
  return maxArea;
};

testCases.forEach(testCase => console.log(largestRectangleAreaV2(testCase)));