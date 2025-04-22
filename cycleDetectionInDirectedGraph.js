// GFG: https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1

/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {boolean}
 */

// V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]
var isCyclic = (V, edges) => {
  // we can either use bfs/dfs to detect the cycle in the graph
  // given the edges in array format, first we need to construct the adjacency graph

  const graph = {};

  // keep an array to track the visited & completed nodes
  // unvisited: 0, visited:1 and completed:2
  // when using dfs approach, we need to mark the node as completed(2) when we finish exploring all its neighbors
  // and if we visit a node which is marked as 1, that means it is already visited and it is a cycle in the graph.
  const visited = new Array(V).fill(0);
  //construct the graph
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
  }

  // in dfs we keep traversing through the graph depth-wise and continues until there's no child for the node
  // but if we visited the same node again which is marked as visited(but not completed), that means there's a cycle.
  const dfs = (i) => {
    if (visited[i] === 1) return true;
    if (visited[i] === 2) return false;
    visited[i] = 1;
    for (let neighbor of graph[i]) {
      if (dfs(neighbor)===true) {
        return true;
      }
    }
    visited[i] = 2;
    return false;
  };

  // traverse through the graph(as graph can contain components check for each vertex as startNode)
  for (let i = 0; i < V; i++) {
    if (visited[i] === 0) {
      if (dfs(i)) {
        return true;
      }
    }
  }
  return false
};


console.log(isCyclic(4, [[0, 1], [0, 2], [1, 2], [2, 0], [2, 3]]));
console.log(isCyclic(4,[[0, 1], [0, 2], [1, 2], [2, 3]]))