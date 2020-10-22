function Event() {
    const _handlers = [];
    this.subscribe = function (...args) {
        args.forEach(arg => {
            if (typeof arg === "function") {
                _handlers.push(arg);
            }
        })
    };

    this.unsubscribe = function (...args) {
        args.forEach(arg => {
            for (let i = _handlers.length - 1; i >= 0; i--) {
                if (_handlers[i] === arg) {
                    _handlers.splice(i, 1);
                    break;
                }
            }
        })
    };

    this.emit = function () {
        const tmp = _handlers.slice();
        tmp.forEach((handler) => handler.apply(this, arguments));
    };
};