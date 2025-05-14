// Leetcode(Premium): https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/
// Lintcode: https://www.lintcode.com/problem/3651/
// Neetcode: https://neetcode.io/problems/count-connected-components

/**
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number}
 */

// Example: n=3 and edges=[[0,1], [0,2]]
// each element([a,b]) in edges array denotes there's an edge between a and b
const countComponents = (n, edges) => {
  // construct the graph/adjacency list first from the edges
  const graph = {};
  // keep a set to track the visited nodes of the graph
  const visited = new Set();

  let components = 0;

  // constructing the graph/adjacency list
  for (const [a, b] of edges) {
    if (!graph[a]) {
      graph[a] = [];
    }

    if (!graph[b]) {
      graph[b] = [];
    }

    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = node => {
    if (visited.has(node)) return;
    visited.add(node);

    // graph might not have neighbors, so add a or condsition and return empty array
    for (let neighbor of graph[node] || []) {
      // skip calling dfs for nodes which are already visited
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  };

  // perform dfs for each node and increment the components count when dfs ends for that
  // startNode and all its connected nodes were visited
  // and in the next iteration, we will check if the next node is already visited
  // if yes, skip and if not start dfs for that node
  // total count by the end of the iteration will be the count of components
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      components++;
    }
  }

  return components;
};

console.log(
  'Count of Components: ',
  countComponents(
    (n = 3),
    (edges = [
      [0, 1],
      [0, 2],
    ])
  )
);
