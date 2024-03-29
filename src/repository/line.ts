import Line from "../database/models/line";
import IDBLine from '../interface/idbline'

export const insertLine = async (payload: IDBLine) => {
    const data = {
        line: payload.line,
        id_file: payload.id_file,
        reason: payload.reason,
        status: payload.status,
        from: payload.from,
        to: payload.to,
        amount: payload.amount
    }
    return await Line.create({ ...data });
};