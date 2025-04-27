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

// we can get the same topological sort using BFS
// using Kahn's Algorithm.
// Approach: We use a inDegree array to store the incoming edges for a node
// and we start with the nodes that doesnt have any incoming edges;

// if there arent any incoming edges: that means this node doesnt have any prerequesites
// so we can add it to the queue and start exploring its neighbors.
// we mark the node as visited and decrease the inDegree of its neighbors by 1.
// if the inDegree of a neighbor becomes 0, that means this neighbor has no more incoming edges
// so we can add it to the queue and start exploring its neighbors.

const topoSort_withKahnsAlgorithm = (V, edges) => {
  const output = [];
  const graph = new Map();
  const inDegree = new Array(V).fill(0);

  // construct the graph and inDegree array
  for (let [a, b] of edges) {
    if (!graph.has(a)) graph[a] = [];
    if (!graph.has(b)) graph[b] = [];
    graph.get(a).push(b);
    inDegree[b]++;
  }

  // we dont have to iterate through all the nodes as initially all nodes has inDegree value as 0
  // and only nodes which has incoming nodes will be incremented and also we dont need a visited array
  // as we use the inDegree value to push the next node to the queue
  const queue = [];
  for (let i = 0; i < V; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();
    output.push(node);
    for (let neighbor of graph.get(node) || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return output;
};
console.log(
  'With Kahns Algo: ',
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
  'With Kahns Algo: ',
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
