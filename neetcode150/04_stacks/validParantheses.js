// Leetcode: https://leetcode.com/problems/valid-parentheses/description/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // Approach: use a map to store the opening & closing brackets
  // and a use a stack to push the associated closing bracket when we encounter an opening bracket
  // when we encounter a closing bracket, we pop the top element from the stack and check if it matches with the current closing bracket
  // if it matches, then we continue, otherwise we return false
  // at the end, if the stack is empty, then we return true, otherwise we return false
  const map = {
    '(': ')',
    '{': '}',
    '[': ']',
  };
  const stack = [];
  for (const ch of s) {
    if (map[ch]) {
      stack.push(map[ch]);
    } else {
      if (stack.pop() !== ch) return false;
    }
  }
  return stack.length === 0;
};


const testCases =[
    '()',
    '()[]{}',
    '(]',
    '([)]',
    '{[]}',
];
testCases.forEach(testCase => console.log(isValid(testCase)));