const state = {};

const process = x => Object.keys(state).includes(x);

const resolve = (x, reset=false, o=state) => {
    if (reset) {
        o[x] = 0;
        return false;
    }
    o[x] += 1;
    if (o[x] === 20) { 
        return true;
    } 
    return false;
};

const assign = (x, o=state) => {
    o[x] = 1;
    return false;
};

const bruteForceDetected = ({sourceIP, successful}) => successful ? process(sourceIP) ? resolve(sourceIP, true) : false : process(sourceIP) ? resolve(sourceIP) : assign(sourceIP);
 
const bruteForceDetectedConcise = (attempts => ({successful, sourceIP}) => (attempts[sourceIP] = successful ? 0 : attempts[sourceIP] + 1 || 1) >= 20 )({});

/* 
    Prompt

    "Design a function which will block a login attempt if it comes from an IP address which failed to login 20 times in a row.

    The function will receive a single parameter - an object containing two properties:
    ```
    loginAttempt.sourceIP // the IP of the person trying to log in
    loginAttempt.successful // whether the log-in attempt succeeded
    ```
    "
*/