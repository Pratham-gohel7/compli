import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import CompanyPage from "./pages/CompanyPage";
import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import WagesPage from "./pages/WagesPage";
import LeaveRequestPage from "./pages/LeaveRequestPage";
import DashboardPage from "./pages/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";  // Import PrivateRoute
import { FormProvider } from "./pages/context/FormContext";
import AnnualReturn from "./pages/transcation/AnnualReturn";
import UploadExcel from "./pages/transcation/uploadexcel";
import FormNo15 from "./pages/transcation/FormNo15";
import FormNo15Pdf from "./pages/PdfDownload/FormNo15Pdf";
import FormNo28 from "./pages/transcation/FormNo28";
import FormNo28Pdf from "./pages/PdfDownload/FormNo28Pdf";
import OverTimePage from "./pages/OverTimePage";
import FormNo13Pdf from "./pages/PdfDownload/FormNo13Pdf";
import Annualreturnpdf from "./pages/PdfDownload/AnnualReturnPdf";
import ContractorPage from "./pages/ContractorPage";
import FormNo12Pdf from "./pages/PdfDownload/FormNo12Pdf";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return isLoginPage ? (
    <>{children}</>
  ) : (
    <div className="main d-flex">
      <Header username="John Doe" />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`right-content ${isSidebarOpen ? "expanded" : "full-width"}`}>
        {children}
      </div>
    </div>
  );
};




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/company"
                  element={
                    <PrivateRoute>
                      <CompanyPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employee"
                  element={
                    <PrivateRoute>
                      <EmployeePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <PrivateRoute>
                      <AttendancePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leaverequest"
                  element={
                    <PrivateRoute>
                      <LeaveRequestPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/wages"
                  element={
                    <PrivateRoute>
                      <WagesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/OverTime"
                  element={
                    <PrivateRoute>
                      <OverTimePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Contractor"
                  element={
                    <PrivateRoute>
                      <ContractorPage />
                    </PrivateRoute>
                  }
                />


                <Route
                  path="/annualreturn"
                  element={
                    <PrivateRoute>
                      <FormProvider>
                        <AnnualReturn />
                      </FormProvider>
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/uploadexcel"
                  element={
                    <PrivateRoute>
                      <UploadExcel />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/formno15"
                  element={
                    <PrivateRoute>
                      <FormNo15 />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/formno15pdf"
                  element={
                    <PrivateRoute>
                      <FormNo15Pdf />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/formno28"
                  element={
                    <PrivateRoute>
                      <FormNo28 />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/formno28pdf"
                  element={
                    <PrivateRoute>
                      <FormNo28Pdf />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/FormNo13pdf"
                  element={
                    <PrivateRoute>
                      <FormNo13Pdf />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/AnnualReturnPdf"
                  element={
                    <PrivateRoute>
                      <Annualreturnpdf />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/FormNo12pdf"
                  element={
                    <PrivateRoute>
                      <FormNo12Pdf />
                    </PrivateRoute>
                  }
                />

              </Routes>

            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
