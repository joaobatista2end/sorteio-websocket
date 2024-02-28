import { WebSocket } from "ws";

import { WebSocketActions } from "../../enums";
import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";

export class UpdateAdminCountAction implements ActionStrategy {
  execute(user: WebsocketUserClient, data: any): void {
    const admin = UserClientStorage?.admin();

    if (admin?.readyState === WebSocket.OPEN) {
      admin.send(
        JSON.stringify({
          action: WebSocketActions.CLIENT_COUNT_UPDATE,
          count: UserClientStorage.participantsCount,
        })
      );
      console.log("UpdateAdminCountAction is executed");
    }

    console.log("UpdateAdminCountAction not executed", { admin });
  }
}
