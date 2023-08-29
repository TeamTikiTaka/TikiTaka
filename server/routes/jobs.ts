import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();
const db = require('../models/jobModels');
import {jobsController} from '../controllers/jobsController'

router.get('/:userId', async (req: Request, res: Response) => {
  //Getting the user id through the URL
  const userId = req.params.userId;
  const queryStr: string = `
  SELECT *
  FROM applications
  WHERE applications.user_id = ${userId}`;
  const query = await db.query(queryStr);
  return res.status(200).json(query);
});

module.exports = router;