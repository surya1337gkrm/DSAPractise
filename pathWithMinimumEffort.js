// Leetcode: https://leetcode.com/problems/path-with-minimum-effort/

/**
 * @param {number[][]} heights
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
    while (i > 0 && this.heap[i].priority < this.heap[parentIndex].priority) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ];

      // now go upwards - update the i to the parentIndex and update the parentIndex to it's parent
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
      this.heap[leftChildIndex].priority < this.heap[smallest].priority
    ) {
      smallest = leftChildIndex;
    }

    // check if the right child has higher priority than the current node
    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].priority < this.heap[smallest].priority
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.#bubbleDown(smallest);
    }
  }

  // x,y co-ordinates of the cell
  enqueue(x, y, priority) {
    const cell = { x, y };
    const node = { cell, priority };
    this.heap.push(node);
    this.#bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); // update the root with the last element and call bubbleDown to re-arrange
    this.#bubbleDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }
}

// As we need to find the minimum effort(path) between tow nodes, we use dijkstra's algorithm
// and we need priority queue to implement the algorithm.
// We will use min-heap approach to implement the algorithm. In a min-heap tree, parent node will be the smallest(priority value)
// smaller the priority value - higher the priority

// Approach 01: Use a visited matrix to track the visited cells
// And update the effort in each iteration to the max effort until we visited this cell.
// If we reach the destination cell, return the effort value.

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
var minimumEffortPath = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;

  const visited = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const pq = new PQ();
  pq.enqueue(0, 0, 0); // start from the (0,0) cell with effort 0

  let effort = 0;

  while (pq.size() > 0) {
    const {
      cell: { x, y },
      priority,
    } = pq.dequeue();

    visited[x][y] = 1;
    effort = Math.max(effort, priority);

    // if the current cell is the final cell, return the effort value
    if (x === rows - 1 && y === cols - 1) return effort;

    for (const [dr, dc] of directions) {
      const nr = x + dr;
      const nc = y + dc;

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        visited[nr][nc] !== 1
      ) {
        // calculate the new effort to move from the current cell to the neighbor cell
        const newEffort = Math.abs(heights[nr][nc] - heights[x][y]);
        pq.enqueue(nr, nc, newEffort);
      }
    }
  }

  // return -1;
};

console.log(
  minimumEffortPath(
    (heights = [
      [1, 2, 2],
      [3, 8, 2],
      [5, 3, 5],
    ])
  )
);
console.log(
  minimumEffortPath(
    (heights = [
      [1, 2, 3],
      [3, 8, 4],
      [5, 3, 5],
    ])
  )
);
console.log(
  minimumEffortPath(
    (heights = [
      [1, 2, 1, 1, 1],
      [1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1],
      [1, 1, 1, 2, 1],
    ])
  )
);

// Approach 02: Uses a matrix to track minEffort for reaching each cell instead of a visited matrix
// And update the effort in each iteration to the max effort until we visited this cell.
// Preferred Approach: as this uses Dijkstra's logic properly by tracking the minimum effort required to reach each cell.
// we enqueue a cell only if the new effort is smaller than the previously recorded one.
var minimumEffortPathV2 = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;

  const minEffort = Array.from({ length: rows }, () =>
    new Array(cols).fill(Infinity)
  );
  const pq = new PQ();

  pq.enqueue(0, 0, 0);

  let effort = 0;

  while (pq.size() > 0) {
    const {
      cell: { x, y },
      priority,
    } = pq.dequeue();
    effort = Math.max(effort, priority);

    if (x === rows - 1 && y === cols - 1) return effort;
    for (const [dr, dc] of directions) {
      const nr = x + dr;
      const nc = y + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const newEffort = Math.abs(heights[nr][nc] - heights[x][y]);
        if (minEffort[nr][nc] > newEffort) {
          minEffort[nr][nc] = newEffort; // update the neighbour cell effort with the min effort possible until reaching that cell
          pq.enqueue(nr, nc, newEffort); // and then enqueue the neighbour cell
        }
      }
    }
  }
};
