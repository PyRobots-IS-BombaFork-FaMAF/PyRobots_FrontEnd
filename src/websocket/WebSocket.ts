const BASE_URL = "ws://127.0.0.1:8000";

export const initSocket = (dir : string) : WebSocket => {
    return new WebSocket(BASE_URL + dir); 
} 


export const message = (socket : WebSocket) => {
    socket.onmessage = (event) => {
        try {
            console.log(event.data.players);
            console.log(JSON.parse(event.data));
            console.log(`[message] Data received from server: ${event.data}`);
        }catch(err){

        }
        
    }
}


