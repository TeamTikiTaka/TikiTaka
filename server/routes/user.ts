import { NextFunction, Request, Response } from 'express';

import express from 'express';
const router = express.Router();

import { userController } from '../controllers/userController';

router.post(
  '/',
  userController.authenticateUser,
  (req: Request, res: Response) => {
    return res.status(200).json(true);
  },
);

router.post(
  '/signup',
  userController.createUser,
  userController.authenticateUser,
  (req: Request, res: Response) => {
    return res.status(200).json(true);
  },
);

module.exports = router;
