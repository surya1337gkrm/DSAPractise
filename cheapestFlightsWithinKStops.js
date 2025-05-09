// Leetcode: https://leetcode.com/problems/cheapest-flights-within-k-stops/description/

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */

// defining our own priority queue
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
    while (i > 0 && this.heap[i].stops < this.heap[parentIndex].stops) {
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

    // check if the left child has higher priority than the current node
    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].stops < this.heap[smallest].stops
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].stops < this.heap[smallest].stops
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.#bubbleDown(smallest);
    }
  }

  enqueue(stops, node, price) {
    const item = { stops, node, price };
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

  size() {
    return this.heap.length;
  }
}

var findCheapestPrice = function (n, flights, src, dst, k) {
  // Approach 01: Using a priority queue  TC: O(ElogV) SC: O(V)
  // Intution: We have to get the cheapest fare so if we prefer price as the priority value for the PQ,
  // then we might end with a solution which isnt the cheapest within k stops.
  // as when we tracking the min price in an array, there's a possibility during some iteration,
  // min price for ith node is updated and we might have a solution with a higher price till that node and
  // later steps takes less price resulting in an overall lesser price from src to destination.

  // Step 01: Construct the graph
  const graph = new Map();
  // use a array to keep track of min price to each destination
  const priceArr = new Array(n).fill(Infinity);

  // construct the graph

  for (const [start, dest, cost] of flights) {
    if (!graph.has(start)) {
      graph.set(start, []);
    }
    graph.get(start).push([dest, cost]);
  }

  // mark the minPrice as 0 for the source
  priceArr[src] = 0;

  const pq = new PQ();
  pq.enqueue(0, src, 0);

  while (pq.size() > 0) {
    const { stops, node, price } = pq.dequeue();
    if (stops > k) continue; // if we have reached k stops, skip this node
    if (node === dst) continue; // if the destination is reached just skip - dont return the price as there can be another path which can lead to a  min price

    // traverse all the adjacent nodes
    for (const [nextNode, nextPrice] of graph.get(node) || []) {
      // for each neighbor node, check if the cost to reach this node is less than the current price
      // if yes, update the array with the min price and enqueue
      if (price + nextPrice < priceArr[nextNode]) {
        priceArr[nextNode] = price + nextPrice;
        pq.enqueue(stops + 1, nextNode, price + nextPrice);
      }
    }
  }

  // if the destination node isnt reachable from the source, value will be infinity
  // otherwise return the min price to reach the destination node.
  return priceArr[dst] === Infinity ? -1 : priceArr[dst];
};

console.log(
  findCheapestPrice(
    (n = 4),
    (flights = [
      [0, 1, 100],
      [1, 2, 100],
      [2, 0, 100],
      [1, 3, 600],
      [2, 3, 200],
    ]),
    (src = 0),
    (dst = 3),
    (k = 1)
  )
);

console.log(
  findCheapestPrice(
    (n = 3),
    (flights = [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ]),
    (src = 0),
    (dst = 2),
    (k = 1)
  )
);
console.log(
  findCheapestPrice(
    (n = 3),
    (flights = [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ]),
    (src = 0),
    (dst = 2),
    (k = 0)
  )
);
