import express from "express"
import cors from "cors";
import tasks from "./routes/tasks";


const app = express();

app.use(express.json());
app.use(cors);
// connectDB();

app.listen(8080, () => console.log("Server running on port 8080.."));
app.get("/", (_req, res) =>{

    res.status(200).json({
        ok: true
    })
});

app.use("/api/tasks", tasks);
