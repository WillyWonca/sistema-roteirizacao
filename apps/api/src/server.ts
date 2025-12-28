import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("API ok"));

app.listen(3333, () => {
  console.log("API running at http://localhost:3333");
});
