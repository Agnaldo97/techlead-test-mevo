import { Response, Request } from "express";
import UploadService from '../service/upload'
class UploadController {

  constructor() {
  }

  async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).send('No files were uploaded.');
      }

      const response = await UploadService.uploadFile(req.file)
      
      res.status(200).json("SUCESSO");
    } catch (error: any) {
      res.status(500).json();
    }
  }
}

export default new UploadController();
