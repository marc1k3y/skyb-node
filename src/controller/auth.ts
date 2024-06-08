import { Response, NextFunction, Request } from "express";
import { CustomRequest } from "../types";
import { db } from "../service/mongodb";

const newUser = {
  score: 0, floor: 0,
  upgrades: {
    pps: { realtor: 0, designer: 0 },
    ppc: 0
  },
  lastPing: 0
}

export class AuthController {

  async init(req: Request, res: Response, next: NextFunction) {
    try {
      const { initData } = req as CustomRequest;
      const { authDate, user } = initData;
      if (!user?.id || !authDate) throw new Error("400:[auth.init] user not detected");
      let response;
      const findedUser = await db.collection("users").findOne({ userId: user.id });
      if (findedUser) {
        response = findedUser;
      } else {
        newUser.lastPing = Date.now();
        const createdUser = await db.collection("users").insertOne(newUser);
        if (!createdUser.acknowledged || !createdUser.insertedId) throw new Error("500:[auth.init] when creating new user");
        response = newUser;
      }
      return res.status(200).json({ status: "ok", response });
    } catch (e) {
      return next(e);
    }
  }

}