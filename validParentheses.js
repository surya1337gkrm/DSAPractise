// leetcode: https://leetcode.com/problems/valid-parentheses/description/


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // [,{,( : if the curr character is this character, push to the stack
    // if any other character, pop the character from the stack and check if it is closing char for the pooped char

    const stack =[]

    const map ={
        '{':'}',
        '[':']',
        '(':')'
    }

    for(let i = 0;i<s.length;i++){
        if(s[i]==='{' || s[i]==='[' || s[i]==='(') {
            stack.push(s[i])
        }else{
            const last = stack.pop()
            if(map[last]!==s[i]) return false
        }
    }
    
    return stack.length===0
}