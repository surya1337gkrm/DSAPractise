// Leetcode: https://leetcode.com/problems/swim-in-rising-water/description/

/**
 * @param {number[][]} grid
 * @return {number}
 */
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

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
  size() {
    return this.heap.length;
  }

  #bubbleUp(i) {
    let parentIndex = this.#getParentIndex(i);
    while (i > 0 && this.heap[i].depth < this.heap[parentIndex].depth) {
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
      this.heap[leftChildIndex].depth < this.heap[smallest].depth
    ) {
      smallest = leftChildIndex;
    }
    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].depth < this.heap[smallest].depth
    ) {
      smallest = rightChildIndex;
    }
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.#bubbleDown(smallest);
    }
  }

  enqueue(row, col, depth) {
    const item = { row, col };
    this.heap.push({ item, depth });
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

var swimInWater = function (grid) {
  // Approach: we can move from cell to another cell when both are in same height
  // so if the current cell holds value 0 and next cell holds value as 3, we need to wait atleast t=3 to move to that cell
  // At each cell, pick the cell with least elevation in depth and continue until we reach the destination cell
  // use a min-heap PQ and use a visited grid to mark the visited cells.

  const pq = new PQ();
  const rows = grid.length;
  const cols = grid[0].length;

  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );

  pq.enqueue(0, 0, grid[0][0]); // starts with (0,0) cell and it takes atleast grid[0][0] time to swim to (0,0) cell.
  visited[0][0] = true; // mark the starting cell as visited

  while (pq.size() > 0) {
    const {
      item: { row, col },
      depth,
    } = pq.dequeue();
    if (row === rows - 1 && col === cols - 1) return depth;
    // check the neighboring cells
    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        visited[nr][nc] = true;
        pq.enqueue(nr, nc, Math.max(depth, grid[nr][nc])); // enqueue the neighboring cell with the maximum depth
      }
    }
  }
};

console.log(
  swimInWater(
    (grid = [
      [0, 2],
      [1, 3],
    ])
  )
);

console.log(
  swimInWater(
    (grid = [
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ])
  )
);
