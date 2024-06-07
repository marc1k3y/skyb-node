import { Response, NextFunction, Request } from "express";
import { CustomRequest } from "../types";

export class AuthController {

  async init(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      
      const test = (req as CustomRequest).initData;
      return res.status(200).json(test);
    } catch (e) {
      return next(e);
    }
  }

}