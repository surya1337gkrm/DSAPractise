// Lintcode: https://www.lintcode.com/problem/883/description

// Simillar to the Max Consecutive Ones iii problem - here we are only allowed to flip one zero to 1
// but in iii version: we are allowed to flip atmost k zeroes to 1's

/**
 * @param nums: a list of integer
 * @return: return a integer, denote  the maximum number of consecutive 1s
 */
var findMaxConsecutiveOnes = function (nums) {
  // Approach 01: As we are supposed to only flip one zero to 1, initiate the zeroIndex as -1 initially
  // and when the first 0 was found, store the index of first zero in the zeroIndex variable
  // update max length during each iteration  and when next zero is found, move left pointer to the
  // position next to the first occurance of zero and update zeroIndex to current right pointer
  // in that way, we will always consider sub-array with only one zero

  let left = 0,
    right = 0,
    zeroIndex = -1,
    max = 0;
  while (right < nums.length) {
    // when the first zero is found, update the zeroIndex to right pointer
    // which points to the location of first zero
    if (nums[right] === 0 && zeroIndex === -1) {
      zeroIndex = right;
    } else if (nums[right] === 0 && zeroIndex !== -1) {
      // for the next occurances of zero, we need to trim doen the first zero we considered
      // so move left pointer to the index of cirst zero+1 and update zeroIndex to current right
      left = zeroIndex + 1;
      zeroIndex = right;
    }

    // for each iteration check max len of the sub array
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};

console.log(findMaxConsecutiveOnes((nums = [1, 0, 1, 1, 0])));
console.log(findMaxConsecutiveOnes((nums = [1, 0, 1, 0, 1])));

// Approach 02: Using 2 pointers & sliding window but extensive(can be useful fro iii version of this prblm)
var findMaxConsecutiveOnesV2 = function (nums) {
  let left = 0,
    right = 0,
    max = 0,
    zeroCount = 0;

  while (right < nums.length) {
    if (nums[right] === 0) zeroCount++;

    // increment zeroCount and when zeroCount exceeds 1, we need to trim down the first zero and shift
    // left pointer to the position next to the first occurance of zero and update zeroCount
    // we can use the same logic when k zeroes can be flipped(replace 1 with k here in while condition)
    while (zeroCount > 1) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
};
console.log(findMaxConsecutiveOnesV2((nums = [1, 0, 1, 1, 0])));
console.log(findMaxConsecutiveOnesV2((nums = [1, 0, 1, 0, 1])));