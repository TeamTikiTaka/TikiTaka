import { NextFunction, Request, RequestHandler, Response } from 'express';
import {searchJobFields} from '../scripts/GPTscript'

type openaiController = {
  chatGPTData: RequestHandler;
};

export const openaiController: openaiController = {
  chatGPTData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobDetails } = req.body;
      // console.log('INPUT: ', jobDetails)
      const results = await searchJobFields(jobDetails);
      res.locals.data = results;
      // console.log('OUTPUT: ', results)
      return next()
    }
    catch (err) {
      const log = `Error occuring in movesController.graphData: ${err}`;
      const message = { err: 'Error occured on server side' };
      return next({ log: log, message: message });
    }
  }
}