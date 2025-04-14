// Given a adjacency list representation of a directed graph, write a function to perform a breadth-first search (BFS) on the graph.
// The function should return an array containing the order in which the nodes were visited.

const graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['E', 'G'],
  D: ['F'],
  E: [],
  F: [],
  G: [],
};

const graph2 = {
  A: ['B', 'D'],
  B: ['A', 'C', 'E'],
  C: ['D', 'B', 'E'],
  D: ['A', 'C'],
  E: ['B', 'C'],
};

const bfs = (graph, startNode) => {
  // keep a set which tracks the visited nodes of the graph
  const visited = new Set();
  // keep a queue to track the nodes to be visited
  const queue = [startNode];
  const path = []; // list to track the order of nodes visited
  while (queue.length > 0) {
    // pop the first node in the queue | shift removes the first element of the list
    const current = queue.shift();
    // check if the current node isnt visited and if not mark it as visited
    if (!visited.has(current)) {
      visited.add(current);
      path.push(current);
      //get the neighbors of the current node and add it to the queue
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
  }
  return path;
};

console.log(bfs(graph2, 'A'));

// implement a dfs function to perform a depth-first search (DFS) on the graph.
// Approach 01: Use a recursive approach

// Good for small graphs but not for large graphs
// JS will have limitations for the stack calls and for the skewed graphs(Example below)
// for the large graphs, we might get stackoverflow error
// Example:
//                       8
//                      /
//                     7
//                    /
//                   6
//                  /
//                 5
const dfs = (graph, startNode, visited = new Set()) => {
  if (visited.has(startNode)) return;
  visited.add(startNode);
  console.log(startNode);

  for (const neighbor of graph[startNode]) {
    dfs(graph, neighbor);
  }
};

// dfs(graph,'A')

// Approach 02: Use a stack to perform DFS [ Iterative DFS ]
const iterativeDFS = (graph, startNode) => {
  const visited = new Set();
  const stack = [startNode];

  const path = [];

  while (stack.length > 0) {
    // stack: LIFO - pop the last node in the stack
    const current = stack.pop();
    if (!visited.has(current)) {
      visited.add(current);
      path.push(current);

      // get the neighbors of the current node
      // pushing the elements in reverse to get the left to right path [ reverse is optional ]
      for (const neighbor of graph[current].reverse()) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
  }
  return path;
};
console.log(iterativeDFS(graph2, 'A'));
