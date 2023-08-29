import { NextFunction, Request, RequestHandler, Response } from 'express';

type jobsController = {
  getJobs: RequestHandler;
  addJobs: RequestHandler;
  deleteJobs: RequestHandler;
  updateJobs: RequestHandler;
};

export const jobsController: jobsController = {
  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    const queryStr: string = ``;
    return next();
  },
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
