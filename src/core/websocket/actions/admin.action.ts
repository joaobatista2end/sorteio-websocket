import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";

export class AdminAction implements ActionStrategy {
  execute(user: WebsocketUserClient, data: any): void {
    user.isAdmin = true;
    UserClientStorage.add(user);
    console.log("AdminAction executed");
  }
}
