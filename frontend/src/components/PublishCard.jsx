import { useState, useEffect } from "react";
import "./style/publishcardstyle.css";
import ShareEmailInput from "./ShareEmailInput";
import { useSelector, useDispatch } from "react-redux";
import {
  addShareEmail,
  changeRestriction,
  setForm,
} from "../redux/slices/state/formstateslice";
import { usePublishFormMutation } from "../redux/slices/api/form.api";
function PublishCard({
  setTogglePublishCard,
  setToggleShareCard,
  setPublishLink,
}) {
  const [toggleEmailInput, setToggleEmailInput] = useState(false);
  const { currentForm } = useSelector((state) => state.form);
  const [sharedEmails, setSharedEmails] = useState(
    currentForm?.sharedWith || []
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [publishForm] = usePublishFormMutation();
  useEffect(() => {
    if (currentForm?.sharedWith) {
      setSharedEmails(currentForm.sharedWith);
    }
  }, [currentForm?.sharedWith]);
  const addNewEmailSlot = () => {
    const newIndex = sharedEmails.length;
    dispatch(addShareEmail({ email: "", type: "view", index: newIndex }));
  };
  const handlePublishForm = async () => {
    console.log(currentForm);
    await publishForm({
      _id: currentForm._id,
      backgroundColor: currentForm.backgroundColor,
      pages: currentForm.pages,
      sharedWith: sharedEmails,
      restriction: currentForm.restriction,
    })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          dispatch(setForm(response.form));
          setPublishLink(response.publishLink);
          setTogglePublishCard(false);
          setToggleShareCard(true);
        } else {
          console.error("Error publishing form:", response?.message);
        }
      });
  };
  return (
    <div className="publish-card-container">
      <div className="publish-card">
        <div className="publish-card-header">
          <div>
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 0L15 4.33012V12.9904L7.5 17.3205L0 12.9904V4.33012L7.5 0ZM1.66664 6.15836V12.0281L6.66664 14.9148V9.04512L1.66664 6.15836ZM13.3333 6.1584L8.33332 9.04512V14.9148L13.3333 12.0281V6.1584ZM7.5 1.92449L2.58332 4.76316L7.5 7.60176L12.4167 4.76309L7.5 1.92449Z"
                fill="black"
              />
            </svg>
          </div>

          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={() => setTogglePublishCard(false)}
          >
            <path
              d="M1 1L11 11M21 21L11 11M11 11L21 1L1 21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="publish-card-body">
          <div>
            <label htmlFor="project-name">Save to</label>
            <input type="text" id="project-name" placeholder="Project Name" />
            <button className="change-button">Change</button>
          </div>
          <div>
            <label htmlFor="form-name">Responders</label>
            <input
              type="text"
              id="form-name"
              placeholder={
                currentForm?.restriction === "anyone"
                  ? "Anyone with the Link"
                  : "Restricted"
              }
              disabled
            />
            <button
              onClick={() => setToggleEmailInput(!toggleEmailInput)}
              className="manage-button"
            >
              Manage
            </button>
          </div>
          {
            <div className="manage-share-container">
              <label htmlFor="manage-share">Share</label>
              <div className="manage-share-inputs-list">
                <div>
                  <input
                    type="text"
                    id="onwner-email"
                    placeholder={`${user?.email || "rishabh@gmail.com"}`}
                    disabled
                  />
                  <span className="owner-label">Owner</span>
                </div>
                {sharedEmails?.map((email, index) => (
                  <ShareEmailInput key={index} email={email} index={index} />
                ))}
              </div>
              <button onClick={addNewEmailSlot} className="add-mails-button">
                + Add Mails
              </button>
            </div>
          }
          <button className="publish-button" onClick={handlePublishForm}>
            Publish
          </button>
        </div>
      </div>
      {toggleEmailInput && (
        <div className="manage-email-list">
          <button
            onClick={(e) => {
              dispatch(changeRestriction({ restriction: `anyone` }));
              setToggleEmailInput(false);
            }}
          >
            Anyone
          </button>
          <button
            onClick={(e) => {
              dispatch(changeRestriction({ restriction: "restricted" }));
              setToggleEmailInput(false);
            }}
          >
            Restricted
          </button>
        </div>
      )}
    </div>
  );
}
export default PublishCard;
