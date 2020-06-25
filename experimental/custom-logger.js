const chalk = require("chalk");

module.exports = {
    info: (...args) => console.log(chalk.cyan("[INFO] - [i] "), chalk.yellow(...args)),
    warn: (...args) => console.log(chalk.magenta("[WARN] - [*] "), chalk.yellow(...args)),
    error: (...args) => console.log(chalk.red("[ERR] - [-] "), chalk.yellow(...args)),
    success: (...args) => console.log(chalk.green("[ACK] - [+] "), chalk.yellow(...args)),
};