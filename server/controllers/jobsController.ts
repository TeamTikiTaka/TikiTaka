import { NextFunction, Request, RequestHandler, Response } from 'express';

type jobsController = {
  addJob: RequestHandler,
  deleteJob: RequestHandler,
  updateJob: RequestHandler,

};