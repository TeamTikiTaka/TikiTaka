import { NextFunction, Request, RequestHandler, Response } from 'express';
const db = require('../models/jobModels');

export const resourcesController={
addResources:async(req:Request,res:Response,next:NextFunction) =>{
  try {
    const{link,name} = req.body
    const user_id = req.params.userId
    const queryInsertStr: string = `
    INSERT INTO resources(linkname,link,user_id)
    VALUES('${name}','${link}','${user_id}')`
    await db.query(queryInsertStr)
    return next()
  } catch (err) {
    const log = `Error occuring in resourcesController.addResource: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
},
getResources:async(req:Request,res:Response,next:NextFunction)=>{
try {
  const userId = req.params.userId
  const queryStr: string = `
  SELECT *
  FROM resources
  WHERE resources.user_id=${userId}
  ORDER BY id ASC `
  const query = await db.query(queryStr)
  res.locals.rows = query.rows;
  return next()
} catch (err) {
  const log = `Error occuring in resourcesController.getResources: ${err}`;
  const message = { err: 'Error occured on server side' };
  return next({ log: log, message: message });
}
},
deleteResources: async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const{id}=req.body
    const user_id:string = req.params.userId
    const queryDeleteStr: string = `
    DELETE FROM resources
    WHERE (id=${id} AND user_id = ${user_id})`
    await db.query(queryDeleteStr)
    return next()
  } catch (err) {
    const log = `Error occuring in resourcesController.deleteResource: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
}
}