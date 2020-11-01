// usage of Revealing Constructor / Module Pattern here enables instance versus business logic discretion
const Logger = (function () {
    
    /* Internal Methods and Properties */

    // standard color dict for extended options
    const _colorDict = {
        reset : "\x1b[0m",
        bright : "\x1b[1m",
        dim : "\x1b[2m",
        underscore : "\x1b[4m",
        blink : "\x1b[5m",
        reverse : "\x1b[7m",
        hidden : "\x1b[8m",
        /* Foreground Colors */
        black : "\x1b[30m",
        red : "\x1b[31m",
        green : "\x1b[32m",
        yellow : "\x1b[33m",
        blue : "\x1b[34m",
        magenta : "\x1b[35m",
        cyan : "\x1b[36m",
        white : "\x1b[37m",
        /* Background Colors */
        bgblack : "\x1b[40m",
        bgred : "\x1b[41m",
        bggreen : "\x1b[42m",
        bgyellow : "\x1b[43m",
        bgblue : "\x1b[44m",
        bgmagenta : "\x1b[45m",
        bgcyan : "\x1b[46m",
        bgwhite : "\x1b[47m",
    };

    // curry up to n args
    const curry = fn => {
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn.apply(this, args);
            } 
            else {
                return function(...args2) {
                    return curried.apply(this, args.concat(args2));
                };
            }
        };
    };
    // core, actionable method
    const log = (time, color, level, data) => console.log(`${_colorDict[color]}[${time.getHours()}:${time.getMinutes()}] [${level.toUpperCase()}] ${data}${_colorDict.reset}`);
    
    /* Preliminary Configurations */
    
    const builder = curry(log);
    // establish prefix default, currently set to private / non-configurable
    const timeStamper = builder(new Date());

    // modifiable from outer ctx
    const Constructor = function(levels) {
        Object.entries(levels).filter(([level]) => typeof level === "string").forEach(([level, color]) => {
            // assign to proto in lieu of as prop for performance
            // proto methods are by ref, ergo not recreated per instance === less memory usage
            return Constructor.prototype[level] = timeStamper(color.toLowerCase(), level);
        });
    };

    return Constructor;

})();

const logger = new Logger({"warn": "yellow", "info": "green", "error": "red"});

logger.warn("a warning");
logger.info("some data");
logger.error("an exception");