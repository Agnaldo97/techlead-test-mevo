import csvParser from 'csv-parser';
import fs from 'fs';
import Line from '../interface/Line'
import RulesService from '../service/rules'

class UploadService {
    constructor() { }

    async uploadFile(filePath: string): Promise<any> {
        try {

            const parsedData: Line[] = await this.parseCSV(filePath);
            const processed: Line[] = []
            await parsedData.forEach(async (line: Line) => {
                await this.verifyRule(line, processed)
            });

            fs.unlinkSync(filePath);

            return parsedData;
        } catch (error: any) {
            throw "Error upload";
        }
    }
    async parseCSV(filePath: any): Promise<Line[]> {
        try {
            const results: Line[] = [];

            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser())
                    .on('data', (data) => {
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

    async verifyRule(line: Line, processed: Line[]) {
        if (RulesService.lessZero(line)) {
            
        } if (RulesService.duplicated(line, processed)) {

        } if (RulesService.fraud(line)) {

        }
    }
}

export default new UploadService();
