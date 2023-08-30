import { NextFunction, Request, RequestHandler, Response } from 'express';

export const resourcesController={
addResource:async(req:Request,res:Response,next:NextFunction) =>{
  try {
    const{link,name} = req.body
  } catch (err) {
    const log = `Error occuring in resourcesController.addResource: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
},
getResources:async(req:Request,res:Response,next:NextFunction)=>{
try {
  const userId = req.params.userId
} catch (err) {
  const log = `Error occuring in resourcesController.getResources: ${err}`;
  const message = { err: 'Error occured on server side' };
  return next({ log: log, message: message });
}
},
deleteResource: async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const{resourceName}=req.body
  } catch (err) {
    const log = `Error occuring in resourcesController.deleteResource: ${err}`;
    const message = { err: 'Error occured on server side' };
    return next({ log: log, message: message });
  }
}
}