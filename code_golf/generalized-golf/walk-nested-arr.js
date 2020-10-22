// this will find gold in a deep bucket, no matter how nested
// s/o to all my fellow prospectors out there; this is for you <3

const checkTheBucket = bucket => {
    if (!bucket.length) {
        return false;
    }
    let isGold;
    bucket.some(function walk(path) {
        return function (item, i) {
            if (item === "gold") {
                    return isGold = true;    
            }
            else if (Array.isArray(item)) {
                return item.some(walk(path.concat(i)));
            }
            else {
                return isGold = false;
            }
        };
    }([]));
    return isGold;
};

/* 
    Prompt
    
    "A western man is trying to find gold in a river. To do that, he passes a bucket through the river's soil and then checks if it contains any gold. 
    However, he could be more productive if he wrote an algorithm to do the job for him.
    So, you need to check if there is gold in the bucket, and if so, return True/true. If not, return False/false."

*/