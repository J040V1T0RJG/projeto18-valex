import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import router from "./routers/index";
import { errorHandler } from "./middlewares/errorHandlingMiddleware"

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 4009;

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`)
});

