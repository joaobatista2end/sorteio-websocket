import { Action, ActionExecuteParams } from "../../core/websocket/action";

export class CloseConnectionAction implements Action {
  execute(params: ActionExecuteParams) {
    if (!params.websocketUserClients?.length) return;

    const userIndex = params.websocketUserClients.findIndex(
      (websocketClient) => websocketClient.id === params.user.id
    );

    if (params.websocketUserClients[userIndex] !== undefined) {
      params.websocketUserClients = params.websocketUserClients.slice(
        userIndex,
        1
      );
    }
  }
}
