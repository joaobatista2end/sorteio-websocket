import { Server as HttpServer } from "http";
import { uid } from "uid";
import { Server as WebSocketServer } from "ws";

import { ActionFactory } from "../../core/websocket/action.factory";
import { AddUsersAction } from "../../domain/actions/add-users.action";
import { CloseConnectionAction } from "../../domain/actions/close-connection.action";
import { WebSocketEvents } from "../../domain/enums/websocket-events.enum";
import { WebsocketUserClient } from "../../domain/types/websocket-user-client.type";

export class WebSocketApp {
  private webSocketServer: WebSocketServer;
  private actionFactory: ActionFactory;
  private websocketUserClients: Array<WebsocketUserClient> = [];

  constructor(httpServer: HttpServer) {
    this.webSocketServer = new WebSocketServer({ server: httpServer });
    console.log("Websocket server started ws://localhost:3000");
    this.actionFactory = new ActionFactory();
  }

  connectUser(user: WebsocketUserClient) {
    user.id = user?.id || uid(4).toUpperCase();
    user.isAdmin = false;

    new AddUsersAction().execute({
      user,
      websocketUserClients: this.websocketUserClients,
    });
  }

  listen() {
    this.webSocketServer.on("connection", (user: WebsocketUserClient) => {
      this.connectUser(user);

      user.on(WebSocketEvents.MESSAGE, (message: string) => {
        this.actionFactory.execute({
          user,
          message,
          websocketUserClients: this.websocketUserClients,
        });
      });

      user.on(WebSocketEvents.CLOSE, () =>
        new CloseConnectionAction().execute({
          user,
          websocketUserClients: this.websocketUserClients,
        })
      );
    });
  }
}
