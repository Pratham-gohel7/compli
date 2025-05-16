import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaBars } from "react-icons/fa";


const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const [isMasterOpen, setIsMasterOpen] = useState(
    location.pathname.includes("/company") ||
    location.pathname.includes("/employee") ||
    location.pathname.includes("/attendance") ||
    location.pathname.includes("/leaveRequest") ||
    location.pathname.includes("/wages") ||
    location.pathname.includes("/OverTime") ||
    location.pathname.includes("/Contractor")
  );

  const [isTransactionOpen, setIsTransactionOpen] = useState(
    location.pathname.includes("/Annualreturn")
  );

  const [isPdfDownloadOpen, setIsPdfDownloadOpen] = useState(false);

  return (
    
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button
        className="toggle-sidebar-btn"
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* <i className="bi bi-layout-sidebar"></i>
         */}
        <FaBars />
        {isHovered && (
          <span className="tooltip">{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}</span>
        )}
      </button>


      {isSidebarOpen && (
        <nav>
          <Link to="/dashboard" className={location.pathname === "/" ? "active" : ""}>
            Dashboard
          </Link>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setIsMasterOpen(!isMasterOpen)}>
              Master
              <FaChevronDown className={`icon ${isMasterOpen ? "rotate-down" : "rotate-up"}`} />
            </button>
            {isMasterOpen && (
              <div className="dropdown-content">
                <Link to="/company">Company</Link>
                <Link to="/employee">Employee</Link>
                <Link to="/Contractor">Contractor</Link>
                <Link to="/attendance">Attendance</Link>
                <Link to="/wages">Wages</Link>
                <Link to="/OverTime">OverTime</Link>
                {/* <Link to="/leaveRequest">Leave Request</Link> */}
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setIsTransactionOpen(!isTransactionOpen)}>
              Transaction
              <FaChevronDown className={`icon ${isTransactionOpen ? "rotate-down" : "rotate-up"}`} />
            </button>
            {isTransactionOpen && (
              <div className="dropdown-content">
                <Link to="/FormNo15">Form No 15</Link>
                <Link to="/FormNo28">Form No 28</Link>
                <Link to="/FormReturn85">Return 85%</Link>
                <Link to="/FormCNF">CNF Form</Link>
                <Link to="/halfyearlyreturn">Half Yearly Return</Link>
                <Link to="/Annualreturn">Annual Return</Link>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setIsPdfDownloadOpen(!isPdfDownloadOpen)}>
              Get Form
              <FaChevronDown className={`icon ${isPdfDownloadOpen ? "rotate-down" : "rotate-up"}`} />
            </button>
            {isPdfDownloadOpen && (
              <div className="dropdown-content">
                <Link to="/FormNo12Pdf">Form 12</Link>
                <Link to="/FormNo13Pdf">Form 13</Link>
                <Link to="/FormNo15Pdf">Form 15</Link>
                <Link to="/FormNo28Pdf">Form 28</Link>
                <Link to="/Return85Pdf">Form Return 85%</Link>
                <Link to="/CNFFormPdf">CNF Form</Link>
                <Link to="/HalfYearlyReturnPdf">Half Yearly Return</Link>
                <Link to="/AnnualReturnPdf">Annual Return</Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
