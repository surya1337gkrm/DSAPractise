// Leetcode: https://leetcode.com/problems/count-number-of-nice-subarrays/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numberOfSubarrays = function (nums, k) {
  // Approach 01: Bruteforce approach | using subarrays method
  // TC: O(n^2) approx.
  // Might get a TLE Error.

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let oddCount = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % 2 !== 0) oddCount++;
      if (oddCount === k) count++;
    }
  }
  return count;
};
console.log(numberOfSubarrays((nums = [1, 1, 2, 1, 1]), (k = 3)));
console.log(numberOfSubarrays((nums = [2, 4, 6]), (k = 1)));
console.log(
  numberOfSubarrays((nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2]), (k = 2))
);

// Approach 02: Using an approach simillar to the prefixSum with hashmap.
// Intution: We will be storing the oddCount with the count of subarrays until the
// current element as value in the hashmap and We will iterate through the array and check
// if the current num is an odd num and If yes, update the oddCount and continue.
// As we are iterating in a sequence, if there are n subarrays for oddCount-k,
// then there will be n subarrays for oddCount.
// TC: O(n) approx.
var numberOfSubarraysV2 = function (nums, k) {
  let count = 0,
    oddCount = 0;
  const map = new Map();
  map.set(0, 1);
  for (let num of nums) {
    if (num % 2 === 1) oddCount++;
    count += map.get(oddCount - k) || 0;
    map.set(oddCount, (map.get(oddCount) || 0) + 1);
  }
  return count;
};
console.log(numberOfSubarraysV2((nums = [1, 1, 2, 1, 1]), (k = 3)));
console.log(numberOfSubarraysV2((nums = [2, 4, 6]), (k = 1)));
console.log(
  numberOfSubarraysV2((nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2]), (k = 2))
);

// Approach 03: If the numbers were divided by 2, all the numbers will either become 1 or 0(binary)
// and the problem changes to find the number of subarrays with sum k in a binary array(binarySubarraysWithSum.js)
var numberOfSubarraysV3 = function (nums, k) {
  const numOfSubarraysLessThanK = goal => {
    if (goal < 0) return 0;
    let l = 0,
      r = 0,
      sum = 0,
      count = 0;
    while (r < nums.length) {
      sum += nums[r] % 2;
      while (sum > goal) {
        sum -= nums[l] % 2;
        l++;
      }
      count += r - l + 1;
      r++;
    }
    return count;
  };
  return numOfSubarraysLessThanK(k) - numOfSubarraysLessThanK(k - 1);
};
console.log(numberOfSubarraysV3((nums = [1, 1, 2, 1, 1]), (k = 3)));
console.log(numberOfSubarraysV3((nums = [2, 4, 6]), (k = 1)));
console.log(
  numberOfSubarraysV3((nums = [2, 2, 2, 1, 2, 2, 1, 2, 2, 2]), (k = 2))
);