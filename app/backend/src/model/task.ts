import mongoose, { Schema } from "mongoose";


export interface ITask extends Document {
    task: string;
    completed: boolean;
}
const taskSchema = new Schema<ITask>({

    task:{

        type:String,
        required: true,
    },
    completed:{
        type:Boolean,
        default: false,
    },
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;