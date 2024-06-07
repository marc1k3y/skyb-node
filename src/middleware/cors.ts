import { CorsOptions } from "cors";

const whitelist = ["*"];
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    
    if (!origin || whitelist.includes(origin as string)) {
      callback(null, true);
    } else {
      console.log("origin:", origin, "not allowed");
      callback(new Error("Not allowed by CORS"));
    }
  }
};