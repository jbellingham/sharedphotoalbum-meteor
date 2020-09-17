// eslint-disable-next-line @typescript-eslint/ban-types
export default class Response<TPayload = object> {
    statusCode: number
    body: TPayload
    headers: any
    constructor(statusCode: number, body: TPayload, headers?: any)
    toString(): string
}
