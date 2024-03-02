import { uid } from "uid";

import { Action, ActionExecuteParams } from "../../core/websocket/action";
import { UpdateAdminCountAction } from "./update-admin-count.action";

export class AddUsersAction implements Action {
  execute(params: ActionExecuteParams): void {
    const id = uid();
    params.user.id = id;
    params.websocketUserClients.push(params.user);
    new UpdateAdminCountAction().execute(params);
  }
}
