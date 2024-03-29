import csvParser from 'csv-parser';
import fs from 'fs';
class UploadService {
    constructor() { }

    async uploadFile(filePath: string): Promise<any> {
        try {

            const parsedData = await this.parseCSV(filePath);

            fs.unlinkSync(filePath);

            return parsedData;
        } catch (error: any) {
            throw "Error upload";
        }
    }
    async parseCSV(filePath: any) {
        try {
            const results: any = [];

            return new Promise((resolve, reject) => {
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
        } catch (error) {
            throw 'Error parse file';
        }
    }
}

export default new UploadService();
