import mongoose, { Schema } from "mongoose";
const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    sharedWith:[
        {
            email: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                enum: ["view", "edit"],
                required: true,
            }
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const Project = mongoose.model("Project", projectSchema);



