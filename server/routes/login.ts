import { NextFunction, Request, Response } from 'express';

import express from 'express'
const router = express.Router();

import { loginController } from '../controllers/loginController';

router.post('/', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

router.post(
  '/signup',
  loginController.createUser,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  },
);

module.exports = router;