import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();
const db = require('../models/jobModels');
import {jobsController} from '../controllers/jobsController'

//Any query to the database must include user_id in order to manipulate personalized data

router.get('/:userId', async (req: Request, res: Response) => {
  //Getting the user id through the URL
  const userId = req.params.userId;
  const queryStr: string = `
  SELECT *
  FROM applications
  WHERE applications.user_id = ${userId}`;
  const query = await db.query(queryStr);
  return res.status(200).json(query.rows);
});

router.post('/:userId', jobsController.addJobs, async (req: Request, res: Response) => {
  return res.status(200).send('Application added!');
});

router.patch('/:userId', jobsController.deleteJobs, async (req: Request, res: Response) => {
  return res.sendStatus(200)
});

router.delete('/:userId', jobsController.deleteJobs, async (req: Request, res: Response) => {
  return res.sendStatus(200)
});

module.exports = router;