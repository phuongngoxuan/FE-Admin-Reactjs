export interface Payload {
    url: string;
    method: string;
    body?: object;
    headers?: HeadersInit;
}
