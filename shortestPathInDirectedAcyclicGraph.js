// GFG: https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1

var shortestPath = (V, E, edges) => {
  // Approach 01: Using BFS with slight mod
  // as we just got the edges in random order, we need to construct the graph with each
  // node as key and connected nodes with associated cost as values.

  const graph = new Map();

  for (const [a, b, cost] of edges) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push([b, cost]);
  }

  // use a distArray to update the distance for each node from src node
  // for this problem, src is always 0 node
  const distArr = new Array(V).fill(Infinity);

  distArr[0] = 0;
  const queue = [[0, 0]];

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    for (const [neighbor, cost] of graph.get(node) || []) {
      const newCost = dist + cost;
      if (newCost < distArr[neighbor]) {
        distArr[neighbor] = newCost;
        queue.push([neighbor, newCost]);
      }
    }
  }

  // once distance is calculated for all nodes, update the nodes with Infinity as value to -1
  // (if the node doesnt have a path from the src node)
  for (let i = 0; i < distArr.length; i++) {
    if (distArr[i] === Infinity) {
      distArr[i] = -1;
    }
  }

  return distArr;
};

console.log(
  shortestPath(
    (V = 6),
    (E = 7),
    (edges = [
      [0, 1, 2],
      [0, 4, 1],
      [4, 5, 4],
      [4, 2, 2],
      [1, 2, 3],
      [2, 3, 6],
      [5, 3, 1],
    ])
  )
);

console.log(
  shortestPath(
    (V = 4),
    (E = 2),
    (edges = [
      [0, 1, 2],
      [0, 2, 1],
    ])
  )
);

const shortestPathV2 = (V, E, edges) => {
  // Approach 02: Using topological sort
  // You process nodes in topological order and for each node, you relax all its
  // outgoing edges just once, because there are no cycles and the dependencies are guaranteed to be in order.
  // This approach is more efficient than the BFS approach because it only processes each node once.

  // constructing the graph

  const graph = new Map();

  const visited = new Array(V).fill(false);
  const distArr = new Array(V).fill(Infinity);
  distArr[0] = 0;

  for (const [a, b, cost] of edges) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push([b, cost]);
  }

  // getting the topological sort of the given graph
  const stack = [];
  const dfs = (node) => {
    visited[node] = true;
    for (const [neighbor, cost] of graph.get(node) || []) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
    stack.push(node);
  };

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }


  // topological sort will be reverse of the stack
  while (stack.length > 0) {
    const node = stack.pop();
    if (distArr[node] !== Infinity) { // check if the current distance of the node is Infinity, if yes, avoid 
      for (const [neighbor, cost] of graph.get(node) || []) {
        if (distArr[neighbor] > distArr[node] + cost) {
          distArr[neighbor] = distArr[node] + cost;
        }
      }
    }
  }

  for (let i = 0; i < distArr.length; i++) {
    if (distArr[i] === Infinity) distArr[i] = -1;
  }

  return distArr;
};
