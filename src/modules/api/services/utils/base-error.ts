export class BaseError extends Error {

    readonly status: number;

    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
    }

}

export class ClientError extends BaseError {
    constructor(msg: string) {
        super(msg, 400);
    }
}