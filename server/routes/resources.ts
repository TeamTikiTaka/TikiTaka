import { Request, Response } from 'express';
import express from 'express';
import { resourcesController } from '../controllers/resourcesController';
const router = express.Router();

router.post('/add', async(req:Request,res:Response)=>{
  return res.status(200).json()
})

router.get('/', async(req:Request,res:Response)=>{
  return res.status(200).json()
})

router.delete('/delete', async(req:Request,res:Response)=>{
  return res.status(200).json()
})

module.exports = router;