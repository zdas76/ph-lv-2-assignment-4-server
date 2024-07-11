import express, { Application } from "express";
import cors from "cors";
import router from "./app/Routes";
import notFound from "./app/middleware/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());

// connet module router
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Walcome to Sarker Fitness Equipment and Accessories!");
});

// Not Found Route
app.use(notFound);

export default app;
