// Leetcode(Premium): https://leetcode.com/problems/alien-dictionary/editorial/
// Neetcode: https://neetcode.io/problems/foreign-dictionary
// GFG: https://www.geeksforgeeks.org/problems/alien-dictionary/1

var foreignDictionary = (words) => {
  // Approach: We use a graph to represent the relationships between the words
  // and then we perform topological sort to get the order of the words
  const graph = new Map();
  // beacuse we have alphabets store the inDegree values in a map for each letter
  const inDegree = new Map();
  // generate the graph & inDegree maps
  for (const word of words) {
    for (const char of words) {
      if (!graph.has(char)) graph.set(char, []);
      if (!inDegree.has(char)) inDegree.set(char, 0); // initiate inDegree value as 0 for all characters
    }
  }

  // now take consecutive words and start comparing
  // as mentioned, the words are in sorted order, if the characters at same position aren't equal
  // that means character at position(i) of first letter is smaller than the character at position(i) of second letter
  // so we can add an edge from first to the second
  for (let i = 0; i < words.length - 1; i++) {
    const first = words[i];
    const second = words[i + 1];

    // we have to to check until one of the word length is exhausted
    // and by the end of the iteration, if the comparision doesnt result in an edge,
    // that means the given order doesnt produce a valid order
    // example: if the two words are: hre,hr then the order is invalid
    // but we have to make sure that we didnt find the edge as well.
    // like in example: hrf er, we find an edge but if we just returns invalid based on length's its wrong.
    const min = Math.min(first.length, second.length);
    const found = false; // used to track if we found an edge
    for (let j = 0; j < min; j++) {
      if (first[j] !== second[j]) {
        graph.get(first[j]).push(second[j]); // updated edge
        inDegree.set(second[j], inDegree.get(second[j]) + 1); // increment the inDegree of the second character
        found = true; // edge found
        break; // break the loop as we found the edge
      }
    }

    // after checking all the character(min), check if we found the edge
    // if not, check if the first length is greater than the second length
    if (!found && first.length > second.length) return '';
  }

  // now we have the graph and inDegree maps, we can perform topological sort
  // Using kahn's algorithm: BFS
  const queue = [];
  for (const [char, degree] of inDegree.entries()) {
    if (degree === 0) queue.push(char);
  }

  const topoSort = [];
  while (queue.length > 0) {
    const current = queue.shift();
    topoSort.push(current);
    // get the neighbors of the current char
    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  // now we have the topological sort and it will be valid only if we have all characters in the sorted array
  if (topoSort.length !== words.length) return '';
  else return topoSort.join('');
};
