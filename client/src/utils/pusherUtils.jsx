import Pusher from "pusher-js";
import { pusherAppCluster, pusherAppKey } from "../config/config";

export const pusher = new Pusher(`${pusherAppKey}`, {
  cluster: `${pusherAppCluster}`,
  encrypted: true,
});
