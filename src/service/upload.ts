import csvParser from 'csv-parser';
import fs from 'fs';
import ILine from '../interface/iline'
import IFile from '../interface/ifile'
import { insertFile } from '../repository/upload';
import { insertLine } from '../repository/line';
import { insertFraud } from '../repository/fraud';

import RulesService from '../service/rules'
import IDBLine from '../interface/idbline';

class UploadService {
    private processedSuccess: ILine[];
    private processedError: ILine[];
    private processedFraud: ILine[];
    private processed: ILine[];


    constructor() {
        this.processed = []
        this.processedError = []
        this.processedSuccess = []
        this.processedFraud = []
    }

    async uploadFile(file: any): Promise<any> {
        try {

            this.processed = []
            this.processedError = []
            this.processedSuccess = []
            this.processedFraud = []

            const parsedData: ILine[] = await this.parseCSV(file.path);
            const payload: IFile = {
                name: file.filename,
                total: parsedData.length
            }

            const dbFile = await insertFile(payload)
            await parsedData.forEach(async (line: ILine, lineNumber) => {
                await this.verifyRule(line, dbFile.id, lineNumber)
            });

            fs.unlinkSync(file.path);

            return parsedData;
        } catch (error: any) {
            throw "Error upload";
        }
    }
    async verifyRule(line: ILine, id: number, lineNumber: number) {
        const payload: IDBLine = {
            line: lineNumber,
            reason: '',
            id_file: id,
            from: line.from,
            to: line.to,
            amount: Number(line.amount)
        }
        if (await RulesService.lessZero(line)) {
            this.processedError.push(line)
            payload.reason = 'VALOR_NEGATIVO'
            payload.status = 'ERRO'
            await insertLine(payload)

        } else if (await RulesService.duplicated(line, this.processed)) {
            this.processedError.push(line)
            payload.reason = 'DUPICADO'
            payload.status = 'ERRO'
            await insertLine(payload)
        } else if (await RulesService.fraud(line)) {
            payload.status = 'SUCESSO'
            await insertFraud(payload)
            this.processedFraud.push(line)
        } else {
            this.processedSuccess.push(line)
            payload.status = 'SUCESSO'
            await insertLine(payload)
            this.processedSuccess.push(line)
        }
        this.processed.push(line)
    }

    async parseCSV(filePath: any): Promise<ILine[]> {
        try {
            const results: ILine[] = [];

            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser())
                    .on('data', (data) => {
                        data.amount = (Number(data.amount) / 100).toFixed(2)
                        results.push(data);
                    })
                    .on('end', () => {
                        resolve(results);
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });
            return results;
        } catch (error) {
            throw 'Error parse file';
        }
    }

}

export default new UploadService();
