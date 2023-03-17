import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connect.js";
import router from "./routes/route.js";

const app = express();

// middleware

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(200).json("GET HOME REQUEST");
});

//api routes
app.use("/api", router);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
      });
    } catch (error) {
      console.log("connect connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
