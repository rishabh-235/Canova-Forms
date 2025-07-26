import React, { useState } from "react";
import "./style/publishcardstyle.css";
import ShareEmailInput from "./ShareEmailInput";

function PublishCard({ setTogglePublishCard, setToggleShareCard }) {
    const [toggleEmailInput, setToggleEmailInput] = useState(false);
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
                fill-rule="evenodd"
                clip-rule="evenodd"
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
              stroke-width="2"
              stroke-linecap="round"
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
            <input type="text" id="form-name" placeholder="Form Name" />
            <button onClick={() => setToggleEmailInput(!toggleEmailInput)} className="manage-button">Manage</button>
          </div>

          {toggleEmailInput && <div className="manage-share-container">
            <label htmlFor="manage-share">Share</label>
            <div className="manage-share-inputs-list">
              <div>
                <input
                  type="text"
                  id="onwner-email"
                  placeholder="rishabh@gmail.com"
                  disabled
                />
                <span className="owner-label">Owner</span>
              </div>
              <ShareEmailInput />
            </div>
            <button className="add-mails-button">+ Add Mails</button>
          </div>}

          <button
            className="publish-button"
            onClick={() => {
              setTogglePublishCard(false);
              setToggleShareCard(true);
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishCard;
