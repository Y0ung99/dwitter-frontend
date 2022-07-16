import socket from 'socket.io-client';

export default class Socket {
    constructor(baseURL, getAcessToken) {
        this.io = socket(baseURL, {
            auth: (cb) => cb({ token: getAcessToken() }),
        })

        this.io.on('connect_error', err => {
            console.log('socket error', err.message);
        })
    }

    onSync(event, callback) {
        if (!this.io.connected) {
            this.io.connect();
        }

        this.io.on(event, (message) => callback(message));
        return () => this.io.off(event);
    }
}