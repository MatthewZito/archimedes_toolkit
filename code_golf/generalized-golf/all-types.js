const type = obj => Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, "$1").toLowerCase();
