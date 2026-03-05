// Leetcode: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

/**
 * @param {string} s
 * @return {number}
 */

const testCases = ['abcabcbb', 'bbbbb', 'pwwkew'];
var lengthOfLongestSubstring = function (s) {
  // Approach: use sliding window/2 pointer approach
  // start wth left and right pointers at 0th index
  // and use a map to store the last occurance of each character
  let l = 0,
    r = 0,
    maxLen = 0;
  const map = new Map();

  while (r < s.length) {
    // check if the character is already present in the map
    if (map.has(s[r])) {
      // if the char is present, move the left pointer next to the last occurance of the char
      l = Math.max(l, map.get(s[r]) + 1);
    }
    // update the last occurance of the char in the map
    map.set(s[r], r);
    // update the max length of the substring
    maxLen = Math.max(maxLen, r - l + 1);
    r++;
  }
  return maxLen;
};

testCases.forEach(testCase => console.log(lengthOfLongestSubstring(testCase)));
