// GFG: https://www.geeksforgeeks.org/problems/topological-sort/1

// Topological sorting is applicable only for Directed Acyclic Graphs(DAG)
// Topological sorting is linear ordering of vertices such that every directed edge a->b, vertex a comes before the vertex b
// Useful is tasks like task/course scheduling

/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {number[]}
 */
var topoSort = (V, edges) => {
  // Approach: if edges are given, construct a adjacency graph
  // and perform DFS on the graph to get the topological sort

  // IMPORTANT: In topological sort, we need to keep all the dependent nodes before the source node
  // Example: if a has edges with b and c then a should come before b and c in the topological sort.
  const output = [];
  const graph = new Map();

  const stack = [];
  const visited = new Array(V).fill(false);

  // construct graph
  for (let [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
  }

  const dfs = (node) => {
    visited[node] = true;
    for (let neighbor of graph[node] || []) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
    // push the node to the stack after all the neighbors are visited
    stack.push(node);
  };

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // pop the elements from the stack and add them to the output array
  while (stack.length > 0) {
    output.push(stack.pop());
  }
  return output;
};

console.log(
  topoSort(
    (V = 4),
    (edges = [
      [3, 0],
      [1, 0],
      [2, 0],
    ])
  )
);
console.log(
  topoSort(
    (V = 6),
    (edges = [
      [1, 3],
      [2, 3],
      [4, 1],
      [4, 0],
      [5, 0],
      [5, 2],
    ])
  )
);
