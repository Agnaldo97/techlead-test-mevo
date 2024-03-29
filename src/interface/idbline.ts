export default interface IDBLine {
    line: number;
    id_file: number;
    reason?: string;
    status?: string;
    from: string;
    to: string;
    amount: number
    id?: number;
}