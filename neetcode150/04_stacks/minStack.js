// Leetcode: https://leetcode.com/problems/min-stack/description/

// Requirement: Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// For a regular stack, push/pop/top operations are O(1) but retrieving the minimum element is O(n)
// as we have to iterate through the stack to find the minimum element.

var MinStack = function () {
  // Approach: use two stacks, one for the regular stack and another for the minimum stack
  // regular stack will store all the elements
  // minimum stack will always have the minimum element at the top
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  // push the elements to the min stack only when its empty or when the current element
  // is less than or equal to the element on the top
  if (!this.minStack.length || val <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  // pop element from the regular stack and
  // if the popped element is same as the top element of the min stack, pop it
  if (this.stack.pop() === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  // return the top element of the regular stack
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  // as min stack only stores the minimum element at the top, we can return the top element of the min stack
  return this.minStack[this.minStack.length - 1];
};



// Testing
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin());
minStack.pop();
console.log(minStack.top());
console.log(minStack.getMin());