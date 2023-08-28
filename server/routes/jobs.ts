import { NextFunction, Request, Response } from 'express';
const express = require('express');
const router = express.Router();

const jobsController = require('../controllers/jobsController')