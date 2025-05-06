// With sorted array enqueue and dequeue operations takes O(n) TC
// With min heap approach enqueue and dequeue takes O(n)

// in a priority queue, root node will be the smallest(priority value)
// smaller the priority value - higher the priority

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  // private methods
  #getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  #getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  #getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // will be used whenever a new element is inserted
  #bubbleUp(i) {
    // in a min heap tree, parent element priority value should be the minimum value of the tree
    // we dont have to maintain any order between the left & right child.
    // make sure for each sub-tree, parent priority is the minimum value of the sub-tree

    // get the parent index of the current node
    let parentIndex = this.#getParentIndex(i);
    // now we have to check if the ith node priority is greater than the parent node, if yes skip
    // if not, we have to swap the parent with the ith node and we have to continue this process
    // until ith node is added to the right position in the min-heap

    while (i > 0 && this.heap[i].priority < this.heap[parentIndex].priority) {
      [this.heap[i], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[i],
      ]; // swap the parent with the ith node
      // now check the same condition upwards
      i = parentIndex; // update the index to the parent index
      parentIndex = this.#getParentIndex(i); // update the parent index to the new parent index
    }
  }

  // will be used whenever an element is removed from the priority queue
  #bubbleDown(i) {
    // check if left & right child nodes has greater priority value than the parent
    // if yes, swap the parent with the left or right child and we have to continue this process
    const leftChildIndex = this.#getLeftChildIndex(i);
    const rightChildIndex = this.#getRightChildIndex(i);
    let smallest = i; // initially assume the smallest element is the current node

    // now check if the left node has greater priority and index is valid
    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex].priority < this.heap[smallest].priority
    ) {
      smallest = leftChildIndex; // update the smallest index to the left child index
    }

    // now check if the right node has greater priority and index is valid
    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex].priority < this.heap[smallest].priority
    ) {
      smallest = rightChildIndex; // update the smallest index to the right child index
    }

    // now check if the smallest value isnt same as the initial parent node
    // if not then update the parent node with the smallest node and continue this process until the end of the heap
    if (smallest !== i) {
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]]; // swap the parent with the smallest node
      // now check the same condition downwards
      this.#bubbleDown(smallest); // update the index to the smallest index
    }
  }

  // TC: O(log n) for enqueue and dequeue operations
  enqueue(element, priority) {
    const node = { element, priority };
    // push the node to the heap end
    this.heap.push(node);
    // now re-arrange the heap to maintain the min-heap property
    this.#bubbleUp(this.heap.length - 1); // as we pushed the new element at the end of the heap
  }

  dequeue() {
    // if the heap is empty return null and if the heap has only one element, return that element
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    // in the min heap, first element will be the element with lowest priority value
    const min = this.heap[0];
    // replace the first element with the last element of the heap
    this.heap[0] = this.heap.pop();
    // now re-arrange the heap to maintain the min-heap property
    // #bubbleDown method will re-arrange the heap
    this.#bubbleDown(0);
    return min; // return the min element
  }

  // print the heap
  printPQ() {
    console.log(this.heap);
  }

  // returns the min element without deleting from the heap
  peek() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

const pq = new MinPriorityQueue();
pq.enqueue(10, 2);
pq.enqueue(15, 1);
pq.enqueue(15, 2);
pq.enqueue(25, 3);
pq.printPQ();
console.log(pq.dequeue());
pq.enqueue(40, 1);
console.log(pq.dequeue());
pq.printPQ();
