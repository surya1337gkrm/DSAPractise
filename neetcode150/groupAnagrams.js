// Leetcode: https://leetcode.com/problems/group-anagrams/description/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

const testCases = [['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], [''], ['a']];
var groupAnagrams = function (strs) {
  // Approach 01: use a map to store the sorted string as key and the original string as value
  // TC: O(n*mlogm) where n is the number of strings and m is the length of each string
  const map = new Map();

  for (let str of strs) {
    const sortedStr = str.split('').sort().join('');
    if (map.has(sortedStr)) {
      map.get(sortedStr).push(str);
    } else {
      map.set(sortedStr, [str]);
    }
  }
  return [...map.values()];
};

testCases.forEach(testCase => console.log(groupAnagrams(testCase)));

var groupAnagramsV2 = function (strs) {
  // Approach 02: sorting each string takes additional mlogm tc
  // instead of sorting each string, use an array to count the characters
  // and we can use this array as the key to store the original string
  const map = new Map();
  for (let str of strs) {
    const charCount = new Array(26).fill(0);
    for (const ch of str) {
      charCount[ch.charCodeAt(0) - 97]++;
    }
    const key = charCount.toString(); // or we can join the array but make sure there arent any colliisions
    // i.e, [1,10,1] and [1,1,0,1] will be considered as same key
    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }
  return [...map.values()];
};
testCases.forEach(testCase => console.log(groupAnagramsV2(testCase)));
