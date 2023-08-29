import { NextFunction, Request, RequestHandler, Response } from 'express';
const db = require('../models/jobModels');

type jobsController = {
  addJobs: RequestHandler;
  deleteJobs: RequestHandler;
  updateJobs: RequestHandler;
};

export const jobsController: jobsController = {
  addJobs: async (req: Request, res: Response, next: NextFunction) => {
    return next();
  },
  deleteJobs: async (req: Request, res: Response, next: NextFunction) => {
    return next();
  },
  updateJobs: async (req: Request, res: Response, next: NextFunction) => {
    return next();
  },
};
