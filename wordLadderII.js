// Leetcode: https://leetcode.com/problems/word-ladder-ii/

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */

// This approach works with small to moderate input
// but fails with Time Limit Exceeded error(TLE) on Leetcode.
var findLadders_withTLE = function (beginWord, endWord, wordList) {
  // Approach 01: We use BFS. But instead of pushing the newWord with the steps/level, we push the sequence/path
  // and dont delete the newWord from the set immediately. Wait till all children nodes of the level are explored & delete.
  const output = [];
  const queue = [[beginWord]];

  // convert the list to set better checking if the word exists or not
  const wordSet = new Set(wordList);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  // now we need to store the words we explored in each level
  const visitedOnLevel = new Set();
  // we strt by adding the beginWord to the set
  visitedOnLevel.add(beginWord);

  // early return check: if the endword doesnt exist in the wordSet return as theres no way to reach to that endWord
  if (!wordSet.has(endWord)) return output;

  let minPath = Infinity;

  while (queue.length > 0) {
    const level = queue.length; // we will use this to visit all child nodes in each level
    // as we want to push new word to the nested list - every time we pop the first element which is a list
    // last item from that popped list will be the new word we generated in the previous level.
    for (let i = 0; i < level; i++) {
      // we will pop the first element in the queue until all children nodes of that level are popped from the queue
      const current = queue.shift();
      const word = current[current.length - 1];

      // check if the current word is the endWord, if yes, we need to add the current path to the output
      // we need to check for >= as we need to push path's will smallest length and if there are mutliple paths
      // we have to push all possible path(s).
      if (word === endWord) {
        if (minPath >= current.length) {
          if (minPath > current.length) {
            // that means current list path is smaller than the existing path we already traversed
            // so replace the paths with the current path as this is smaller and update minPath
            output.length = 0;
            minPath = current.length;
          }
          // create a new copy as lists are passed by reference and if we make
          // changes to `current`, that might impact the already pushed list
          output.push([...current]);
        }
        continue; // that means current.length>minPath which isnt required for us as we need smaller path
      }

      // now we need to generate all possible words from the current word
      for (let i = 0; i < word.length; i++) {
        for (let char of alphabet) {
          if (word[i] === char) continue; // skip if the char we want to replace with is same as the current character in the current word.
          const newWord = word.substring(0, i) + char + word.substring(i + 1);
          // check if this newWord exists in the set
          if (wordSet.has(newWord)) {
            // if exists push the newWord to the path and add it to the queue
            // we can do current.push(newWord) and push current to queue but because
            // of passing by reference when current is modified, it modifies the list we pushed to the queue as well
            queue.push([...current, newWord]);
            // mark this newWord as visited in the visitedOnLevel set
            visitedOnLevel.add(newWord);
          }
        }
      }
    }

    // once the all child node in the level is traversed
    // now delete the visited items from the set
    for (const item of visitedOnLevel) {
      wordSet.delete(item);
    }
    // clear visitedOnLevel set for the next level
    visitedOnLevel.clear(); // we can do this here or initiate new Set when the level iterattion started so that set gets re-initiated on each iteration
  }

  return output;
};

console.log(
  findLadders_withTLE(
    (beginWord = 'hit'),
    (endWord = 'cog'),
    (wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
  )
);
console.log(
  findLadders_withTLE(
    (beginWord = 'hit'),
    (endWord = 'cog'),
    (wordList = ['hot', 'dot', 'dog', 'lot', 'log'])
  )
);

// Approach 02: Useful for avoid TLE
// uses mix of BFS & DFS - BFS to construct the graph and DFS to get the path array(s)
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  // use a set to search/remove the words
  const wordSet = new Set(wordList);
  const output = [];
  // early return
  if (!wordSet.has(endWord)) return output;

  // Step 01: Use BFS to construct the graph : with the words as the key and the steps/level as the value
  const graph = new Map(); // can use a plain js object but Map will be faster for lookup's and add/delete ops
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const queue = [[beginWord, 0]];
  // delete the beginWord from the wordSet to avoid repeated processing
  wordSet.delete(beginWord);

  let index = 0;
  while (index < queue.length) {
    const [current, steps] = queue[index];
    index++;

    // check if the graph has the current word, if not add the word
    if (!graph.has(current)) {
      graph.set(current, steps);
    }

    // now check for all possible next words we can generate by replacing a single character
    for (let i = 0; i < current.length; i++) {
      for (const char of alphabet) {
        if (char === current[i]) continue;
        const newWord =
          current.substring(0, i) + char + current.substring(i + 1);
        if (wordSet.has(newWord)) {
          queue.push([newWord, steps + 1]);
          wordSet.delete(newWord); // helps to avoid unneccesary checking [ for example: hit->hot->dot and for dot, we can generate hot again]
          // we can avoid that by deleting the word from the set so that when hot was generated again, it will be skipped.
        }
      }
    }
  }

  // Step 02: Now that the graph is constructed, use the graph to backtrack and generate the path(s)
  // This approach is better for large input as we stop exploring further levels once the smallest path is found.
  // as we only need the path(s) with smallest length, further levels can be skipped.
  // and using dfs from the endWord, we can utilize the graph until the target level to backtrack and construct the path
  const dfs = (word, path) => {
    // if the word is beginWord(as we are backtracking), we have the required path, so push it to the output array
    if (word === beginWord) {
      // modifying the path anywhere in the function might cause an issue as in JS we pass non-primitives by ref
      output.push([...path].reverse()); // as we are starting from the endWord, path will be in reverse
      return; // stop further exploration as we have found the required path
    }

    // now we need to generate all possible prev words we can generate by replacing a single character
    for (let i = 0; i < word.length; i++) {
      for (const char of alphabet) {
        if (char === word[i]) continue;
        const prevWord = word.substring(0, i) + char + word.substring(i + 1);
        // check if the prevWord exists in the graph and its in the prev level of the current word.
        if (
          graph.has(prevWord) &&
          graph.get(prevWord) === graph.get(word) - 1
        ) {
          // continue dfs with the new word
          dfs(prevWord, [...path, prevWord]);
        }
      }
    }
  };

  // check if the endWord exists in the graph and if exists, start backtracking
  if (graph.has(endWord)) {
    dfs(endWord, [endWord]);
  }

  return output;
};

console.log(
  findLadders(
    (beginWord = 'hit'),
    (endWord = 'cog'),
    (wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
  )
);
console.log(
    findLadders(
      (beginWord = 'hit'),
      (endWord = 'cog'),
      (wordList = ['hot', 'dot', 'dog', 'lot', 'log'])
    )
  );