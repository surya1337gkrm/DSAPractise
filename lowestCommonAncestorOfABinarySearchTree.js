// leetcode: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // approach 01: Iterative
  // Time complexity: O(log n) -> As we are only iterating through the height of the tree(H=log n)
  // Space complexity: O(1)
  while (root) {
    // if the p and q values are less than the root node value
    // them p and q are part left child of the root node
    // and similarly, if the p and q values are greater than the root node value
    // they are part right child of the root node
    if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else {
      // in this case: p & q lies in left and right child
      return root;
    }
  }

  // Approach 02: recursive
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  return root;
};
