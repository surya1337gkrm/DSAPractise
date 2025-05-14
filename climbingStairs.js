// leetcode: https://leetcode.com/problems/climbing-stairs/description/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // we can solve this either using dynamic programming: like start from root node(from outside)
  // and construct a tree with possibility of taking 1 or 2 steps at each decision
  // and for each child repeat the same until the final node(n) is reached
  // this method will end up with O(2^n) as at each level we have 2 decisions and we go till nth level

  // and we are traversing through same possibilities multiple times
  // 2->[3->[4->[5,6(x)],5],4->[5,6(x)]] : 4->[5,6(x)] is explored twice here

  // to avoid, we can memoize the values at each level.

  // Approach 02: Use an array of length n-1
  // as for the final step: there's only one possibility from root
  // and for the penUltimate: there are only 2 ways [ 1 and 2 steps] initiate these values
  // and fill the array values in reverse fibonacci way

  // Time complexity: O(n), space complexity: O(n) for the new array
  if (n < 3) return n;
  const arr = new Array(n);

  arr[n - 1] = 1;
  arr[n - 2] = 2;

  for (let i = n - 2; i >= 0; i--) {
    arr[i] = arr[i + 1] + arr[i + 2];
  }

  return arr[0];

  // Approach 03: Instead of using an array, we can use two variables to hold last 2 values
  // and then update these 2 vlaues until we reach the target node(n)
  // TC: O(n) and SC: O(1)
  let ultimate = 1,
    penUltimate = 2,
    temp;
  if (n < 3) return n;

  for (let i = 0; i < n - 2; i++) {
    // update the penUltimate value with the sum of penUltimate and ultimate values
    // and then update the update the ultimate value with the prev penUltimate value
    temp = penUltimate;
    penUltimate = penUltimate + ultimate;
    ultimate = temp;
  }

  return penUltimate;
};
