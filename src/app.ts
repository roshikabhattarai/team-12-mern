import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

//! importing routes
import routes from "./routes";
import AppError from "./utils/appError.utils";

//! creating express app instance
const app = express();

//! using middlewares
//! body parser
app.use(express.json({ limit: "10mb" }));

//! helth route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
    staus: "success",
  });
});

//! using routes
app.use("/api/v1", routes);

//! path not found error middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `can not ${req.method} on ${req.url}`;
  throw new AppError(message, 404);
});
//! error handler
app.use(errorHandler);

export default app;