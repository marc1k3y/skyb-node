import { InitDataParsed } from "@tma.js/init-data-node";
import { Request } from "express";

export interface CustomRequest extends Request {
  initData: InitDataParsed
}

export interface WithIdDoc {
  _id: string
}