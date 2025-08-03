import { useState } from "react";
import "./style/formcardstyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ShareCard from "./ShareCard";
import { useDeleteFormMutation } from "../redux/slices/api/form.api";
function FormCard({ form }) {
  const [toggleOptions, setToggleOptions] = useState(false);
  const [toggleShareCard, setToggleShareCard] = useState(false);
  const [toggleRenameInput, setToggleRenameInput] = useState(false);
  const [formTitle, setFormTitle] = useState(form.formTitle);
  const publishLink = `https://canova-forms.vercel.app/response-form/${form._id}/1`;
  const [deleteForm] = useDeleteFormMutation();

  const handleOptionClick = async (e) => {
    if (e.target.innerText === "Share") {
      setToggleShareCard(!toggleShareCard);
    }
    else if (e.target.innerText === "Rename") {
      setToggleRenameInput(!toggleRenameInput);
    }
    else if (e.target.innerText === "Copy") {
      toast.info("Copy functionality coming soon!");
    }
    else {
      try {
        const response = await deleteForm(form._id);
        if (response.data && response.data.form) {
          toast.success("Form deleted successfully!");
        } else {
          toast.error("Delete functionality coming soon!");
        }
      } catch (error) {
        console.error("Error deleting form:", error);
        toast.error("An error occurred while deleting the form.");
      }
    }
    setToggleOptions(!toggleOptions);
  }

  const handleSaveFormName = (e) => {
    e.preventDefault();
    setToggleRenameInput(false);
    toast.success("Form name updated successfully!");
  }

  return (
      <div className="form-card-container">
        <div className="form-card-header">
          {toggleRenameInput ? (
            <input
              style={{
                width: "110px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                borderBottom: "1px solid #000000ff"
              }}
              type="text"
              value={formTitle}
              autoFocus
              onChange={(e) => setFormTitle(e.target.value)}
              onKeyDown={handleSaveFormName}
              onBlur={() => setToggleRenameInput(false)}
            />
          ) : (
            `${formTitle} (${form.status})`
          )}
        </div>
        <Link to={`/create-form/${form._id}/1`} className="form-card-body">
          <div>
            <svg
              width="24"
              height="28"
              viewBox="0 0 26 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.91659 28.6667H24.0833C24.5032 28.6667 24.9059 28.8335 25.2028 29.1304C25.4998 29.4273 25.6666 29.8301 25.6666 30.25C25.6666 30.6699 25.4998 31.0726 25.2028 31.3696C24.9059 31.6665 24.5032 31.8333 24.0833 31.8333H1.91659C1.49666 31.8333 1.09393 31.6665 0.797 31.3696C0.500067 31.0726 0.333252 30.6699 0.333252 30.25C0.333252 29.8301 0.500067 29.4273 0.797 29.1304C1.09393 28.8335 1.49666 28.6667 1.91659 28.6667ZM0.333252 20.75L16.1666 4.91666L20.9166 9.66666L5.08325 25.5H0.333252V20.75ZM17.7499 3.33332L20.9166 0.166656L25.6666 4.91666L22.4983 8.08491L17.7499 3.33332Z"
                fill="#FAFAF9"
              />
            </svg>
          </div>
        </Link>
        <div className="form-card-footer">
          <p>View Analysis</p>
          <>
            <svg
              width="4"
              height="18"
              viewBox="0 0 4 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              onClick={() => setToggleOptions(!toggleOptions)}
            >
              <circle cx="2" cy="2" r="2" fill="black" />
              <circle cx="2" cy="12" r="2" fill="black" />
              <circle cx="2" cy="22" r="2" fill="black" />
            </svg>
            <div onClick={handleOptionClick} className={`form-card-options ${toggleOptions ? "show" : ""}`}>
              <button>Share</button>
              <button>Rename</button>
              <button>Copy</button>
              <button>Delete</button>
            </div>
          </>
        </div>
        {toggleShareCard && <ShareCard setToggleShareCard={setToggleShareCard} publishLink={publishLink} />}
      </div>
  );
}
export default FormCard;



