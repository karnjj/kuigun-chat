import express, { Express, Request, Response } from "express";

const app: Express = express();

const port: number = 8000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello Express + TypeScirpt!!",
  });
});

app.listen(port, () => console.log(`Application is running on port ${port}`));
