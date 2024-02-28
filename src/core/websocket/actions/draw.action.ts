import { WebSocketActions } from "../../enums";
import { WebsocketUserClient } from "../../websocket-app";
import { UserClientStorage } from "../storages/user-client.storage";
import { ActionStrategy } from "./action";

export class DrawAction implements ActionStrategy {
  execute(user: WebsocketUserClient, data: any): void {
    this.notifyResult(this.generateWinner());
  }

  private generateCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  private generateWinner() {
    return UserClientStorage.participants[
      Math.floor(Math.random() * UserClientStorage.participantsCount)
    ];
  }

  private notifyResult(winner: WebsocketUserClient) {
    const code = this.generateCode();
    UserClientStorage.participants.forEach(
      (userClient: WebsocketUserClient) => {
        let result = JSON.stringify({
          action: WebSocketActions.RESULT,
          status: "youlose",
        });
        if (userClient === winner) {
          result = JSON.stringify({
            action: WebSocketActions.RESULT,
            status: "youwin",
            code,
          });
        }
        userClient.send(result);
      }
    );
  }
}
