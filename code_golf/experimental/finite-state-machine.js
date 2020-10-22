const traverseTCPStates = eventList => {
    let state = "CLOSED";
    const _states = {  
        "CLOSED" : [
                { event: "APP_PASSIVE_OPEN", output: "LISTEN" }, 
                { event: "APP_ACTIVE_OPEN",  output: "SYN_SENT"}
              ],
        "LISTEN": [ 
                { event: "RCV_SYN", output: "SYN_RCVD" }, 
                { event: "APP_SEND", output: "SYN_SENT" },
                { event: "APP_CLOSE", output: "CLOSED" } 
              ], 
        "SYN_RCVD": [
                { event: "APP_CLOSE", output: "FIN_WAIT_1" }, 
                { event: "RCV_ACK", output: "ESTABLISHED" } 
              ],
        "SYN_SENT": [ 
                { event: "RCV_SYN", output: "SYN_RCVD" }, 
                { event: "RCV_SYN_ACK", output: "ESTABLISHED" }, 
                { event: "APP_CLOSE", output: "CLOSED" } 
              ], 
        "ESTABLISHED": [ 
                { event: "APP_CLOSE", output: "FIN_WAIT_1" }, 
                { event: "RCV_FIN", output: "CLOSE_WAIT" } ], 
        "FIN_WAIT_1": [ 
                { event: "RCV_FIN", output: "CLOSING" },
                { event: "RCV_FIN_ACK", output: "TIME_WAIT" },
                { event: "RCV_ACK", output: "FIN_WAIT_2" } ], 
        "CLOSING": [ 
                { event: "RCV_ACK", output: "TIME_WAIT" } 
              ], 
        "FIN_WAIT_2": [
                { event: "RCV_FIN", output: "TIME_WAIT" } 
              ],
        "TIME_WAIT": [
                { event: "APP_TIMEOUT", output: "CLOSED" } 
              ], 
        "CLOSE_WAIT": [
                { event: "APP_CLOSE", output: "LAST_ACK" } 
              ],
        "LAST_ACK": [
                { event: "RCV_ACK", output: "CLOSED" } 
              ]
          };

    eventList.forEach(event =>{
        if (event !== "ERROR" && _states[state]) {
            const next = _states[state].find(tx => tx.event === event);
            if (typeof next !== "undefined" && next != null) {
                state = next.output;
            } 
            else {
                state = "ERROR";
            }
        };
    });
    return state;
};


// const defaultInitialState = 'CLOSED';

// const state = nextValidStates =>
//   event => nextValidStates[event] || 'ERROR';

// const TcpStates = {
//     CLOSED: state({ APP_PASSIVE_OPEN: 'LISTEN', APP_ACTIVE_OPEN: 'SYN_SENT' }),
//     LISTEN: state({ RCV_SYN: 'SYN_RCVD', APP_SEND: 'SYN_SENT', APP_CLOSE: 'CLOSED' }),
//     SYN_RCVD: state({ APP_CLOSE: 'FIN_WAIT_1', RCV_ACK: 'ESTABLISHED' }),
//     SYN_SENT: state({ RCV_SYN: 'SYN_RCVD', RCV_SYN_ACK: 'ESTABLISHED', APP_CLOSE: 'CLOSED' }),
//     ESTABLISHED: state({ APP_CLOSE: 'FIN_WAIT_1', RCV_FIN: 'CLOSE_WAIT' }),
//     FIN_WAIT_1: state({ RCV_FIN: 'CLOSING', RCV_FIN_ACK: 'TIME_WAIT', RCV_ACK: 'FIN_WAIT_2' }),
//     CLOSING: state({ RCV_ACK: 'TIME_WAIT' }),
//     FIN_WAIT_2: state({ RCV_FIN: 'TIME_WAIT' }),
//     TIME_WAIT: state({ APP_TIMEOUT: 'CLOSED' }),
//     CLOSE_WAIT: state({ APP_CLOSE: 'LAST_ACK' }),
//     LAST_ACK: state({ RCV_ACK: 'CLOSED' }),
//     ERROR: state({})
// };

// const handleTcpEvent = (stateName, event) =>
//   TcpStates[stateName](event);

// const traverseTCPStates = events =>
//   events.reduce(handleTcpEvent, defaultInitialState);