// Neetcode: https://neetcode.io/problems/string-encode-and-decode/question
// Leetcode premium

class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    // Approach: Iterate through the array and add the length of the array followed by the delimiter(#)
    // we can directly concat the string but in a loop, we have to create a new string everytime
    // which leads to TC O(n^2), instead push the encoded substrings to an array and join later
    // TC: O(n)

    const encodedStr = [];
    for (let str of strs) {
      encodedStr.push(`${str.length}#${str}`);
    }
    return encodedStr.join('');
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str) {
    // Approach: Iterate through the array and find delimiter(#)
    // anything before # is the length of the string and anything after # is the string
    const strs = [];
    let i = 0;

    while (i < str.length) {
      for (let j = i; j < str.length; j++) {
        if (str[j] === '#') {
          const wordLen = parseInt(str.substring(i, j));
          const word = str.substring(j + 1, j + 1 + wordLen);
          strs.push(word);
          i += (j - i) + 1 + wordLen; // increment i by the length of the word + 1 (delimiter) + word length
          break;
        }
      }
    }
    return strs;
  }
}

// Testing
const obj = new Solution();
const encodedStr = obj.encode(['@#', 'World']);
console.log(encodedStr);
const testArr = obj.decode(encodedStr);
console.log(testArr);
