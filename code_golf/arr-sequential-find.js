const findInArray = (array, iterator) => {
    for (let [i, v] of Object.entries(array)) {
        if (iterator(v, Number(i))) {
            return Number(i);
        }
    }
  return -1;
};

/* 
  Prompt
  
  "We'll create a function that takes in two parameters:
  - a sequence (length and types of items are irrelevant)
  - a function (value, index) that will be called on members of the sequence and their index. 
    The function will return either true or false.
    
  Your function will iterate through the members of the sequence in order until the provided function returns true;
  at which point your function will return that item's index.
  If the function given returns false for all members of the sequence, your function should return -1."
*/