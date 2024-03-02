import { AdminAction } from "../../domain/actions/admin.action";
import { CountDownAction } from "../../domain/actions/countdown.action";
import { DrawAction } from "../../domain/actions/draw.action";
import { UpdateAdminCountAction } from "../../domain/actions/update-admin-count.action";
import { WebSocketActions } from "../../domain/enums/websocket-actions.enum";
import { WebsocketUserClient } from "../../domain/types/websocket-user-client.type";
import { Action } from "./action";

export type ServerWebsocketActions =
  | WebSocketActions.ADMIN
  | WebSocketActions.DRAW
  | WebSocketActions.CLIENT_COUNT_UPDATE
  | WebSocketActions.COUNTDOWN;

const actions: Record<ServerWebsocketActions, Action> = {
  [WebSocketActions.ADMIN]: new AdminAction(),
  [WebSocketActions.DRAW]: new DrawAction(),
  [WebSocketActions.CLIENT_COUNT_UPDATE]: new UpdateAdminCountAction(),
  [WebSocketActions.COUNTDOWN]: new CountDownAction(),
};

export interface ActionFactoryExecuteParams {
  user: WebsocketUserClient;
  message?: string;
  websocketUserClients: Array<WebsocketUserClient>;
}

export class ActionFactory {
  public execute(params: ActionFactoryExecuteParams) {
    const data = JSON.parse(params?.message || "");
    const action = data?.action as ServerWebsocketActions;

    if (!action || !(action in actions)) {
      return;
    }

    actions[action].execute({
      data,
      user: params.user,
      websocketUserClients: params.websocketUserClients,
    });
  }
}
