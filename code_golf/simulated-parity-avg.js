const digitsAverage = input => {
    if (input < 10) { 
        return input; 
    }
    
    while (input > 9) {
        input = String(input); 
        let arr = [];
        for (let i = 0; i < input.length - 1; i++) {
            arr.push(Math.round((+input[i] + +input[i + 1]) / 2)); 
        }
        input = parseInt(arr.join(""));
        if (input < 10) {
            return input;
        }
    }
};

/* 
    Prompt
    
    "Given an integer, take the (mean) average of each pair of consecutive digits. 
    Repeat this process until you have a single integer, then return that integer.

    Note: if the average of two digits is not an integer, round the result up
    (e.g. the average of 8 and 9 will be 9)."

*/