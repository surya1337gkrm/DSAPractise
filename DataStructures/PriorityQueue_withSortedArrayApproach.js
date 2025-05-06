// Approach 01: Using sorted array approach
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  // enqueue TC: O(n) as we have to iterate through the items and shift the array
  enqueue(element, priority) {
    const node = { element, priority };
    if (this.queue.length === 0) {
      this.queue.push(node);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        // if the inserted element priority is less than the current element priority, 
        // we need to insert it at the correct position
        if (priority < this.queue[i].priority) {
          this.queue.splice(i, 0, node);
          added = true;
          break;
        }
      }
      if (!added) this.queue.push(node);
    }
  }

  // TC: O(n) as we remove the first element and shift the entire array
  dequeue() {
    return this.queue.shift()?.element ?? null;
  }

  printQueue() {
    console.log(this.queue);
  }
}

const pq = new PriorityQueue();
pq.enqueue(10, 2);
pq.enqueue(15, 1);
pq.enqueue(15, 2);
pq.enqueue(25, 3);
pq.printQueue();
console.log(pq.dequeue())
pq.enqueue(40,1)
console.log(pq.dequeue())
pq.printQueue()