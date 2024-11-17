// leetcode:https://leetcode.com/problems/path-sum/description/


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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    // Approach: Use DFS
    if(root===null) return false
    // if we reached a leaf node and leaf value is equal to targetSum [updated] return true
    if(!root.left && !root.right && (targetSum===root.val)) return true

    // call the same function recursively
    return hasPathSum(root.left,targetSum-root.val) || hasPathSum(root.right,targetSum-root.val)
};