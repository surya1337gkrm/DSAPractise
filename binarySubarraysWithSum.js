// Leetcode: https://leetcode.com/problems/binary-subarrays-with-sum/description/

/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function (nums, goal) {
  // Approach 01: Bruteforce | tc: O(n^2) approx.
  // use subset approach - start with 2 pointers and consider subsets and sum the elements
  // if sum===goal, increment the count
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === goal) count++;
      else if (sum > goal) break;
    }
  }
  return count;
};
console.log(numSubarraysWithSum((nums = [1, 0, 1, 0, 1]), (goal = 2)));
console.log(numSubarraysWithSum((nums = [0, 0, 0, 0, 0]), (goal = 0)));

// Approach 02: Subarray method takes O(n^2) tc which isnt a good soltuion
// We can use prefixSum approach to solve this O(n) tc
// Intution: As we traverse through the array and calculate the sum with each element added,
// we need to find if there exists a subarray with sum==k.
// if the sum till an element is x and if a slice of this subarray sum =k, then we need to check for subarray with sum= x-k
// if we can find the count of subarrays with x-k sum, then we can conclude there will be same count of subarrays with sum=k
// which is exactly what we require.

// -->sum=x-k<-- ---->sum=k<---
// _____________|______________
// -------->sum=x<-------------

// if there are n occurances of x-k, then there will be n occurances of x

// Approach: iterate through the array and calculate the sum with each element added.
// and use a map to store the preFix sum with the count as the value.
// whenever an element is added to the sum, check if sum-goal exists in the map
// if it exists, then add the count of the sum-goal to the result
// if it doesn't exist, then add the current sum to the map with count 1
// TC: O(n) approx.
var numSubarraysWithSumV2 = function (nums, goal) {
  let prefixSum = 0,
    count = 0;
  const map = new Map();
  map.set(0, 1);
  for (const num of nums) {
    prefixSum += num;

    // check if prefixSum-goal exists, if yes add the value to the count
    count += map.get(prefixSum - goal) || 0;

    // update the prefixSum count
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }

  return count;
};
console.log(numSubarraysWithSumV2((nums = [1, 0, 1, 0, 1]), (goal = 2)));
console.log(numSubarraysWithSumV2((nums = [0, 0, 0, 0, 0]), (goal = 0)));

// Approach 03: As we are using a map in the previous approach, SC will be O(n)
// we can get rid of the map dependency to solve this problem with constant space.
// Intution: in order to get the sub arrays with sum exactly equal to k, we can find the number of subarrays with sum <=k
// and number of subarrays with sum <=k-1 and diff will be subarrays with sum = k.
// TC: O(n) approx. and SC: O(1)

// when we are iterating through the given array using left & right pointers, if the window sum<=k,
// number of subarrays we can form will be equal to the length of the window.
// if the window sum>k, then we need to shrink the window from the left side until the window sum<=k

var numSubarraysWithSumV3 = function (nums, goal) {
  // write a helper function to get the number of subarrays with sum <=k
  const numSubarraysWithSumLessThanK = k => {
    if (k < 0) return 0; // will be useful when we calculate for goal-1
    let left = 0,
      right = 0,
      sum = 0,
      count = 0;
    while (right < nums.length) {
      sum += nums[right];
      while (sum > k) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
      right++;
    }
    return count;
  };
  // now get the number of subarrays with sum <=k and subarrays with sum <=k-1
  return (
    numSubarraysWithSumLessThanK(goal) - numSubarraysWithSumLessThanK(goal - 1)
  );
};
console.log(numSubarraysWithSumV3((nums = [1, 0, 1, 0, 1]), (goal = 2)));
console.log(numSubarraysWithSumV3((nums = [0, 0, 0, 0, 0]), (goal = 0)));
