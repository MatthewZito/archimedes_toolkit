const unique = (i,_,a) => !(a.includes(i) && a.includes(-i));
const solve = arr => arr.filter(unique)[0];

/* 
    Prompt
    
    "You will be given an array of integers whose elements have both a negative and a positive value, 
    except for one integer that is either only negative or only positive. Your task will be to find that integer."
*/