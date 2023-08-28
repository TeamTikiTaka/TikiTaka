import { NextFunction } from "express";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


const loginController = require('../controllers/loginController');

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err: Error, hash: any) => {
    console.log(username, hash)
  })

  return res.sendStatus(200)
});
