import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";
import { UpdateAdminCountAction } from "./update-admin-count.action";

export class AddUsersAction implements ActionStrategy {
  execute(user: WebsocketUserClient, data: any): void {
    UserClientStorage.add(user);
    new UpdateAdminCountAction().execute(user, data);
    console.log("AddUsersAction executed");
  }
}
