import { WebSocketActions } from "../enums";
import { WebsocketUserClient } from "../websocket-app";
import { ActionStrategy } from "./actions/action";
import { AddUsersAction } from "./actions/add-users.action";
import { AdminAction } from "./actions/admin.action";
import { CountDownAction } from "./actions/countdown.action";
import { DrawAction } from "./actions/draw.action";
import { UpdateAdminCountAction } from "./actions/update-admin-count.action";

export type ServerWebsocketActions =
  | WebSocketActions.ADMIN
  | WebSocketActions.DRAW
  | WebSocketActions.CLIENT_COUNT_UPDATE
  | WebSocketActions.COUNTDOWN;

const actions: Record<ServerWebsocketActions, ActionStrategy> = {
  [WebSocketActions.ADMIN]: new AdminAction(),
  [WebSocketActions.DRAW]: new DrawAction(),
  [WebSocketActions.CLIENT_COUNT_UPDATE]: new UpdateAdminCountAction(),
  [WebSocketActions.COUNTDOWN]: new CountDownAction(),
};

export const ActionFactoryMethod = (
  user: WebsocketUserClient,
  msg: string = "{}"
) => {
  const data = JSON.parse(msg);
  const action = data?.action as ServerWebsocketActions;
  console.log("******************************");
  console.log({ data, action });

  if (!action || !(action in actions)) {
    new AddUsersAction().execute(user, null);
    return;
  }
  actions[action].execute(user, data);
  console.log("******************************");
};
