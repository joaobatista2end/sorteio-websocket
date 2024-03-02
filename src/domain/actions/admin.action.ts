import { Action, ActionExecuteParams } from "../../core/websocket/action";

export class AdminAction implements Action {
  execute(params: ActionExecuteParams): void {
    params.user.isAdmin = true;
    const adminIndex = params.websocketUserClients.findIndex(
      (websocketUserClient) => {
        websocketUserClient.id = params.user.id;
      }
    );
    params.websocketUserClients[adminIndex] = params.user;
  }
}
