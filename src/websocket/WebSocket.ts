const BASE_URL = "ws://127.0.0.1:8000";

export const initSocket = (dir: string): WebSocket => {
  return new WebSocket(BASE_URL + dir);
};
