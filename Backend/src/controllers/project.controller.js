import { Project } from "../models/project.model.js";
const createProject = async (req, res, next) => {
    try {
        const { projectName } = req.body;
        const newProject = new Project({ projectName, createdBy: req.user.id, sharedWith: [] });
        await newProject.save();
        req.body.projectId = newProject._id;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server Breaks at createProject", error: error.message });
    }
}
const getProjects = async (req, res) => {
    const {_id} = req.user;
    try {
        const projects = await Project.find({ createdBy: _id });
        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: "Server Breaks at getProjects", error: error.message });
    }
}
export { createProject, getProjects }



