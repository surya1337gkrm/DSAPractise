// [ Easy ] Leetcode: https://leetcode.com/problems/valid-anagram/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const testCases = [
  ['anagram', 'nagaram'],
  ['surya', 'asu'],
];
var isAnagram = function (s, t) {
  // if the string's length are diffrent, return early
  if (s.length !== t.length) return false;

  // Approach: if the strings only contain small alphabet, we can an array to count the characters
  // but if the strings contain large alphabet, we can use a map to count the characters
  const charCount = new Array(26).fill(0);
  //iterate through the strings(as they have same length)
  // increment count in the array for a character in s and decrement for character in t
  // by the end of traversal, all elements should be 0 if they are valid anagrams
  for (let i = 0; i < s.length; i++) {
    // get the character code and for the index as 0-25, subtract with 97('a') to get the index in the array
    charCount[s.charCodeAt(i) - 97]++;
    charCount[t.charCodeAt(i) - 97]--;
  }

  // check for all elements in the array to be 0
  return charCount.every(count => count === 0);
};

testCases.forEach(testCase => console.log(isAnagram(...testCase)));
