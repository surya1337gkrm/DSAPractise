// Leetcode: https://leetcode.com/problems/daily-temperatures/description/

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // Bruteforce approach: For each element, iterate through the rest of the array
  // and find the first element that is greater than the current element and calculate the difference in indices
  const res = [];
  for (let i = 0; i < temperatures.length; i++) {
    let days = 0;
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        days = j - i;
        break;
      }
    }
    res.push(days);
  }
  return res;
};

// TC: O(n^2) for large inputs, this will give TLE

var dailyTemperaturesV2 = function (temperatures) {
  // Optimal approach should be O(n)
  // using monotonic stack
  // as we iterate through the array, for each element we need to find the first element
  // that is greater than the current element.

  // use the monotonic stack to store the index of the current element
  // and when we encounter an element that is greater than the current element,
  // pop the top element from the stack and calculate the difference in indices

  const stack = [];
  // as we need to store the days diff for each element in the array
  const res = new Array(temperatures.length).fill(0);
  for (let i = 0; i < temperatures.length; i++) {
    // pop the elements from the stack if the current element is greater than the element at the top of the stack
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      // current element is greater, so we can calculate the no.of.days(diff of indices)
      // as we are comparing the current element with the element at the top of the stack
      // this difference of days should be updated from the prev element(top of stack)
      let index = stack.pop();
      res[index] = i - index;
    }
    // push the current element index to the stack
    stack.push(i);
  }
  return res;
};

const testCases = [
  [73, 74, 75, 71, 69, 72, 76, 73],
  [30, 40, 50, 60, 70, 80, 90],
  [30, 20, 10, 5],
  [30, 60, 90],
];
testCases.forEach(testCase => console.log(dailyTemperaturesV2(testCase)));
