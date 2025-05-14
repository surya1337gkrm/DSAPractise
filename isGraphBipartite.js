// leetcode: https://leetcode.com/problems/is-graph-bipartite/description/

// A graph is bipartite if the nodes can be partitioned into two independent sets A and B
// such that every edge in the graph connects a node in set A and a node in set B.

/**
 * @param {number[][]} graph
 * @return {boolean}
 */

const graph1 = [
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
];
const graph2 = [
  [1, 3],
  [0, 2],
  [1, 3],
  [0, 2],
];
var isBipartite = function (graph) {
  // given graph can be a graph with multiple components
  // so we need to start the process with each vertex as the starting node
  const vertices = graph.length;

  // keep an array(grouped) to mark all the vertices when grouped.
  const grouped = new Array(vertices).fill(-1); // -1: ungrouped,0,1:grouped [ group 0 & group 1]

  const bfs = node => {
    const queue = [node];
    grouped[node] = 0; // start with 0
    let index = 0; // use this to pop the first item of the queue
    while (index < grouped.length) {
      const curr = queue[index];
      index++;
      // all neighbors will be grouped with opposite group number of the curr group
      const group = grouped[curr] === 0 ? 1 : 0;

      for (const neighbor of graph[curr]) {
        // if neighbor is not visited, mark it with the opposite group number and push the neighbor to the queue
        if (grouped[neighbor] === -1) {
          grouped[neighbor] = group;
          queue.push(neighbor);
        } else if (grouped[neighbor] === grouped[curr]) {
          // if the neighbor is already grouped with the same group number as the current node, that means
          // both node and neighbir node belongs to the same group which makes the graph not bipartite.
          return false;
        }
      }
    }
  };

  const dfs = (node, group) => {
    grouped[node] = group;
    // once marked now change the group to opp for all neighbors
    group = group === 0 ? 1 : 0;
    for (const neighbor of graph[node]) {
      if (grouped[neighbor] === -1) {
        if (dfs(neighbor, group) === false) return false;
      } else if (grouped[neighbor] === grouped[node]) {
        return false;
      }
    }
  };

  for (let i = 0; i < vertices; i++) {
    // we can either use bfs/dfs for this
    if (grouped[i] === -1) {
      //   if (bfs(i) === false) return false; // using bfs
      if (dfs(i, 0) === false) return false; // using dfs
    }
  }
  return true;
};

console.log(isBipartite(graph1)); // false
console.log(isBipartite(graph2)); // true
