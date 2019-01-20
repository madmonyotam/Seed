



module.exports = {
    name: 'SimpleEmit',
    extend: {
        on(eventName, listener) {
            var seed = this;

            var event = seed.events[eventName];
            if (!event) {
                event = seed.events[eventName] = [];
            }
            event.push(listener);
        },
    
        off(eventName, listener) {
            var seed = this;

            if (!eventName) {
                seed.events = {};
            }
            if (!listener) {
                delete seed.events[eventName];
            }

            var event = seed.events[eventName];
            if (event) {
                event = seed.events[eventName] = event.filter((l) => {
                    return (l !== listener);
                });
                if (!event.length) delete seed.events[eventName];
            }
        },
    
        emit(eventName) {
            var seed = this;

            var event = seed.events[eventName];
            if (!event) return;
            var args = [].slice.call(arguments, 1);

            for (var i = 0; i < event.length; i++) {
                let cont = event[i].apply(null, args);
                if (cont === false) break;
            }
        },

    }
};