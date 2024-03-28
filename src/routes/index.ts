
import { uploadFile } from '../controller/upload';

import express from 'express'

const router = express.Router();

const prefix = 'v1'

router.post(`/${prefix}/upload`, uploadFile);
router.post(`/check`, uploadFile);



export default router;