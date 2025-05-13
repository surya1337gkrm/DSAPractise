// Leetcode: https://leetcode.com/problems/network-delay-time/description/

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
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

var networkDelayTime = function (times, n, k) {
  // construct the graph and initialize the time array with infinity.
  // We will update the time array with the minimum time taken to reach
  // each node from the source node k. We will use a priority queue to keep
  // track of the nodes with the minimum time taken to reach them.
  // We will start by adding the source node k to the priority queue with time 0.
  // We will then pop the node with the minimum time taken to reach it from the priority queue
  const graph = new Map();

  for (const [a, b, time] of times) {
    if (!graph.has(a)) graph.set(a, []);

    graph.get(a).push([time, b]);
  }

  const timeArr = new Array(n).fill(Infinity);
  timeArr[k - 1] = 0;
  const pq = new PQ();
  pq.enqueue(0, k);

  while (pq.size() > 0) {
    const { time, node } = pq.dequeue();
    if (time > timeArr[node - 1]) continue;

    for (const [nextTime, neighbor] of graph.get(node) || []) {
      const newTime = time + nextTime;
      if (newTime < timeArr[neighbor - 1]) {
        timeArr[neighbor - 1] = newTime;
        pq.enqueue(newTime, neighbor);
      }
    }
  }

  // once we have the time taken to reach each node from source node(k)
  // get the maximum value from the timeArray. Beacuse, we need to return the minimum time taken to reach the destination node.
  // minimum will be the maximum time taken to reach any node from source node(k). If any of the node isnt reachable then max
  // will be infinity and then either return -1 or the max time as the required output.
  let max = -Infinity;
  for (const time of timeArr) {
    if (time > max) max = time;
  }
  return max === Infinity ? -1 : max;
};
