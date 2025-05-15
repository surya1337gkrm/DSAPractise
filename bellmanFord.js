// GFG: https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1

// Find the shortest distance from source node to all other nodes in the graph
// PS: Edges can be given in any order

/**
 * Function to implement Bellman Ford
 * @param {number} V
 * @param {number[][]} edges
 * @param {number} src
 * @returns {number[]}
 */

var bellmanFord = (V, edges, src) => {
  // Intution: Djikstra's algorithm is used to find the shortest path from a source node to all other nodes in a weighted graph.
  // But it fails for graphs with negative weights. In such cases, we can use Bellman Ford algorithm.
  // The idea is to relax all edges V-1 times. If after V-1 relaxations, there is still a negative weight cycle,
  // then the graph contains a negative weight cycle. Otherwise, the graph does not contain any negative weight cycle.
  // Time complexity: O(V * E)
  // Space complexity: O(V) as we are using an array to store the distance(s).
  // By relaxation i mean: we are updating the shortest distance of each node from the source node.
  // We are doing this V-1 times because after V-1 relaxations, the shortest distance of each node from the source node will be updated.

  let distance = new Array(V).fill(1e8); // as per problem statement
  distance[src] = 0; // source node distance is 0

  // v-1 iterations
  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, weight] of edges) {
      if (distance[u] + weight < distance[v]) {
        distance[v] = distance[u] + weight;
      }
    }
  }

  // vth iteration to check if there is any negative weight cycle
  for (const [u, v, weight] of edges) {
    if (distance[u] + weight < distance[v]) {
      return [-1]; // negative weight cycle found
    }
  }

  return distance;
};

console.log(
  bellmanFord(
    (V = 5),
    (edges = [
      [1, 3, 2],
      [4, 3, -1],
      [2, 4, 1],
      [1, 2, 1],
      [0, 1, 5],
    ]),
    (src = 0)
  )
);

console.log(
  bellmanFord(
    (V = 4),
    (edges = [
      [0, 1, 4],
      [1, 2, -6],
      [2, 3, 5],
      [3, 1, -2],
    ]),
    (src = 0)
  )
);
