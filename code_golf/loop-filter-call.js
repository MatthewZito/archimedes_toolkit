const mostMoney = students => {
    const aggregated = students.map(({name, fives, tens, twenties}) => {
        return {[name]: fives * 5 + tens * 10 + twenties * 20};
    });
    const res = aggregated.filter(i => 
        Object.values(i)[0] === Math.max.apply(Math, aggregated.map(
            (n) => Object.values(n)[0])));
    return res.length > 1 ? "all" : Object.keys(res[0])[0]; 
};

/* 
    Prompt 

    "You're going on a trip with some students and it's up to you to keep track of how much money each Student has. A student is defined like this:
    
    ```
    class Student {
        constructor(name, fives, tens, twenties) {
            this.name = name;
            this.fives = fives;
            this.tens = tens;
            this.twenties = twenties;
        };
    };
    ```
    As you can tell, each Student has some fives, tens, and twenties. 
    Your job is to return the name of the student with the most money. 
    If every student has the same amount, then return "all"."

*/