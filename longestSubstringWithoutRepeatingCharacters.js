// Leetcode: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // Approach 01: use a result variable to track the substring and Iterate through the string and
  // for each character in the string, check if the character is already present in the result string
  // if it is, then remove the first occurrence of the character from the result string and add the current character to the result string
  // if it is not, then add the current character to the result string
  // and push the result string length to an array in each iteration - and by the end, take maximum out of the array

  // base condition: if the string is empty, return 0
  if (s.length === 0) return 0;

  let res = '';
  const lenArray = [];
  for (const char of s) {
    if (!res.includes(char)) {
      res += char;
      lenArray.push(res.length);
    } else {
      // find the index of first occurance of the character
      res += char; // as we will be slicing the result string until the first occurance of the character
      const idx = res.indexOf(char);
      res = res.slice(idx + 1); // slice the result string from the index of first occurance of the character + 1
      lenArray.push(res.length);
    }
  }

  return Math.max(...lenArray);
};

console.log(lengthOfLongestSubstring((s = 'abcabcbb')));
console.log(lengthOfLongestSubstring((s = 'bbbbb')));
console.log(lengthOfLongestSubstring((s = 'pwwkew')));

// Approach 02: Using hashmap
var lengthOfLongestSubstringV2 = function (s) {
  // Approach: use a hashmap to store the last occurrence of each character in the string
  // Example: {'a':2} -> last occurance of a is at index 2
  // use a 2 pointer approach: left and right pointers will start from the 0th index
  let l = 0,
    r = 0;
  const map = {}; // use a Map instead - faster than object
  let res = 0;
  while (r < s.length) {
    // if the character is already present in the map, update the left pointer to the index of the character + 1
    if (map[s[r]] !== undefined) {
      // when the character is already present in the map, its repeated
      // so we need to move the left pointer to the index of the character + 1
      // first occurance of the character is greater than the left pointer, so we need to shift the left pointer 
      // to the next index of the first occurance of the character
      if (map[s[r]] + 1 > l) l = map[s[r]] + 1;
    }
    // update the last occurrence of the character in the map
    map[s[r]] = r;
    // update the result to the maximum of the current result and the length of the substring
    res = Math.max(res, r - l + 1);
    // move the right pointer to the next character
    r++;
  }
  return res;
};
console.log(lengthOfLongestSubstringV2((s = 'abcabcbb')));
console.log(lengthOfLongestSubstringV2((s = 'bbbbb')));
console.log(lengthOfLongestSubstringV2((s = 'pwwkew')));
