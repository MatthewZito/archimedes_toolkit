const rowWeights = arr => {
    let a = 0;
    let b = 0;
    Object.entries(arr).forEach(([i, val]) => {
        i % 2 === 0 ? a += val : b += val;
      });
    return [a, b];
  }

  /* 
    Prompt
    
    Given an array of positive integers (the weights of the people), return a new array/tuple of two integers, 
    where the first one is the total weight of team 1, and the second one is the total weight of team 2.
  */