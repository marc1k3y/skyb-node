import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../types";
import { parse as TMAParse } from "@tma.js/init-data-node";

export const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const tma = req.headers.authorization?.split(" ")[1];
    console.log(`tma in mw ${tma}`);
    
    if (!tma) throw new Error("401:tma_not_found");

    const decoded = TMAParse(tma);
    if (!decoded) throw new Error("500:tma_is_broken");

    (req as CustomRequest).initData = decoded;
    return next();
  } catch (e) {
    return next(e);
  }
}