import { Payload } from '../interface/base.interface';

export const request = (payload: Payload) => {
    const { url, body, method, headers } = payload;

    return fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: headers
            ? headers
            : {
                  'Content-Type': 'application/json',
              },
    });
};
