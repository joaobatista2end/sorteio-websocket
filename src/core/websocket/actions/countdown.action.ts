import { WebSocketActions } from "../../enums";
import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";

export class CountDownAction implements ActionStrategy {
  execute(user: WebsocketUserClient, data: any): Promise<void> {
    return new Promise((resolve) => {
      const count = 5;
      for (let i = 1; i <= count; i++) {
        setTimeout(() => {
          UserClientStorage.participants.forEach(
            (userClient: WebsocketUserClient) => {
              userClient.send(
                JSON.stringify({
                  end: count,
                  current: i,
                  action: WebSocketActions.COUNTDOWN,
                })
              );
            }
          );
          if (i == 5) resolve();
        }, i * 1000);
      }
    });
  }
}
