import * as fs from "fs";
import * as path from "path";
import { uid } from "uid";

import { WebsocketUserClient } from "../../websocket-app";

const dataFilePath = path.join(__dirname, "userClients.json");

export interface User {
  id: string;
  isAdmin: boolean;
}

export class UserClientStorage {
  private static _userClients: Array<WebsocketUserClient> = [];
  public static users: Array<User> = UserClientStorage.load();

  public static get participants(): Array<WebsocketUserClient> {
    return UserClientStorage._userClients.filter(
      (userClientItem) => !userClientItem.isAdmin
    );
  }

  public static get participantsCount(): number {
    return UserClientStorage.users.length;
  }

  public static admin(): WebsocketUserClient | undefined {
    return UserClientStorage._userClients.filter(
      (userClientItem) => userClientItem.isAdmin
    )?.[0];
  }

  public static add(userClient: WebsocketUserClient): string {
    let user: User = {
      id: userClient?.id || uid(),
      isAdmin: userClient?.isAdmin || false,
    };

    const userExists = UserClientStorage.users.findIndex(
      ({ id }) => id === user.id
    );

    if (!userExists) {
      userClient.id = user.id;
      userClient.isAdmin = user.isAdmin;
      UserClientStorage._userClients.push(userClient);
    }

    UserClientStorage.save();

    return user.id;
  }

  public static remove(userClient: WebsocketUserClient): void {
    UserClientStorage._userClients = UserClientStorage._userClients.filter(
      (userClientItem) => userClientItem !== userClient
    );
    UserClientStorage.save();
  }

  public static update(
    id: string,
    data: Omit<Partial<WebsocketUserClient>, "id">
  ): WebsocketUserClient | undefined {
    const index = UserClientStorage._userClients.findIndex(
      (userClientItem) => userClientItem.id === id
    );

    if (index < 0) return undefined;
    const updatedUserClient = {
      ...UserClientStorage._userClients[index],
      ...data,
    } as WebsocketUserClient;
    UserClientStorage._userClients[index] = updatedUserClient;
    UserClientStorage.save();
    return updatedUserClient;
  }

  public static clear(): void {
    UserClientStorage._userClients = [];
    UserClientStorage.save();
  }

  private static save(): void {
    UserClientStorage.users = UserClientStorage._userClients.map((user) => ({
      id: user.id,
      isAdmin: user.isAdmin,
    })) as Array<User>;

    console.log("Salvando usuários", { users: UserClientStorage._userClients });
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(UserClientStorage.users, null, 2)
    );
  }

  private static load(): Array<User> {
    try {
      const data = fs.readFileSync(dataFilePath, "utf8");
      const simplifiedUsers = JSON.parse(data);
      return simplifiedUsers;
    } catch (error) {
      return [];
    }
  }
}
