// leetcode: https://leetcode.com/problems/balanced-binary-tree/description/

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
 * @return {boolean}
 */

// Note: defining a function within the fn is a good approach and reduces the execution time
// as inner fn will create a closure with the local variables and accesing them will be easier
// compared to access the variables defined in the outer scope.

var isBalanced = function (root) {
  // base condition: if the tree/root is empty(null) return early
  if (!root) return false;

  // define the helper function to get the height of node in the tree
  const getHeightOfNode = node => {
    // height of the leaf nodes/empty tree: 0
    if (!node) return 0;

    // recursively get the height of left & right child of the node
    const leftHeight = getHeightOfNode(node.left);
    const rightHeight = getHeightOfNode(node.right);

    // if the height of any child is -1; return -1
    if (leftHeight === -1 || rightHeight === -1) return -1;

    // if the diff in height between left & right child > , it isnt balanced binary tree
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    // calculate the absolute height: as height of the node will be
    // max of left and right child +1[ as the curr node also should be included in the height]
    return Math.max(leftHeight, rightHeight) + 1;
  };

  return getHeightOfNode(root) === -1 ? false : true;
};
