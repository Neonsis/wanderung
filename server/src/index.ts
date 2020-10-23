require("dotenv").config();

import express from "express";

const app = express();

app.listen(process.env.PORT);

console.log(`[app] : http://localhost:${process.env.PORT}`);


