// Leetcode: https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/description/

/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */

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
    while (i > 0 && this.heap[i].time < this.heap[parentIndex].time) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ];
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
      this.heap[leftChildIndex].time < this.heap[smallest].time
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].time < this.heap[smallest].time
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

  enqueue(time, node) {
    const item = { time, node };
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

var countPaths = function (n, roads) {
  // Approach: [Step 01]: construct the graph
  // we need to priortize the edges based on the time between the nodes
  // so we will use a priority queue with the time between nodes as the priority.
  // if node b has total 3 paths with same minimal time, and if there's a edge between b->c,
  // by default, c will have 3 paths with same minimal time, but we need to add the path from b->c to c
  // we use this to track the number of minimal paths available for each node.

  const graph = new Map(); // {srcNode:[time,destNode]}

  // use timeArr to keep track of the minimal time available for each node
  // use paths array to keep track of availble minimal time paths for each node.
  const timeArr = new Array(n).fill(Infinity);
  const paths = new Array(n).fill(0);

  // update timeArr & paths - for the start node, time will be 0 and there will be only one path.
  timeArr[0] = 0;
  paths[0] = 1;

  // construct the graph
  for (const [a, b, time] of roads) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(a).push([time, b]);
    graph.get(b).push([time, a]);
  }

  const pq = new PQ();
  pq.enqueue(0, 0);

  const mod = 1e9 + 7; // as per the problem statement, paths can be very large, so we need to take modulo.

  while (pq.size() > 0) {
    const { time, node } = pq.dequeue();

    // if the current time > timeArr[node],
    // then we can skip this node as it will not be the minimal time available for the node.
    if (time > timeArr[node]) continue;

    // explore all neighbor node of the current node and update paths & timeArr if a minimal time path is found
    for (const [nextTime, neighbor] of graph.get(node) || []) {
      const newTime = time + nextTime;
      if (newTime < timeArr[neighbor]) {
        timeArr[neighbor] = newTime;
        paths[neighbor] = paths[node];
        pq.enqueue(newTime, neighbor);
      } else if (newTime === timeArr[neighbor]) {
        // if the new time is equal to the current time, then we have
        // to add the paths from the current node to the neighbor node.
        paths[neighbor] = (paths[neighbor] + paths[node]) % mod;
      }
    }
  }

  return paths[n - 1]; // return the number of minimal paths available for the destination node.
};

console.log(
  countPaths(
    (n = 7),
    (roads = [
      [0, 6, 7],
      [0, 1, 2],
      [1, 2, 3],
      [1, 3, 3],
      [6, 3, 3],
      [3, 5, 1],
      [6, 5, 1],
      [2, 5, 1],
      [0, 4, 5],
      [4, 6, 2],
    ])
  )
);

console.log(countPaths((n = 2), (roads = [[1, 0, 10]])));
