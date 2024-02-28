import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";

export class CloseConnectionAction implements ActionStrategy {
  execute(user: WebsocketUserClient) {
    UserClientStorage.remove(user);
  }
}
