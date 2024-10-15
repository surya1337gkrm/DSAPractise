// leetcode: https://leetcode.com/problems/linked-list-cycle/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

var hasCycle = function(head) {

    // approach 01: Using iterative approach using hashmap
    // note: hash map can have objects as keys

    // Time complexity: O(n) as we are iterating over the list
    // Space complexity: O(n) as we are storing all nodes in a map

    // base condition: return false(no cycle) if head is null or next is poiting to null
    if(!head || head.next) return false

    const map = new Map()

    while(head){
        // if the node already visited, return true | cycle exists
        if(map.get(head)) return true 
        else{
            map.set(head,true)
            head = head.next
        }
    }
    // reached the end of the linked list
    return false


    // Approach 02: using slow-fast pointer approach
    // Time complexity: O(n) as we are iterating over the list
    // Space complexity: O(1) as we arent storing anything except for the pointers
    // base condition
    if(!head || !head.next) return false

    // initiate two pointers: slow & fast pointer
    // For one step of slow pointer, fast will be updated with 2 steps
    // ideally, slow and fast pointers should'nt meet but if they arrive to 
    // the same node, that means theres a cycle in the linked list
    let slow=head,fast=head
    while(fast && fast.next){
        slow=slow.next // one step for slow pointer
        fast=fast.next.next // two steps for fast pointer

        if(slow===fast) return true
    }

    return false

}