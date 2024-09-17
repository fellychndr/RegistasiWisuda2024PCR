import { pusher } from './pusherUtils.js';


export const triggerPusher = (mejaId, message, data) => {
    pusher.trigger(mejaId, "my-event", {
        message: message,
        data: data
    });
};