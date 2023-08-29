import { NextFunction, Request, RequestHandler, Response } from 'express';
const db = require('../models/jobModels');

type jobsController = {
  getJobs: RequestHandler;
  addJobs: RequestHandler;
  deleteJobs: RequestHandler;
  updateJobs: RequestHandler;
};

export const jobsController: jobsController = {

  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    //Getting the user id through the URL
    try {
      const userId = req.params.userId;
      const queryStr: string = `
      SELECT *
      FROM applications
      WHERE applications.user_id = ${userId}`;
      const query = await db.query(queryStr);
      res.locals.rows = query.rows;
      return next();
    }
    catch (err) {
      const log = `Error occuring in jobsController.getJobs: ${err}`;
      const message = { err: 'Error occured on server side' };
      return next({ log: log, message: message });
    }
  },

  addJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {company, position, location, salary, joblink, status, notes} = req.body;
      const user_id = req.params.userId;

      const queryInsertStr: string = `
      INSERT INTO applications(company, position, location, salary, joblink, status, notes, user_id)
      VALUES ('${company}', '${position}', '${location}', '${salary}', '${joblink}', '${status}', '${notes}', '${user_id}')`;

      await db.query(queryInsertStr);
      return next();
    }
    catch (err) {
      const log = `Error occuring in jobsController.addJobs: ${err}`;
      const message = { err: 'Error occured on server side' };
      return next({ log: log, message: message });
    }
  },

  deleteJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {job_id} = req.body;
      const user_id: string = req.params.userId;

      const queryDeleteStr: string = `
      DELETE FROM applications
      WHERE (id = ${job_id} AND user_id = ${user_id})`;

      await db.query(queryDeleteStr);
      return next();
    }
    catch (err) {
      const log = `Error occuring in jobsController.deleteJobs: ${err}`;
      const message = { err: 'Error occured on server side' };
      return next({ log: log, message: message });
    }
  },
  
  updateJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {job_id} = req.body;
      for(const column in req.body){
        if(column !== 'job_id'){
          const queryUpdateStr: string = `
          UPDATE applications
          SET ${column} = '${req.body[column]}'
          WHERE id = ${job_id}`
          await db.query(queryUpdateStr);
        }
      }
      return next();
    }
    catch (err) {
      const log = `Error occuring in jobsController.updateJobs: ${err}`;
      const message = { err: 'Error occured on server side' };
      return next({ log: log, message: message });
    }
  },
};