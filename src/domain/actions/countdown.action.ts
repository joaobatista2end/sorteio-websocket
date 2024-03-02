import { Action, ActionExecuteParams } from "../../core/websocket/action";
import { WebSocketActions } from "../enums/websocket-actions.enum";
import { WebsocketUserClient } from "../types/websocket-user-client.type";

export class CountDownAction implements Action {
  execute(params: ActionExecuteParams): Promise<void> {
    return new Promise((resolve) => {
      const count = 5;
      for (let i = 1; i <= count; i++) {
        setTimeout(() => {
          this.boradcast(params.websocketUserClients, {
            end: count,
            current: i,
            action: WebSocketActions.COUNTDOWN,
          });

          if (i == 5) resolve();
        }, i * 1000);
      }
    });
  }

  private boradcast(
    websocketUserClients: Array<WebsocketUserClient>,
    data: any
  ) {
    websocketUserClients.forEach((userClient: WebsocketUserClient) => {
      userClient.send(JSON.stringify(data));
    });
  }
}
