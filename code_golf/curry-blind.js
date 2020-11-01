var encode = curry.bind(/[aeiou]/g, function(f){ return "aeiou".search(f) + 1 });
var decode = curry.bind(/[1-5]/g, function(f){ return "aeiou"[--f] });
function curry(f, s){ return s.replace(this, f) }