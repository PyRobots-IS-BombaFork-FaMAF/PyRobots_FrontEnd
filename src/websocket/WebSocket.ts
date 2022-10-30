const BASE_URL = "ws://127.0.0.1:8000";

export const initSocket = (dir : string) : WebSocket => {
    return new WebSocket(BASE_URL + dir); 
} 


export const message = (socket : WebSocket) => {
    socket.onmessage = (event) => {
        console.log(`[message] Data received from server: ${event.data}`);
    }
}


