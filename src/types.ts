import { InitDataParsed } from "@tma.js/init-data-node";
import { Request } from "express";

export interface CustomRequest extends Request {
  initData: InitDataParsed
}

export interface WithIdDoc {
  _id: string
}

export interface UserIE extends WithIdDoc {
  score: number
  floor: number
  upgrades: {
    pps: { realtor: number, designer: number },
    ppc: number
  },
  lastPing: number
}