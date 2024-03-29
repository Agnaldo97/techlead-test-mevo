import csvParser from 'csv-parser';
import fs from 'fs';
import ILine from '../interface/iline'
import IFile from '../interface/ifile'
import { insertFile, updateFile } from '../repository/upload';
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

            const dbFile: any = await insertFile(payload)
            for (let i = 0; i < parsedData.length; i++) {
                await this.verifyRule(parsedData[i], dbFile.id, i)
            };

            fs.unlinkSync(file.path);

            const success = this.processedSuccess.length
            const fraud = this.processedFraud.length
            const error = this.processedError.length

            await updateFile(success, fraud, error, dbFile.id)


            return { total: this.processed.length, success: success, fraud: fraud, error: this.processedError };
        } catch (error: any) {
            throw error.message;
        }
    }
    async verifyRule(line: ILine, id: number, lineNumber: number) {
        const payload: IDBLine = {
            line: lineNumber,
            reason: '',
            id_file: id,
            from: line?.from,
            to: line?.to,
            amount: Number(line?.amount)
        }
        if (await RulesService.lessZero(line)) {
            payload.reason = 'VALOR_NEGATIVO'
            payload.status = 'ERRO'
            line.reason = 'VALOR_NEGATIVO'
            this.processedError.push(line)
            await insertLine(payload)

        } else if (await RulesService.duplicated(line, this.processed)) {
            payload.reason = 'DUPLICADO'
            payload.status = 'ERRO'
            line.reason = 'DUPLICADO'
            await insertLine(payload)
            this.processedError.push(line)

        } else if (await RulesService.fraud(line)) {
            payload.status = 'SUCESSO'
            await insertFraud(payload)
            this.processedFraud.push(line)
        } else {
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
                        data.amount = (Number(data?.amount) / 1000).toFixed(2)
                        //O correto seria por 100 mas acredito que o arquivo de geração esteja com algum problema, está gerando linhas com valores muito altos
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
