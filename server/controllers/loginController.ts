import { NextFunction, Request, RequestHandler, Response } from 'express';
const bcrypt = require('bcrypt');

type loginController = {
  createUser: RequestHandler;
  verifyUser: RequestHandler;
};

export const loginController: loginController = {
  createUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err: Error, hash: any) => {
      console.log(username, hash);
    });
    return next();
  },

  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
  },
};
