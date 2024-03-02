import { WebsocketUserClient } from "../../domain/types/websocket-user-client.type";

export interface ActionExecuteParams {
  user: WebsocketUserClient;
  data?: any;
  websocketUserClients: Array<WebsocketUserClient>;
}

export interface Action {
  execute(params: ActionExecuteParams): any | Promise<void | any>;
}
