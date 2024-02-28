import { Server as HttpServer } from "http";
import { Server as WebSocketServer, WebSocket } from "ws";

import { WebSocketEvents } from "./enums";
import { ActionFactoryMethod } from "./websocket/action.factory";
import { CloseConnectionAction } from "./websocket/actions/close-connection.action";
import { UserClientStorage } from "./websocket/storages/user-client.storage";

export interface WebsocketUserClient extends WebSocket {
  isAdmin?: boolean;
  id: string;
}

export class WebSocketApp {
  private webSocketServer: WebSocketServer;

  constructor(httpServer: HttpServer) {
    this.webSocketServer = new WebSocketServer({ server: httpServer });
  }

  listen() {
    this.webSocketServer.on("connection", (user: WebsocketUserClient) => {
      console.log("Websocket server started ws://localhost:3000");
      ActionFactoryMethod(user);
      console.log("============================================");
      console.log("Usuários conectados");
      console.log(UserClientStorage.users);
      console.log("============================================");
      user.on(WebSocketEvents.MESSAGE, (message: string) => {
        ActionFactoryMethod(user, message);
      });
      user.on(WebSocketEvents.CLOSE, () =>
        new CloseConnectionAction().execute(user)
      );
    });
  }
}
