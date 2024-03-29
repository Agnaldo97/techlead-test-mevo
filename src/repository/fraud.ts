import Fraud from "../database/models/fraud";
import IDBLine from '../interface/idbline'

export const insertFraud = async (payload: IDBLine) => {
    const data = {
        line: payload.line,
        id_file: payload.id_file,
        status: payload.status,
        from: payload.from,
        to: payload.to,
        amount: payload.amount
    }
    return await Fraud.create({ ...data });
};