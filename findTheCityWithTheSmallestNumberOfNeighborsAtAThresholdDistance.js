// Leetcode: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  // we need a matrix to store the distance between each pair of nodes
  // Approach 01: Using Floyd Warshall algorithm to keep track of distance between each node(s)

  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  // fill the diagonal(s) with 0 - min distance between i & i will alwsys be 0.
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // update the given weights
  for (const [u, v, weight] of edges) {
    dist[u][v] = weight;
    dist[v][u] = weight;
  }

  // Floyd warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  // by this point, we will have min distance(s) between nodes updated in the matrix
  let minReachable = Infinity;
  let result = -1;

  // check for distance < threshold and update minReachable
  // when minReachable is updated, update the city number to result
  // as we are incrementally checking for the city number with minimum reachable nodes
  // result will be updated to the max city number in case there is a tie.
  for (let i = 0; i < n; i++) {
    let reachable = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) reachable++;
    }
    if (reachable <= minReachable) {
      minReachable = reachable;
      result = i;
    }
  }

  return result;
};

console.log(
  findTheCity(
    (n = 4),
    (edges = [
      [0, 1, 3],
      [1, 2, 1],
      [1, 3, 4],
      [2, 3, 1],
    ]),
    (distanceThreshold = 4)
  )
);

console.log(
  findTheCity(
    (n = 5),
    (edges = [
      [0, 1, 2],
      [0, 4, 8],
      [1, 2, 3],
      [1, 4, 2],
      [2, 3, 1],
      [3, 4, 1],
    ]),
    (distanceThreshold = 2)
  )
);

// As the weights are not negative, we can use dijkstra's algorithm for each node as the start node.
// Approach 02: Using Dijkstra's Algorithm

class PQ {
  constructor() {
    this.heap = [];
  }

  #getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  #getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  #getRightChildIndex(i) {
    return 2 * i + 2;
  }

  #bubbleUp(i) {
    let parentIndex = this.#getParentIndex(i);
    while (i > 0 && this.heap[i].weight < this.heap[parentIndex].weight) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ]; // swap the parent with the ith node
      i = parentIndex;
      parentIndex = this.#getParentIndex(i);
    }
  }

  #bubbleDown(i) {
    const leftChildIndex = this.#getLeftChildIndex(i);
    const rightChildIndex = this.#getRightChildIndex(i);
    let smallest = i;
    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].weight < this.heap[smallest].weight
    ) {
      smallest = leftChildIndex;
    }
    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].weight < this.heap[smallest].weight
    ) {
      smallest = rightChildIndex;
    }
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.#bubbleDown(smallest);
    }
  }

  size() {
    return this.heap.length;
  }

  enqueue(node, weight) {
    const item = { node, weight };
    this.heap.push(item);
    this.#bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#bubbleDown(0);
    return min;
  }
}
var findTheCityV2 = (n, edges, distanceThreshold) => {
  // construct the graph
  const graph = new Map();
  for (const [u, v, w] of edges) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);

    graph.get(u).push([v, w]);
    graph.get(v).push([u, w]);
  }

  // this will be a helper function to calculate the shortest distance from the start node to all other nodes
  // we will use dijkstra's algorithm to calculate the shortest distance from the start node to all other nodes
  const dijkstra = start => {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;

    const pq = new PQ();
    pq.enqueue(start, 0);

    while (pq.size() > 0) {
      const { node, weight } = pq.dequeue();
      if (weight > dist[node]) continue;

      for (const [neighbor, cost] of graph.get(node) || []) {
        const newCost = weight + cost;
        if (newCost < dist[neighbor]) {
          dist[neighbor] = newCost;
          pq.enqueue(neighbor, newCost);
        }
      }
    }

    return dist;
  };

  let minReachable = Infinity;
  let result = -1;

  for (let i = 0; i < n; i++) {
    // get min path for i node to all nodes
    const distArr = dijkstra(i);
    let reachable = 0;
    for (const dist of distArr) {
      if (dist !== 0 && dist <= distanceThreshold) reachable++;
    }

    if (reachable <= minReachable) {
      minReachable = reachable;
      result = i;
    }
  }

  return result;
};
console.log(
  'Using Dijkstras Algo: ',
  findTheCity(
    (n = 4),
    (edges = [
      [0, 1, 3],
      [1, 2, 1],
      [1, 3, 4],
      [2, 3, 1],
    ]),
    (distanceThreshold = 4)
  )
);

console.log(
  'Using Dijkstras Algo: ',
  findTheCity(
    (n = 5),
    (edges = [
      [0, 1, 2],
      [0, 4, 8],
      [1, 2, 3],
      [1, 4, 2],
      [2, 3, 1],
      [3, 4, 1],
    ]),
    (distanceThreshold = 2)
  )
);
