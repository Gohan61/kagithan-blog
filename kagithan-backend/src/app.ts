import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

export const app = express();

app.use(cors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status | 500);
  res.send({ error: err });
});

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
