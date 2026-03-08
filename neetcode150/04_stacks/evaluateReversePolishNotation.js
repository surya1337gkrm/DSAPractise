// Leetcode: https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

/**
 * @param {string[]} tokens
 * @return {number}
 */
// In the instructions mentioned, that given inputs will not result in a division by zero op.
var evalRPN = function (tokens) {
  // Approach: use a stack to store the numbers and when we encounter an operator,
  // pop last two elements from the stack and perform the operation and push the result to the stack
  const stack = [];
  for (const token of tokens) {
    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const a = stack.pop();
      const b = stack.pop();
      // Why (b,a) instead of (a,b) ?
      // All the didgits will be in reverse order in the stack,
      // so we need to pop the last two elements and perform the operation in the correct order
      // Math.trunc() returns integer part of the div result
      if (token === '+') stack.push(b + a);
      else if (token === '-') stack.push(b - a);
      else if (token === '*') stack.push(b * a);
      else if (token === '/') stack.push(Math.trunc(b / a));
    } else {
      stack.push(parseInt(token));
    }
  }
  // by the end we will have only one element in the stack thats the result of all ops
  return stack.pop();
};

const testCases = [
  ['2', '1', '+', '3', '*'],
  ['4', '13', '5', '/', '+'],
  ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'],
];

testCases.forEach(testCase => console.log(evalRPN(testCase)));
