import { Router } from "express";
import Task from "../model/task";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.send(task);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOneAndUpdate({ _id: id }, req.body);
    res.send(task);
} catch (err) {
    res.send(err);
}
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.send(task);
    } catch (error) {
        res.send(error);
    } 
});

export default router;
