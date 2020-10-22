const remove = (s, target) => {
    if (s[s.length - 1] !== target) {
        return s;
    }
    let x = 0;  
    for (let i in s) {
        if (s[i] == target) {
            break;
        }
        x += 1;
    }
    return s.slice(0, x) ? s.slice(0, x) : remove(s.slice(x + 1, s.length), target)
}

// removes all occurrences of target char from string if and only if the string ends in said target


const remove = str => {
    let arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] === "!") {
            arr.pop();
        }
        else {
            break;
        }
    }
    return arr.join("");
}

/*
    Prompt
    "Remove all exclamation marks from the end of sentence."

*/