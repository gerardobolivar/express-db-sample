import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import PGClient from "./app/pgClient";

const app:Express = express();
dotenv.config();
const DBIns = PGClient.getInstancePool();

const port = process.env.PORT || 7000;

app.get('/',async (req:Request,res:Response)=>{
  const result = await DBIns.query('SELECT * FROM "User"');
  const resultFiltered = {rows:result.rows, rowCount: result.rowCount};
  res.send(resultFiltered);
})

app.post("/",(req:Request,res:Response)=>{
  console.log("POST received");
})

app.listen(port, ()=>{
  console.log(`[Server]: Running at http://localhost:${port}`);
})