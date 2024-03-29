import File from "../database/models/file";
import IFile from '../interface/ifile'

export const insertFile = async (payload: IFile) => {
    const data = {
        name: payload.name,
        total: payload.total,
        createdAt: Date(),
        status: "PROCESSANDO",
        success: 0,
        fraud: 0,
        error: 0
    }
    return await File.create({ ...data });
};

export const updateFile = async (success: number, fraud: number, error: number, id: number) => {
    return await File.update({ success, fraud, error, status: "PROCESSADO" }, {
        where: {
            id
        }
    });
};