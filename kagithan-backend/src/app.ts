import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

export const app = express();

app.use(cors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status | 500);
  res.send({ error: err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
