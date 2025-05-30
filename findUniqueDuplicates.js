// Problem: Given a list of positive integers, identify the duplicate values and return a list of unique duplicates in a sorted order

const arr = [4, 2, 3, 4, 8, 8, 1, 2, 3, 6, 7, 8, 9];

const findDuplicatesV1 = arr => {
  // Approach: using a set to store unique elements and then iterate through the array to find duplicates
  // TC: O(n+KlogK) - considering k is the unique duplicate elements
  const set = new Set();
  const result = new Set();
  for (const num of arr) {
    if (set.has(num)) {
      result.add(num);
    } else set.add(num);
  }

  return result.size === 0 ? [-1] : Array.from(result).sort((a, b) => a - b);
};
console.log('Version 01:', findDuplicatesV1(arr));

// Version 02: using hashmap
const findDuplicatesV2 = arr => {
  // Approach: using a hashmap to store the frequency of each element and then iterate through the hashmap to find duplicates
  // TC: O(n+KlogK) - considering k is the unique duplicate elements and KlogK for sorting
  const freqMap = new Map();
  const result = [];
  for (const num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  for (const [key, value] of freqMap) {
    if (value > 1) result.push(key);
  }
  return result.length === 0 ? [-1] : result.sort((a, b) => a - b);
};
console.log('Version 02:', findDuplicatesV2(arr));

const findDuplicatesV3 = arr => {
  // Version 03: Using an array of fixed size of max element
  // TC: O(n+K) - considering K is the unique duplicate elements - we dont need to sort the result array
  // as its the result array is ordered by index and the count is updated
  const max = Math.max(...arr);
  const countArr = new Array(max + 1).fill(0);
  const result = [];
  for (const num of arr) {
    countArr[num]++;
  }
  for (let i = 0; i < countArr.length; i++) {
    if (countArr[i] > 1) {
      result.push(i);
    }
  }
  return result.length === 0 ? [-1] : result;
};
console.log('Version 03:', findDuplicatesV3(arr));

const findDuplicatesV4 = arr => {
  // version 04: pre sort the given array and use two pointer approach
  arr.sort((a, b) => a - b);
  const result = [];
  let i = 0;
  while (i < arr.length - 1) {
    if (arr[i] === arr[i + 1]) {
      result.push(arr[i]);
      // skip till next non-duplicate element found
      while (i < arr.length - 1 && arr[i] === arr[i + 1]) {
        i++;
      }
    }
    i++;
  }
  return result.length === 0 ? [-1] : result;
};
console.log('version 04:', findDuplicatesV4(arr));

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
    while (i > 0 && this.heap[i] < this.heap[parentIndex]) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ];
      i = parentIndex;
      parentIndex = this.#getParentIndex(i);
    }
  }

  #bubbleDown(i) {
    const leftIndex = this.#getLeftChildIndex(i);
    const rightIndex = this.#getRightChildIndex(i);
    let smallest = i;

    if (
      leftIndex < this.heap.length - 1 &&
      this.heap[leftIndex] < this.heap[smallest]
    ) {
      smallest = leftIndex;
    }

    if (
      rightIndex < this.heap.length - 1 &&
      this.heap[rightIndex] < this.heap[smallest]
    ) {
      smallest = rightIndex;
    }

    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      this.#bubbleDown(smallest);
    }
  }

  enqueue(element) {
    this.heap.push(element);
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

const findDuplicatesV5 = arr => {
  // use a priority queue(min-heap)
  // TC: O(nlogn) - considering n is the number of elements in the array
  // as we are using a min-heap to store the elements and we are removing the smallest element from the heap
  const pq = new PQ();
  for (const num of arr) {
    pq.enqueue(num);
  }
  let prev = null;
  const result = [];
  while (pq.size() > 0) {
    const curr = pq.dequeue();
    if (
      curr === prev &&
      (result.length === 0 || result[result.length - 1] !== curr)
    ) {
      result.push(curr);
    }
    prev = curr;
  }
  return result.length === 0 ? [-1] : result;
};
console.log('Version 05:', findDuplicatesV5(arr));
