import { NextFunction, Request, Response } from 'express';
import express from 'express';
const router = express.Router();
const db = require('../models/jobModels');
import {jobsController} from '../controllers/jobsController'

//Any query to the database must include user_id in order to manipulate personalized data

router.get('/:userId', jobsController.getJobs, async (req: Request, res: Response) => {
  return res.status(200).json(res.locals.rows);
});

router.post('/:userId', jobsController.addJobs, async (req: Request, res: Response) => {
  return res.status(200).send('Application added!');
});

router.delete('/:userId', jobsController.deleteJobs, async (req: Request, res: Response) => {
  return res.status(200).send('Application deleted!');
});

router.patch('/:userId', jobsController.updateJobs, async (req: Request, res: Response) => {
  // return res.status(200).send(//json obj)
});

module.exports = router;