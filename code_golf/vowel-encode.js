const core = (str, encode) => {
    const d = "123456".split("");
    const c = "aeiou".split("");
    let x = [];
    str.split("").forEach(i => {
        encode ? c.includes(i) ? x.push(d[c.indexOf(i)]) : x.push(i) : d.includes(i) ? x.push(c[d.indexOf(i)]) : x.push(i);
    });
    return x.join("");
  };
  
const decode = string => core(string);
const encode = string => core(string, true);

  /* 
    Prompt 

    "Create a function called encode() to replace all the lowercase vowels in a given string with numbers according to the following pattern:
    Now create a function called decode() to turn the numbers back into vowels according to the same pattern shown above."
  */