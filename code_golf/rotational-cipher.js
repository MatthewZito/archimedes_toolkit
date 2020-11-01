const alpha = "abcdefghijklmnopqrstuvwxyz".split("");

const mirror = (code, cipher) => {
    if (cipher === "") {
        return code;
    }
    const control = cipher ? cipher.split("") : alpha;
    const mirror = control.slice().reverse();
    let res = "";
    code.split("").forEach(char => {
        char = char.toLowerCase();
        const index = control.indexOf(char);
        index >= 0 ? res +=  mirror[index] : res += char;
    });
    return res;
};
