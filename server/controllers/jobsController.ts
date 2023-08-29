import { NextFunction, Request, RequestHandler, Response } from 'express';
const db = require('../models/jobModels');

type jobsController = {
  addJobs: RequestHandler;
  deleteJobs: RequestHandler;
  updateJobs: RequestHandler;
};

export const jobsController: jobsController = {
  addJobs: async (req: Request, res: Response, next: NextFunction) => {
    const {company, position, location, salary, joblink, status, notes} = req.body;
    const user_id = req.params.userId;

    const queryInsertStr = `
    INSERT INTO applications(company, position, location, salary, joblink, status, notes, user_id)
    VALUES ('${company}', '${position}', '${location}', '${salary}', '${joblink}', '${status}', '${notes}', '${user_id}')`;

    await db.query(queryInsertStr);
    return next();
  },
  deleteJobs: async (req: Request, res: Response, next: NextFunction) => {
    
    return next();
  },
  updateJobs: async (req: Request, res: Response, next: NextFunction) => {
    return next();
  },
};
