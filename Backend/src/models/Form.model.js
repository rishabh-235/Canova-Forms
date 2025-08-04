import mongoose, { Schema } from "mongoose";
const formSchema = new Schema(
  {
    formTitle: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    pages: [
      {
        pageNumber: {
          type: Number,
          required: true,
        },
        truePage: {
          type: Number,
          default: null,
        },
        falsePage: {
          type: Number,
          default: null,
        },
        conditions: [
          {
            questionId: {
              type: Schema.Types.ObjectId,
              required: true,
            },
            conditionText: [
              {
                type: String,
                required: true,
              },
            ],
          },
        ],
        sections: [
          {
            backgroundColor: {
              type: String,
              default: "#ffffff",
            },
            questions: [
              {
                questionId: {
                  type: Schema.Types.ObjectId,
                  auto: true,
                },
                questionText: {
                  type: String,
                  required: true,
                },
                type: {
                  type: String,
                  enum: [
                    "multiple choice",
                    "short answer",
                    "long answer",
                    "checkbox",
                    "dropdown",
                    "file upload",
                    "date",
                    "rating",
                    "linear scale",
                  ],
                  required: true,
                },
                options: [
                  {
                    optionId: {
                      type: Schema.Types.ObjectId,
                      auto: true,
                    },
                    text: {
                      type: String,
                    },
                    selections: {
                      type: Number,
                      default: 0,
                    },
                  },
                ],
                image: {
                  type: String,
                  default: null,
                },
                video: {
                  type: String,
                  default: null,
                },
              },
            ],
          },
        ],
      },
    ],
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        email: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["view", "edit", "share"],
          required: true,
        },
      },
    ],
    restriction: {
      type: String,
      enum: ["anyone", "restricted"],
      default: "anyone",
    },
  },
  {
    timestamps: true,
  }
);
export const Form = mongoose.model("Form", formSchema);



