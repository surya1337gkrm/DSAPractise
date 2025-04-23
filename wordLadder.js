// Leetcode: https://leetcode.com/problems/word-ladder/description/

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  // Approach 01: Use BFS
  // For each letter in the beginWord, replace it with a-z(one at a time)
  // and check if the new word exists in the give wordlist. if it does, add it to the queue.
  // if the new word is the endWord, return the steps required.

  // it will be less time consuming if we use a set to check if the word exists(or not)
  // than iterating through the wordList every time we replace a letter in the beginWord.

  const wordSet = new Set(wordList);
  // we can return 0 if the endWord doesnt exists in the given wordList - in that case
  // we cannot reach the endWord anyway/
  if (!wordSet.has(endWord)) return 0;

  //start bfs with the beginWord,1 as the startNode
  const queue = [[beginWord, 1]];
  let index = 0;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  while (index < queue.length) {
    const [current, steps] = queue[index];
    // check if the current word from the queue is the endWord which was pushed to the queue in the previous level
    if (current === endWord) return steps;
    index++;
    for (let i = 0; i < current.length; i++) {
      for (const char of alphabet) {
        // skip if the char we want to replace with is same as the current character in the current word.
        if (char === current[i]) continue;
        // replace the current character with the char we want to replace with
        const newWord =
          current.substring(0, i) + char + current.substring(i + 1);

        // now check if this new word exists in the wordSet, if it does this can be the next step in building our required endWord
        if (wordSet.has(newWord)) {
          queue.push([newWord, steps + 1]);
          //console.group(queue)
          // mark the new word as visited ( delete the word from the set to
          // avoid visiting the same word again when checked if it existed in the set)
          wordSet.delete(newWord);
        }
      }
    }
  }
  return 0;
};

console.log(
  ladderLength(
    (beginWord = 'hit'),
    (endWord = 'cog'),
    (wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
  )
);
console.log(
  ladderLength(
    (beginWord = 'hit'),
    (endWord = 'cog'),
    (wordList = ['hot', 'dot', 'dog', 'lot', 'log'])
  )
);
