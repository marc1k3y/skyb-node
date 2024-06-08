import { NextFunction, Request, Response } from "express";
import { CustomRequest, UserIE } from "../types";
import { db } from "../service/mongodb";
import { ppsTable } from "../service/gameConfig";

export class GameController {

  async sync(req: Request, res: Response, next: NextFunction) {
    try {
      const { initData } = req as CustomRequest;
      const { user, authDate } = initData;
      if (!user?.id || !authDate) throw new Error("400:[auth.init] user not detected");
      const findedUser = await db.collection<UserIE>("users").findOne({ userId: user.id });
      if (!findedUser?._id) throw new Error("404:[game.sync] user not found");
      let currentUserScore = findedUser.score;
      const pingTs = Date.now();
      const diffTsInSec = (pingTs - findedUser.lastPing) / 1000;
      const ppsUpgrades = findedUser.upgrades.pps;
      for (let item in ppsUpgrades) {
        const current = ppsUpgrades[item as keyof typeof ppsUpgrades];
        const { step, rate } = ppsTable[item as keyof typeof ppsTable];
        const currentUpgradePerSecond = current * step * rate;
        currentUserScore += currentUpgradePerSecond * diffTsInSec;
      }
      const updatedScore = await db.collection("users").updateOne({ userId: user.id }, { $set: { score: currentUserScore } });
      if (!updatedScore.acknowledged || !updatedScore.modifiedCount) throw new Error("500:[game.sync] when updating user score");
      return res.status(200).json({ status: "ok" });
    } catch (e) {
      return next(e);
    }
  }

}