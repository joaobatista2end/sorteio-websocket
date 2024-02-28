import { WebsocketUserClient } from "../../websocket-app";

export interface ActionStrategy {
  execute(user?: WebsocketUserClient, data?: any): any | Promise<void | any>;
}
