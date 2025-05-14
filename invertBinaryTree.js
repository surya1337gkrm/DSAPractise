// leetcode: https://leetcode.com/problems/invert-binary-tree/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

var invertTree = function (root) {
  // As the nodes length is length in the question, we can use recursion
  // but if the length of the nodes increases, we might eun into stack overflow issue with the recursion approach.
  // in that case an iterative approach like dfs is better than recursion.

  // Method 01: Recursion

  // base condition: return Null if the node is empty
  if (root === null) {
    return root;
  }

  // swap the left & right child nodes
  [root.right, root.left] = [root.left, root.right];

  // call invertTree fn recursively for each child node

  invertTree(root.left);
  invertTree(root.right);

  return root;

  // Method 02: Iterative approach[dfs]
  // better approach for skewed binary trees
  // Example:
  //                       8
  //                      /
  //                     7
  //                    /
  //                   6
  //                  /
  //                 5
  if (root === null) return root;

  // initiate a stack with root
  const stack = [root];

  // now iterate until the stack is empty
  // get the last item from the stack and inverse the child elements of the item
  // if the child elements arent empty, push them to the stack
  // this process continues until the stack isEmpty.

  while (stack.length) {
    const node = stack.pop();
    if (node) {
      [node.right, node.left] = [node.left, node.right];

      // push the child elements to stack if they are not empty
      if (node.right || node.left) {
        stack.push(node.right, node.left);
      }
    }
  }
  return root;
};
