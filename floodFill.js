// leetcode: https://leetcode.com/problems/flood-fill/description/

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */

var floodFill = function(image, sr, sc, color) {
    // return the same image if the color and color at [sr][sc] is same.
    if(image[sr][sc]===color) return image
    
    // pass the original color to the recursive fn: 
    fill(image,sr,sc,color,image[sr][sc])
    
    return image
}

// helper function: recursive fn
var fill = function(image,sr,sc,color,ogColor){
    // base condition: as we call this fn recursively and access the color using sr & sc
    // ... sr & sc values should be withing the image boundaries
    if(sr<0 || sc<0 || sr>=image.length || sc>=image[0].length) return

    // as we shouldnt change the color if the block has the og color
    if(image[sr][sc]!==ogColor) return

    // update the color
    image[sr][sc]=color

    // call fn recursively for top,right,bottom,left
    // top
    fill(image,sr-1,sc,color,ogColor)
    //right
    fill(image,sr,sc+1,color,ogColor)
    //bottom
    fill(image,sr+1,sc,color,ogColor)
    //left
    fill(image,sr,sc-1,color,ogColor)
}