import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createForm, deleteForm, getFormById, getForms, getRecentWorks, getResponseForm, getSharedWorks, publishForm, saveForm, saveShareEmail } from "../controllers/form.controller.js";
import { createProject, getProjects } from "../controllers/project.controller.js";
const router = Router();
router.post("/create-project", verifyJWT, createProject, createForm);
router.post("/create-form", verifyJWT, createForm);
router.post("/save-form", verifyJWT, saveForm);
router.get("/get-recent-works", verifyJWT, getRecentWorks);
router.get("/get-shared-works", verifyJWT, getSharedWorks);
router.get("/get-form/:formId", verifyJWT, getFormById);
router.post("/publish-form", verifyJWT, publishForm);
router.get("/get-projects", verifyJWT, getProjects);
router.get("/get-forms/:projectId", verifyJWT, getForms);
router.get("/get-response-form/:responseFormId", getResponseForm);
router.delete("/delete-form/:formId", verifyJWT, deleteForm);
router.post("/save-share-email", verifyJWT, saveShareEmail);
export default router;



