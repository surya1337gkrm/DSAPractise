// Leetcode: https://leetcode.com/problems/product-of-array-except-self/description/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// [Not suggested] Bruteforce approach: for each element, calculate the product of all the elements except itself
// TC: O(n^2) as we are iterating through the array twice
// SC: O(1) as we are not using any extra space

// Slightly better approach:
// Iterate through the array and calculate the product of all the elements and
// divide the product by the current element to get the product except self
// TC: O(n) as we are iterating through the array once but this will not work if there are zeros in the array
// SC: O(1) as we are not using any extra space

testCases = [
  [1, 2, 3, 4],
  [-1, 1, 0, -3, 3],
];
var productExceptSelf = function (nums) {
  // Approach: use seperate arrays to track prefix product and suffix product
  // prefix product is the product of all the elements to the left of the current element
  // suffix product is the product of all the elements to the right of the current element
  // then multiply the prefix product and suffix product to get the product except self
  // TC: O(n) as we are iterating through the array twice
  // SC: O(n) as we are using two extra arrays to store the prefix and suffix product
  const n = nums.length;
  const prefixProduct = new Array(n).fill(1);
  const suffixProduct = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    prefixProduct[i] = prefixProduct[i - 1] * nums[i - 1];
  }

  // suffix product
  for (let i = n - 2; i >= 0; i--) {
    suffixProduct[i] = suffixProduct[i + 1] * nums[i + 1];
  }

  // product except self
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = prefixProduct[i] * suffixProduct[i];
  }
  return result;
};

testCases.forEach(testCase => console.log(productExceptSelf(testCase)));

const productExceptSelfV2 = function (nums) {
  // Approach 02: Instead of using 2 seperate arrays to store the prefix and suffix product,
  // we can use prefix & suffix variables to hold product until that element and update the result array in the same loop
  // TC: O(n)

  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefixProduct = 1;

  // update the result array with the prefix product until that element
  // and after updating, update the prefix product by multiplying it with the current element
  for (let i = 0; i < n; i++) {
    result[i] = prefixProduct;
    prefixProduct *= nums[i];
  }

  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    // as left product is already updated in the result array,
    // we can just multiply it with the suffix product to get the final product except self
    result[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }
  return result;
};
testCases.forEach(testCase => console.log(productExceptSelfV2(testCase)));
