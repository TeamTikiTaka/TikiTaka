import { NextFunction, Request, RequestHandler, Response } from 'express';
const bcrypt = require('bcrypt');

type userController = {
  createUser: RequestHandler;
  authenticateUser: RequestHandler;
};

export const userController: userController = {
  createUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // const queryText = `SELECT ${username} `
    // do query to see if username EXISTS. Set userExists = true if username exists already. 
    const userExists = false
    if (userExists) {
      return res.status(200).json(false)
    }
    

    bcrypt.hash(password, 10, (err: Error, hash: any) => {
      // do query to insert username and hash into table
      res.locals.loginStatus = true
    });

    return next();
  },

  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // do query to see if username exists. if user does not exist, return false
    const userExists = true;
    if (!userExists) {
      return res.status(200).json(false)
    }

    // do query to get HASH corresponding to username
    const hash = 'adsjflkaklj;adf' // placeholder. Assign hash to your hash from DB
    bcrypt.compare(password, hash, (err: Error, result: boolean) => {
      res.locals.loginStatus = result
    })

    return next();
  },
};
