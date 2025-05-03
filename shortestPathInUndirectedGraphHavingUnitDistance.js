// GFG: https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1

// start from the src node and return an array containing shortest distance to each node in the graph
// if the path is not possible, mark distance as -1 from src
var shortestPath = (adj, src) => {
  // Approach: use BFS
  // we can use a queue to perform BFS and keep track of the distance from the source node
  // in bfs, we visit each node in levels so the path to a specific node will be shortest if it is at the same level

  const dist = new Array(adj.length).fill(-1); // initialize the distance array with -1
  dist[src] = 0; // distance from source to source is 0
  const queue = [src]; // start BFS from the source node

  while (queue.length > 0) {
    const node = queue.shift(); // get the current node from the queue
    for (const neighbor of adj[node]) {
      // check if the node isnt visited already
      // in bfs as we are traversing the graph level-wise, so if we visit a node which is already visited
      // it will be the shortest path from src to that node and if we can visit the same node again, we can ignore
      if (dist[neighbor] === -1) {
        dist[neighbor] = dist[node] + 1; // update the distance of the neighbor node
        queue.push(neighbor); // add the neighbor node to the queue for further exploration
      }
    }
  }

  return dist;
};

console.log(
  shortestPath(
    [
      [1, 3],
      [0, 2],
      [1, 6],
      [0, 4],
      [3, 5],
      [4, 6],
      [2, 5, 7, 8],
      [6, 8],
      [7, 6],
    ],
    (src = 0)
  )
);

console.log(shortestPath([[3], [3], [], [0, 1]], (src = 3)));
