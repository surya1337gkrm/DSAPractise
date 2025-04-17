// GFG: https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1

/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {boolean}
 *
 */

// input: V = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 3]]
// TC: O(V+2E) and SC: O(V)
const isCycle = (V, edges) => {
  // we can either use bfs/dfs to detect the cycle in the graph
  // given the edges in array format, first we need to construct the adjacency graph

  // keep an array to track the visited nodes of the graph

  const visited = new Array(V).fill(false);

  // construct the graph
  const graph = {};
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  // with bfs approach: we traverse through the graph by levels
  // and if a node is already visited, we need to check if it was visited from the same level(parent)
  // as it is a undirected graph : a->b and b->a exists.
  // if yes, then there is a cycle in the graph.[ i.e, if the node is already visited but the current parent isn't neighbor node]

  const bfs = (src) => {
    // first the startNode, add the parent value as -1
    const queue = [[src, -1]];
    while (queue.length > 0) {
      const [current, parent] = queue.shift();
      visited[current] = true;
      for (const neighbor of graph[current] || []) {
        if (!visited[neighbor]) {
          queue.push([neighbor, current]);
        } else if (parent !== neighbor) {
          // if the current node is already visited and the current parent isn't neighbor node
          // then there is a cycle in the graph.
          // 1 -- 2
          //  \  /      1 is already visted when we started and from 2 -> we skip visiting 1 again as 1 is the parent
          //    3       but for node 3: parent is 2 but 1 is also a neighbor and it's already visited -> Cycle detected.
          return true;
        }
      }
    }
  };

  // we need to check for each node of the graph as the starting node
  // as in the given graph, there can be disconnected components
  for (let i = 0; i < V; i++) {
    // skip checking for cycle if the node is already visited
    if (!visited[i]) {
      // bfs returns true if cycle exists
      if (bfs(i)) return true;
    }
  }
  return false;
};

console.log(
  isCycle(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
  ])
); // true
console.log(
  isCycle(4, [
    [1, 2],
    [2, 3],
  ])
); // false

const isCycleWithDFS = (V, edges) => {
  // with DFS: we traverse through the graph depth wise
  // and if the node is already visited, we need to check if it was visited from the same level(parent)
  // similar to how we are checking in the bfs approach
  const visited = new Array(V).fill(false);

  const graph = {};
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  const dfs = (node, parent) => {
    visited[node] = true;
    for (const neighbor of graph[node] || []) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, node)) return true;
      } else if (parent !== neighbor) {
        return true;
      }
    }
  };

  for (let i = 0; i < V; i++) {
    // skip checking for cycle if the node is already visited
    if (!visited[i]) {
      // dfs returns true if cycle exists and for the startNode, parent is -1
      if (dfs(i, -1)) return true;
    }
  }
  return false;
};

console.log(
  'With DFS: ',
  isCycleWithDFS(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
  ])
); // true
console.log(
  'With DFS: ',
  isCycleWithDFS(4, [
    [1, 2],
    [2, 3],
  ])
); // false
