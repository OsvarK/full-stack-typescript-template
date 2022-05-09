import Crypto from "crypto";

export const hash = (data: string, secret: any) => {
    return Crypto
        .createHash('sha256', secret)
        .update(data).digest('hex');
}