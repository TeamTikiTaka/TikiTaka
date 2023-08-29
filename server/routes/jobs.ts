import { NextFunction, Request, Response } from 'express';
const express = require('express');
const router = express.Router();

import { jobsController } from '../controllers/jobsController';

router.get('/', async (req: Request, res: Response) => {});
