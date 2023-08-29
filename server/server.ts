import express from 'express';
import type { Request, Response, NextFunction } from 'express';

const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());

const userRouter = require('./routes/user')
const openaiRouter = require('./routes/openai')
const jobRouter = require('./routes/jobs')


app.use('/api/login', userRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/login', userRouter)
app.use('/api/openai', openaiRouter)

app.get('/', (req,res) => {
  return res.sendFile('../client/index.html');
});

app.use((req, res) => res.sendStatus(404)); 


app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const defaultErr = {
      log: 'Error caught in global handler',
      status: 500,
      message: { err: 'An error occurred' }
    };
    const errorObj = { ...defaultErr, ...err };
    console.log(errorObj.log);
    console.log(err);
    return res.status(errorObj.status).json(errorObj.message);
  },
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
