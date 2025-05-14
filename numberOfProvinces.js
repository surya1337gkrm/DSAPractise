// Leetcode: https://leetcode.com/problems/number-of-provinces/description/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */

// isConnected is a adjacency matrix
// Example: isConnected = [[1,0,0],[0,1,0],[0,0,1]]

// components: connected graph sections in the graph
// A-->B
// C
// this can be a graph and A->B is a component and C is a component
// and here we need to find those components(count)
var findCircleNum = function (isConnected) {
  // keep a set to track the visited nodes of the graph
  const visited = new Set(); // this can be an array of length isConnected.length as well
  let provinces = 0;

  const vertices = isConnected.length;

  const dfs = node => {
    if (visited.has(node)) return;
    visited.add(node);

    for (let j = 0; j < vertices; j++) {
      if (isConnected[node][j] === 1 && !visited.has(j)) {
        dfs(j);
      }
    }
  };

  for (let i = 0; i < vertices; i++) {
    // call dfs only if the node isnt visited yet
    // within the iteration, dfs will end when there's no further path to explore
    // increment the provinces when the dfs ended for that startNode and all its connected nodes were visited
    // and in the next iteration, we will check if the next node is already visited
    // if yes, skip and if not start dfs for that node
    // total count by the end of the iteration will be the count of components

    if (!visited.has(i)) {
      dfs(i);
      provinces++;
    }
  }

  return provinces;
};

console.log(
  'Provinces: ',
  findCircleNum(
    (isConnected = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ])
  )
);
