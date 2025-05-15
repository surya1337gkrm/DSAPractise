// GFG: https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1

// Find the shortest distance between any nodes in the graph
// Works for negative weights as well.

/**
 * @param {number[][]} matrix
 * @returns {number}
 */

var floydWarshall = dist => {
  // Intuition: The idea is to use the Floyd-Warshall algorithm to find the shortest path between all pairs of vertices in a weighted graph.
  // The algorithm works by iteratively updating the distance matrix to reflect the shortest path between each pair of vertices.
  // The time complexity of the algorithm is O(V^3), where V is the number of vertices in the graph.
  // The space complexity of the algorithm is O(V^2), where V is the number of vertices in the graph.
  // By updating the distance matrix, we can find the shortest path between any pair of vertices in the graph.

  // we try to find shortest distance between tow nodes via all other nodes
  // we use the following formula: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
  // where k will be the via node. [ shortest path between i & j via k] in each iteration.

  // When this algorithm should be used?: When we want to find the shortest path between all pairs of vertices in a weighted graph.

  const n = dist.length;

  // updates min path between i&j
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== 1e8 && dist[k][j] !== 1e8)
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  // in order to detect a negative cycle: min distance for ith node from ith node will always be 0
  // if the any of those node values isnt equal to 0 then there is a negative cycle
  for (let i = 0; i < n; i++) {
    if (dist[i][i] !== 0) return -1; // negative cycle found
  }

  return dist;
};

console.log(
  floydWarshall(
    (dist = [
      [0, 4, 108, 5, 108],
      [108, 0, 1, 108, 6],
      [2, 108, 0, 3, 108],
      [108, 108, 1, 0, 2],
      [1, 108, 108, 4, 0],
    ])
  )
);
console.log(
  floydWarshall(
    (dist = [
      [0, -1, 2],
      [1, 0, 108],
      [3, 1, 0],
    ])
  )
);
