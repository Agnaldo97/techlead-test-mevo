export default interface IFile {
    id?: number;
    total: number;
    success?: number;
    error?: number;
    status?: string;
    name: string;
    createdAt?: Date;
    fraud?: number;
}