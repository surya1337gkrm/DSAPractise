// leetcode: https://leetcode.com/problems/merge-two-sorted-lists/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

var mergeTwoLists = function (list1, list2) {
  // Method 01: Using iteration - sort lists
  // if(list1===null) return list2

  // if(list2===null) return list1

  // const arr = []

  // while(list1){
  //     arr.push(list1.val)
  //     list1 = list1.next
  // }

  // while(list2){
  //     arr.push(list2.val)
  //     list2=list2.next
  // }

  // // push all values to ther array and then sort the array
  // arr.sort((a,b)=>a-b)

  // const resNode = new ListNode()
  // const result = resNode

  // // iterate through the array, and then create ListNode and update values & next node
  // arr.forEach((el,i)=>{
  //     result.val=el
  //     result.next= new ListNode()

  //     if(i!==arr.length-1){
  //         result = result.next
  //     }else{
  //         result.next=null
  //     }
  // })

  // return resNode

  // Method 02: compare two listNodes at once
  if (list1 === null) return list2;
  if (list2 === null) return list1;

  const resNode = new ListNode();
  const ptr = resNode;

  // iterate until list1 & lis2 are not empty
  // update the val & next values to the ptr ref

  while (list1 && list2) {
    if (list1.val < list2.val) {
      // update the current pointer value to the current list
      // and update the next pointer to the list as well
      ptr.next = list1;
      list1 = list1.next;
    } else {
      ptr.next = list2;
      list2 = list2.next;
    }

    // update thr current pointer ref to the current list and update lists next to null
    ptr = ptr.next;
    ptr.next = null;
  }

  if (list1) {
    ptr.next = list1;
  }

  if (list2) {
    ptr.next = list2;
  }

  // as ptr is referring to the resNode
  // resNode 0->list, so return resNode.next as the solution
  return resNode.next;
};
