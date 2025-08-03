import { Form } from "../models/Form.model.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
const createForm = async (req, res) => {
  try {
    const { formTitle, backgroundColor, projectId } = req.body;
    if (!formTitle || formTitle.trim() === "") {
      return res.status(400).json({
        message: "Form title is required",
      });
    }
    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    const newForm = new Form({
      formTitle: formTitle,
      backgroundColor: backgroundColor || "#ffffff",
      pages: [
        {
          pageNumber: 1,
          nextPage: 2,
          conditions: [],
          sections: [],
        },
      ],
      project: project._id,
      status: "draft",
      createdBy: req.user._id,
      sharedWith: [],
    });
    await newForm.save();
    await newForm.populate({ path: "project", select: "projectName" });
    return res.status(201).json({
      message: "Form created successfully",
      form: newForm,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const saveForm = async (req, res) => {
  try {
    const {
      _id: formId,
      backgroundColor,
      pages,
      publish,
      sharedWith,
    } = req.body;
    if (!formId || !pages || !Array.isArray(pages)) {
      return res.status(400).json({
        message: "Form ID, and pages are required",
      });
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }
    let publishId = null;
    let status = "draft";
    if (publish && publish === true) {
      publishId = Math.floor(10000 + Math.random() * 90000).toString();
      status = "published";
    }
    const updateData = {
      backgroundColor: backgroundColor || "#ffffff",
      pages: pages,
      status: status,
      publishId: publishId,
    };
    if (sharedWith && Array.isArray(sharedWith)) {
      const validSharedEmails = sharedWith.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.email &&
          item.email.trim() !== "" &&
          ["view", "edit"].includes(item.type)
      );
      updateData.sharedWith = validSharedEmails;
    }
    const updatedForm = await Form.findByIdAndUpdate(formId, updateData, {
      new: true,
    });
    if (!updatedForm) {
      return res.status(404).json({
        message: "Form not found",
      });
    }
    return res.status(200).json({
      message: "Form updated successfully",
      form: updatedForm,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getRecentWorks = async (req, res) => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const recentProjects = await Project.find({
      createdAt: { $gte: fiveDaysAgo },
      createdBy: req.user._id,
    });
    const recentForms = await Form.find({
      createdAt: { $gte: fiveDaysAgo },
      createdBy: req.user._id,
    }).populate({ path: "project", select: "projectName" });
    return res.status(200).json({
      message: "Recent projects and forms fetched successfully",
      projects: recentProjects,
      forms: recentForms,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getSharedWorks = async (req, res) => {
  try {
    const sharedForms = await Form.find({
      "sharedWith.email": req.user.email,
    })
      .populate({ path: "project", select: "projectName" })
      .select("-createdBy -sharedWith");
    const sharedProjects = await Project.find({
      "sharedWith.email": req.user.email,
    })
      .populate({ path: "createdBy", select: "name email" })
      .select("-createdBy -sharedWith");
    if (sharedForms.length === 0 && sharedProjects.length === 0) {
      return res.status(404).json({
        message: "No shared works found",
      });
    }
    return res.status(200).json({
      message: "Shared works fetched successfully",
      sharedForms: sharedForms,
      sharedProjects: sharedProjects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getFormById = async (req, res) => {
  try {
    const { formId } = req.params;
    if (!formId) {
      return res.status(400).json({
        message: "Form ID is required",
      });
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }
    await form.populate({ path: "project", select: "projectName" });
    if (
      form.createdBy.toString() !== req.user._id.toString() &&
      !form.sharedWith.some((shared) => shared.email === req.user.email)
    ) {
      return res.status(403).json({
        message: "You do not have permission to access this form",
      });
    }
    return res.status(200).json({
      message: "Form fetched successfully",
      form: form,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const publishForm = async (req, res) => {
  try {
    const {
      _id: formId,
      backgroundColor,
      pages,
      sharedWith,
      restriction,
    } = req.body;
    if (!formId || !pages || !Array.isArray(pages)) {
      return res.status(400).json({
        message: "Form ID, and pages are required",
      });
    }
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }
    const status = "published";
    const publishLink = `${process.env.FRONTEND_URL}/response-form/${formId}/1`;
    const updateData = {
      backgroundColor: backgroundColor || "#ffffff",
      pages: pages,
      status: status,
      restriction: restriction || "anyone",
    };
    if (sharedWith && Array.isArray(sharedWith)) {
      const validSharedEmails = sharedWith.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.email &&
          item.email.trim() !== "" &&
          ["view", "edit"].includes(item.type)
      );
      updateData.sharedWith = validSharedEmails;
    }
    const updatedForm = await Form.findByIdAndUpdate(formId, updateData, {
      new: true,
    });
    if (!updatedForm) {
      return res.status(404).json({
        message: "Form not found",
      });
    }
    return res.status(200).json({
      message: "Form published successfully",
      form: updatedForm,
      publishLink: publishLink,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getForms = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }
    const forms = await Form.find({ project: projectId });
    if (forms.length === 0) {
      return res.status(404).json({
        message: "No forms found",
      });
    }
    return res.status(200).json({
      message: "Forms fetched successfully",
      forms: forms,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getResponseForm = async (req, res) => {
  const { responseFormId } = req.params;
  if (!responseFormId) {
    return res.status(400).json({
      message: "Response Form ID is required",
    });
  }
  try {
    const responseForm = await Form.findById({ _id: responseFormId });
    if (!responseForm) {
      return res.status(404).json({
        message: "Response Form not found",
      });
    }
    if (responseForm.status !== "published") {
      return res.status(403).json({
        message: "Form is not published",
      });
    }
    if (responseForm.restriction === "restricted") {
      const token = req.cookies?.accessToken;
      if (!token) {
        return res.status(401).json({
          message: "Authentication required for this form",
        });
      }
      try {
        const jwt = await import("jsonwebtoken");
        const decodedToken = jwt.default.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken._id).select(
          "-password -refreshToken"
        );
        if (!user) {
          return res.status(401).json({
            message: "Invalid access token",
          });
        }
        const hasAccess =
          responseForm.sharedWith.some(
            (shared) => shared.email === user.email
          ) ||
          responseForm.createdBy.toString() === user._id.toString();
        if (!hasAccess) {
          return res.status(403).json({
            message: "You do not have permission to access this form",
          });
        }
        return res.status(200).json({
          message: "Form fetched successfully",
          form: responseForm,
        });
      } catch (jwtError) {
        return res.status(401).json({
          message: "Invalid or expired token",
        });
      }
    } else {
      return res.status(200).json({
        message: "Form fetched successfully",
        form: responseForm,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export {
  createForm,
  saveForm,
  getRecentWorks,
  getSharedWorks,
  getFormById,
  publishForm,
  getForms,
  getResponseForm,
};



