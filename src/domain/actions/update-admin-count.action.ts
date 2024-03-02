import { WebSocket } from "ws";

import { Action, ActionExecuteParams } from "../../core/websocket/action";
import { WebSocketActions } from "../enums/websocket-actions.enum";

export class UpdateAdminCountAction implements Action {
  execute(params: ActionExecuteParams): void {
    const adminIndex = params.websocketUserClients.findIndex(
      (websocketUserClient) => websocketUserClient.isAdmin
    );

    if (adminIndex < 0) return;

    const admin = params.websocketUserClients[adminIndex];

    if (admin?.readyState === WebSocket.OPEN) {
      admin.send(
        JSON.stringify({
          action: WebSocketActions.CLIENT_COUNT_UPDATE,
          count: params.websocketUserClients.filter(
            (websocketUserClient) => !websocketUserClient.isAdmin
          ).length,
        })
      );
    }
  }
}
