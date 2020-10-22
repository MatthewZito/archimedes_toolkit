const evalCase = (s) => {
    let upper = 0;
    let lower = 0;
  
    for (char of s) {
        char === char.toUpperCase() ? upper++ : lower++;
    };
    return [upper, lower]
};
  
const solve = (s) => {
    return (([upper, lower]) => 
        (upper > lower ? s.toUpperCase() : s.toLowerCase()))(evalCase(s));
};

/* 
    Prompt

    "You will be given a string that may have mixed uppercase and lowercase letters and your task is to convert
    that string to either lowercase only or uppercase only based on:
        - make as few changes as possible.
        - if the string contains equal number of uppercase and lowercase letters, convert the string to lowercase."
*/