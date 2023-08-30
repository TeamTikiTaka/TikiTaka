import { Request, Response } from 'express';
import express from 'express';
import { resourcesController } from '../controllers/resourcesController';
const router = express.Router();

router.post('/:userId', resourcesController.addResources, async(req:Request,res:Response)=>{
  return res.status(200).json()
})

router.get('/:userId',resourcesController.getResources, async(req:Request,res:Response)=>{
  return res.status(200).json(res.locals.rows)
})

router.delete('/:userId',resourcesController.deleteResources,async(req:Request,res:Response)=>{
  return res.status(200).json()
})

module.exports = router;