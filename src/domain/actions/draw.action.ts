import { Action, ActionExecuteParams } from "../../core/websocket/action";
import { WebSocketActions } from "../enums/websocket-actions.enum";
import { WebsocketUserClient } from "../types/websocket-user-client.type";
import { CountDownAction } from "./countdown.action";

export class DrawAction implements Action {
  async execute(params: ActionExecuteParams): Promise<void> {
    const code = params.data?.code || "Resultado inválido";
    await new CountDownAction().execute(params);
    this.boradcast(params.websocketUserClients, code);
  }

  private boradcast(
    websocketUserClients: Array<WebsocketUserClient>,
    code: string
  ) {
    const participants = websocketUserClients.filter(
      (websocketUserClient) => !websocketUserClient.isAdmin
    );

    const participantsQuantity = participants.length;
    const winnerIndex = Math.floor(Math.random() * participantsQuantity);
    const winnerUser = participants[winnerIndex];

    websocketUserClients.forEach((userClient: WebsocketUserClient) => {
      let result = JSON.stringify({
        action: WebSocketActions.RESULT,
        status: "youlose",
      });

      if (userClient.id === winnerUser.id) {
        result = JSON.stringify({
          action: WebSocketActions.RESULT,
          status: "youwin",
          code,
        });
      }
      userClient.send(result);
    });
  }
}
