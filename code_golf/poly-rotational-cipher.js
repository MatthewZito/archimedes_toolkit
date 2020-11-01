const tongues = (() => {
    const r = /[a-z]|[A-Z]/g,
        f = (c) => {
            c = String.fromCharCode(c.charCodeAt(0));
            switch (c) {
                case "a": case "e": case "i": case "o": case "u": case "y":
                case "A": case "E": case "I": case "O": case "U": case "Y":
                    return String.fromCharCode((c.charCodeAt(0) % 26) + 3);
                default:
                    return String.fromCharCode((c.charCodeAt(0) % 26) + 10);
            }
        };
    return str => str.replace(r, f);
})();

