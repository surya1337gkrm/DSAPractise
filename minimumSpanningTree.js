// GFG: https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1

// Spanning Tree?: if a tree has n nodes then a spanning tree should have n-1 edges
// and all nodes should be reachable from each node in the tree.

// Minimum spanning tree?: Each graph can have multiple spanning trees
// - the one with minimum weight is called the minimum spanning tree.

// Example adjacency array:  edges for each node is given as follows:
// [
//   [ [ 1, 5 ], [ 2, 1 ] ],
//   [ [ 0, 5 ], [ 2, 3 ] ],
//   [ [ 1, 3 ], [ 0, 1 ] ]
// ]

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

  enqueue(startNode, endNode, weight) {
    const item = { startNode, endNode, weight };
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

var spanningTree = (v, adj) => {
  // Prims Algorithm: we will use a priority queue to keep track of the minimum weight edge
  // as we will be popping element with minimum weight from the priority queue, once a node is visited
  // we dont have to explore the same node again.
  const visited = new Array(v).fill(false);
  const mst = []; // to store the minimum spanning tree edges
  let mstCost = 0; // stores the minimum spanning tree cost

  // In a minimum spanning tree, all nodes will be part of it - consider we start with node 0 as start node.
  visited[0] = true;
  const pq = new PQ();
  // push all edges connected to node 0 into the priority queue
  for (const [endNode, weight] of adj[0] || []) {
    pq.enqueue(0, endNode, weight);
  }

  while (pq.size() > 0 && mst.length < v) {
    // mst.length<v isnt necessary but helps in skipping the unnecessary iterations
    // this is useful only when we are storing the edges - if we just have to update the cost then this is not required
    const { startNode, endNode, weight } = pq.dequeue();
    if (visited[endNode]) continue; // if the node is already visited, skip it

    // add the edge to the minimum spanning tree
    visited[endNode] = true;
    mst.push([startNode, endNode, weight]);
    mstCost += weight;

    for (const [toNode, weight] of adj[endNode] || []) {
      if (!visited[toNode]) {
        pq.enqueue(endNode, toNode, weight);
      }
    }
  }
  console.log(mst);
  return mstCost;
};

console.log(
  spanningTree(3, [
    [
      [1, 5],
      [2, 1],
    ],
    [
      [0, 5],
      [2, 3],
    ],
    [
      [1, 3],
      [0, 1],
    ],
  ])
);
