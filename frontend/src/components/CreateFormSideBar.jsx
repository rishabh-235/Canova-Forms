import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { addPage } from "../redux/slices/state/formstateslice";
import { toast } from "react-toastify";
function CreateFormSideBar() {
  const { currentForm } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const handleAddNewPage = () => {
    dispatch(addPage());
    toast.success("New page added successfully!");
  };
  return (
    <div className="sidebar-container">
      <Link to={"/"} className="logo-container">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="3" fill="white" />
          <path
            d="M12.8391 7.1609C16.6724 10.9942 18.5074 15.3717 16.9391 16.9401C15.3724 18.5076 10.9932 16.6717 7.16072 12.8392C3.32822 9.00673 1.49239 4.6284 3.06072 3.06007C4.62739 1.49257 9.00572 3.3284 12.8391 7.1609Z"
            stroke="#151515"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.79154 9.99999H10.2082M7.16154 7.16082C3.32821 10.9942 1.49237 15.3717 3.06071 16.94C4.62904 18.5083 9.00654 16.6717 12.839 12.8392C16.6715 9.00665 18.5082 4.62832 16.9399 3.05999C15.3715 1.49165 10.994 3.32832 7.16154 7.16082Z"
            stroke="#151515"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="logo-text">CANOVA</p>
      </Link>
      <div className="navigation-container">
        {currentForm?.pages?.map((page, index) => (
          <Link
            to={`/create-form/${currentForm?._id}/${page.pageNumber}`}
            key={index}
            className="page-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              paddingLeft: "20px",
            }}
          >
            Page {index + 1}
          </Link>
        ))}
        <button onClick={handleAddNewPage} className="add-new-page-button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="add-new-page-icon"
            style={{ marginRight: "6px" }}
          >
            <path
              d="M7.43182 17.2102V0.335226H10.2955V17.2102H7.43182ZM0.426137 10.2045V7.34091H17.3011V10.2045H0.426137Z"
              fill="black"
            />
          </svg>
          Add New Page
        </button>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? `nav-item profile-item active-link`
              : `nav-item profile-item`
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0057 7.98927C12.2239 7.98927 14.0221 6.20081 14.0221 3.99464C14.0221 1.78846 12.2239 0 10.0057 0C7.78747 0 5.98926 1.78846 5.98926 3.99464C5.98926 6.20081 7.78747 7.98927 10.0057 7.98927Z"
              fill="black"
            />
            <path
              d="M19.9529 17.2302C19.5363 15.3436 18.581 13.6167 17.2017 12.2569C16.8669 11.9228 16.5041 11.6176 16.1172 11.3448C14.3554 10.0304 12.2079 9.32858 10.0056 9.34746C7.31267 9.33375 4.72353 10.3796 2.80281 12.2569C1.4235 13.6167 0.468183 15.3436 0.0515591 17.2302C-0.0208564 17.5638 -0.0169447 17.9093 0.0630051 18.2412C0.142955 18.5731 0.296897 18.8829 0.513447 19.1476C0.737714 19.4181 1.02012 19.635 1.33987 19.7825C1.65962 19.93 2.00857 20.0042 2.361 19.9998H17.6502C18.0036 20 18.3526 19.9212 18.6713 19.769C18.99 19.6169 19.2701 19.3954 19.491 19.121C19.7037 18.8593 19.8554 18.5541 19.9353 18.2271C20.0151 17.9002 20.0212 17.5597 19.9529 17.2302Z"
              fill="black"
            />
          </svg>
          <p>Profile</p>
        </NavLink>
      </div>
    </div>
  );
}
export default CreateFormSideBar;
