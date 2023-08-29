import { Request, Response } from 'express';
import express from 'express';
import { openaiController } from '../controllers/openaiController';
const router = express.Router();

router.post('/', openaiController.chatGPTData ,(req: Request, res: Response) =>{
  return res.status(200).json(res.locals.data);
});

module.exports = router;
