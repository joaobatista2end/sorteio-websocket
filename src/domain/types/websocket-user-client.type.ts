import { WebSocket } from "ws";

export interface WebsocketUserClient extends WebSocket {
  isAdmin: boolean;
  id: string;
}
