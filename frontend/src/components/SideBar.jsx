import React from "react";

import "./style/sidebarstyle.css";
import { Link, NavLink } from "react-router-dom";

function SideBar() {
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.79154 9.99999H10.2082M7.16154 7.16082C3.32821 10.9942 1.49237 15.3717 3.06071 16.94C4.62904 18.5083 9.00654 16.6717 12.839 12.8392C16.6715 9.00665 18.5082 4.62832 16.9399 3.05999C15.3715 1.49165 10.994 3.32832 7.16154 7.16082Z"
            stroke="#151515"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="logo-text">CANOVA</p>
      </Link>

      <div className="navigation-container">
        <NavLink to={"/"} className={({ isActive }) => isActive ? `nav-item active-link` : `nav-item`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 7.5V17.5H16.25V7.5L10 2.5L3.75 7.5Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.91675 12.0833V17.5H12.0834V12.0833H7.91675Z"
              stroke="black"
              stroke-linejoin="round"
            />
            <path d="M3.75 17.5H16.25" stroke="black" stroke-linecap="round" />
          </svg>
          <p>Home</p>
        </NavLink>

        <NavLink to={"/analysis"} className={({ isActive }) => isActive ? `nav-item active-link` : `nav-item`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3334 2.08331H1.66675V7.08331H18.3334V2.08331Z"
              stroke="black"
              stroke-linejoin="round"
            />
            <path
              d="M1.66675 17.0958L6.74008 11.9708L9.48133 14.5958L12.8326 11.25L14.6992 13.07"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.3334 6.73834V17.5717M1.66675 6.73834V12.5717M5.423 17.9167H18.3334M7.08341 4.58334H15.8334M4.16675 4.58209H4.58341"
              stroke="black"
              stroke-linecap="round"
            />
          </svg>

          <p>Analysis</p>
        </NavLink>

        <NavLink to={"/projects"} className={({ isActive }) => isActive ? `nav-item active-link` : `nav-item`}>
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 7.16667H1M1 1.33333C1 1.11232 1.09427 0.900358 1.26206 0.744078C1.42986 0.587797 1.65744 0.5 1.89474 0.5H7.26316L9.5 3H17.1053C17.3426 3 17.5701 3.0878 17.7379 3.24408C17.9057 3.40036 18 3.61232 18 3.83333V14.6667C18 14.8877 17.9057 15.0996 17.7379 15.2559C17.5701 15.4122 17.3426 15.5 17.1053 15.5H1.89474C1.65744 15.5 1.42986 15.4122 1.26206 15.2559C1.09427 15.0996 1 14.8877 1 14.6667V1.33333Z"
              stroke="black"
              stroke-linejoin="round"
            />
          </svg>

          <p>Projects</p>
        </NavLink>

        <NavLink to={"/profile"} className={({ isActive }) => isActive ? `nav-item profile-item active-link` : `nav-item profile-item`}>
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

export default SideBar;
