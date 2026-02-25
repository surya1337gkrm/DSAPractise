// Leetcode: https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/description/

/**
 * @param {string} s
 * @return {number}
 */

const testCases = ['abcabc', 'aaacb', 'abc'];
var numberOfSubstrings = function (s) {
  // Approach 01: Bruteforce | TC: O(n^2)
  // use subarrays method to get each subarray and use a map to track the count of each character
  // if map size===3, increment the count
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const map = new Map();
    for (let j = i; j < s.length; j++) {
      map.set(s[j], (map.get(s[j]) || 0) + 1);
      if (map.size === 3) count++;
    }
  }
  return count;
};

// Testing
testCases.forEach(testCase => console.log(numberOfSubstrings(testCase)));

// Approach 02: Slight modification to Approach 01 with the same tc
// Once we get to a point where all 3 characters exists in the substring, all other characters next
// to this point will also be a valid substring. SO instead of traversing through each character,
// we can add the remaining character count to the count of substrings directly.
// example: abcde - by index 2 we have a valid substring and count=1
// instead of traversing further, we can just add 2 to the count as abcd, abcde are valid sub-strings too.
// TC: O(n^2)
var numberOfSubstringsV2 = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const map = new Map();
    for (let j = i; j < s.length; j++) {
      map.set(s[j], (map.get(s[j]) || 0) + 1);
      if (map.size === 3) {
        count += s.length - j;
        break;
      }
    }
  }
  return count;
};
// Testing
testCases.forEach(testCase => console.log(numberOfSubstringsV2(testCase)));

// Approach 03: Use 2 pointer & sliding window approach
// start with left & right pointers pointing to the 0th index and use a map to store the count of characters
// when all 3 characters exists in the map, instead of checking the rest of the string, add the remaining
// length to the count of substrings. And move the left pointer to the next element until the criteria was met.
// TC: O(n) approx.
var numberOfSubstringsV3 = function (s) {
  let count = 0,
    left = 0,
    right = 0;
  const map = new Map();

  while (right < s.length) {
    map.set(s[right], (map.get(s[right]) || 0) + 1);
    while (map.size === 3) {
      count += s.length - right;
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) {
        map.delete(s[left]);
      }
      left++;
    }
    right++;
  }
  return count;
};
// Testing
testCases.forEach(testCase => console.log(numberOfSubstringsV3(testCase)));
