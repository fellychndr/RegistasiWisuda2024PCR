import Pusher from "pusher";

export const pusher = new Pusher(
    {
        appId: "1864826",
        key: "e1f8200ef5aa2cd5c25a",
        secret: "9b82d2a3c499f2f8a3a8",
        cluster: "ap1",
        useTLS: true
    }
);